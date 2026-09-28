const BREVO_CONTACTS_URL = 'https://api.brevo.com/v3/contacts';
const BREVO_WHATSAPP_URL = 'https://api.brevo.com/v3/whatsapp/sendMessage';

interface BrevoContactData {
  fullName: string;
  email: string;
  phone: string;
  numberOfPeople: string;
  arrivalDate: string;
  selectedPack?: string;
}

// Brevo rejects SMS/WHATSAPP values that contain spaces or a leading 0 in the
// local part (e.g. "+212 0612345678"), so normalize to "+212612345678".
function sanitizePhone(rawPhone: string): string {
  const [countryCode, ...rest] = rawPhone.trim().split(/\s+/);
  const code = countryCode.replace(/[^\d+]/g, '');
  const local = rest.join('').replace(/\D/g, '').replace(/^0+/, '');
  return local ? `${code}${local}` : code;
}

/**
 * Creates or updates a contact in Brevo and adds it to the leads list.
 * Never throws: a Brevo failure must not break the reservation flow.
 */
export async function upsertBrevoContact(data: BrevoContactData): Promise<void> {
  const apiKey = process.env.BREVO_API_KEY;
  if (!apiKey) {
    console.warn('BREVO_API_KEY is not set, skipping Brevo sync');
    return;
  }

  const listId = Number(process.env.BREVO_LIST_ID) || 55;
  const nameParts = data.fullName.trim().split(/\s+/);
  const firstName = nameParts[0] ?? '';
  const lastName = nameParts.slice(1).join(' ') || firstName;
  const phone = sanitizePhone(data.phone);

  const baseAttributes: Record<string, string | number> = {
    FIRSTNAME: firstName,
    LASTNAME: lastName,
    NOM_COMPLET: data.fullName.trim(),
    NB_PERSONNES: Number(data.numberOfPeople) || 1,
    PROGRAMME: data.selectedPack ?? '',
    DATE_ARRIVEE: data.arrivalDate,
    DATE_DE_SOUMISSION: new Date().toISOString().split('T')[0],
    // Entry state of the Brevo relance automation. A resubmission resets this,
    // which is intended: a new form submission is a new enquiry.
    STATUT: 'Nouveau',
  };

  const send = (attributes: Record<string, string | number>) =>
    fetch(BREVO_CONTACTS_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'api-key': apiKey,
      },
      body: JSON.stringify({
        email: data.email,
        updateEnabled: true,
        listIds: [listId],
        attributes,
      }),
    });

  try {
    let response = await send({ ...baseAttributes, SMS: phone, WHATSAPP: phone });

    if (!response.ok) {
      // An invalid or already-used phone number makes Brevo reject the whole
      // contact; retry without it so the lead is still captured.
      const body = await response.text();
      console.error(`Brevo error ${response.status} (retrying without phone):`, body);

      response = await send(baseAttributes);
      if (!response.ok) {
        console.error(`Brevo error ${response.status}:`, await response.text());
      }
    }
  } catch (error) {
    console.error('Brevo sync error:', error);
  }
}

/**
 * Sends the "demande reçue" WhatsApp template to the lead.
 *
 * The template placeholders (FIRSTNAME, PROGRAMME, DATE_ARRIVEE, NB_PERSONNES)
 * are resolved by Brevo from the contact record, not passed in this request, so
 * upsertBrevoContact must have run first.
 * Never throws: a WhatsApp failure must not break the reservation flow.
 */
export async function sendWhatsAppTemplate(rawPhone: string): Promise<void> {
  const apiKey = process.env.BREVO_API_KEY;
  const senderNumber = process.env.BREVO_WHATSAPP_SENDER;
  const templateId = Number(process.env.BREVO_WHATSAPP_TEMPLATE_ID);

  if (!apiKey || !senderNumber || !templateId) {
    console.warn('Brevo WhatsApp env vars are not set, skipping WhatsApp send');
    return;
  }

  // Brevo wants a digits-only string here ("212612345678"). A numeric value or a
  // leading "+" both fail with `invalid_parameter: Invalid contactNumbers`.
  const contactNumber = sanitizePhone(rawPhone).replace(/\D/g, '');
  if (!contactNumber) {
    console.warn(`Unusable phone for WhatsApp send: "${rawPhone}"`);
    return;
  }

  try {
    const response = await fetch(BREVO_WHATSAPP_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'api-key': apiKey,
      },
      body: JSON.stringify({
        senderNumber,
        contactNumbers: [contactNumber],
        templateId,
      }),
    });

    if (!response.ok) {
      console.error(
        `Brevo WhatsApp error ${response.status}:`,
        await response.text()
      );
      return;
    }

    const { messageId } = await response.json();
    console.log(`WhatsApp template sent to ${contactNumber}:`, messageId);
  } catch (error) {
    console.error('Brevo WhatsApp send error:', error);
  }
}
