import { bkHelp } from './forms'
import type { Pack } from './i18n'

// En-tête des pages de réservation, de confirmation et « Offrir » : « Nous écrire sur WhatsApp » ouvre une conversation
// avec l'équipe (site.whatsappNumber), le premier message déjà écrit dans la langue de la page.
// Sur téléphone, l'icône seule (le texte reste lu par les lecteurs d'écran).
export function WhatsAppHelp({ t }: { t: Pack }) {
  const href = `https://wa.me/${t.site.whatsappNumber}?text=${encodeURIComponent(t.ui.whatsappMessage)}`
  return (
    <a className={bkHelp} href={href} target="_blank" rel="noopener">
      <img className="h-6 w-auto" src="/images/dc-thermes/whatsapp-noir.webp" width="91" height="96" alt="" />
      <span className="underline underline-offset-3 max-sm:sr-only">{t.ui.whatsappHelp}</span>
    </a>
  )
}
