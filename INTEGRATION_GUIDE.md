# Payment Integration - Order ID Tracking & Email Confirmation

## 📋 Overview
Successfully integrated Order ID tracking and email confirmation for Dakhla Club evasion page reservations.

## ✅ Changes Made

### 1. **API Route Created** (`/src/app/api/reservations/evasion/route.ts`)
- Saves reservation data to Google Sheets with Order ID
- Sends confirmation email with order details
- Handles errors gracefully without blocking the user experience

### 2. **Email Confirmation API** (`/src/app/api/email/send-confirmation/route.ts`)
- Beautiful HTML email template with order details
- Includes order number, program, arrival date, and number of people
- Call-to-action to book hotel accommodation
- Uses Resend service for reliable delivery

### 3. **Thank You Page Updated** (`/src/app/[locale]/evasion/thank-you/page.tsx`)
- Now displays order ID from URL parameter
- Automatically calls API to save to Google Sheets when page loads
- Sends confirmation email with order details
- Client-side component for better interaction

### 4. **Google Apps Script Updated** (`UPDATED_GOOGLE_APPS_SCRIPT.js`)
- **NEW COLUMN: "ID Commande" (Order ID)**
  - For Offer 3: Column H (8th column)
  - For Evasion (3,5,7): Column B (2nd column - high visibility)
- Status automatically set to "Confirmé" (Confirmed) instead of "Nouveau"
- All columns properly formatted and auto-resized

## 📊 Google Sheet Structure

### Evasion Sheet (3, 5, 7 days)
| Column | Field | Description |
|--------|-------|-------------|
| A | Date de soumission | Submission timestamp |
| **B** | **ID Commande** | **Order ID from CMI payment** |
| C | Programme choisi | Selected program (3/5/7 nights) |
| D | Nom complet | Full name |
| E | Email | Email address |
| F | Téléphone | Phone number |
| G | Nombre de personnes | Number of people |
| H | Date d'arrivée | Arrival date |
| I | Statut | Status (Confirmé) |

## 🔄 Complete Flow

1. **User fills reservation form** → Clicks "Continuer vers le paiement"
2. **Payment initiated** → Redirected to CMI payment gateway
3. **Payment successful** → CMI redirects to `/api/payment/success`
4. **Success handler** → Redirects to `/fr/evasion/thank-you?order=EVAMKPD595KR39SRO`
5. **Thank you page loads** → Automatically calls `/api/reservations/evasion` with order ID
6. **Backend processes**:
   - Saves to Google Sheets with order ID
   - Sends confirmation email with order details
7. **User receives** → Email confirmation with order number
8. **Next step** → Book hotel accommodation

## 📧 Email Configuration

The confirmation email includes:
- ✅ Order number (for tracking)
- ✅ Selected program (3, 5, or 7 nights)
- ✅ Arrival date
- ✅ Number of people
- ✅ Next steps instructions
- ✅ Hotel booking CTA button
- ✅ Contact information

## 🔧 Environment Variables Needed

```env
# Google Sheets URL for Evasion reservations
GOOGLE_SHEET_EVASION_URL=your_google_apps_script_url_here

# Resend API for email sending
RESEND_API_KEY=your_resend_api_key_here
```

## 📝 How to Update Google Apps Script

1. Open your Google Sheet
2. Go to **Extensions** → **Apps Script**
3. Replace the entire script with the content from `UPDATED_GOOGLE_APPS_SCRIPT.js`
4. Click **Save** (💾 icon)
5. Click **Deploy** → **New deployment**
6. Select type: **Web app**
7. Execute as: **Me**
8. Who has access: **Anyone**
9. Click **Deploy**
10. Copy the Web app URL
11. Add it to your `.env` file as `GOOGLE_SHEET_EVASION_URL`

## ✨ Features

- ✅ Order ID tracking in Google Sheets
- ✅ Automated email confirmation
- ✅ Professional email template
- ✅ Order number displayed on thank you page
- ✅ Graceful error handling
- ✅ Status automatically set to "Confirmé"
- ✅ Phone number preserved with proper formatting
- ✅ Hotel booking CTA included

## 🧪 Testing

1. Make a test reservation on the evasion page
2. Complete test payment with CMI test card
3. Check you're redirected to thank you page with order ID
4. Verify Google Sheet has new row with order ID
5. Check your email for confirmation
6. Verify all data is correct

## 🐛 Troubleshooting

**No email received?**
- Check RESEND_API_KEY is configured
- Check spam folder
- Verify email address is correct

**Data not in Google Sheets?**
- Check GOOGLE_SHEET_EVASION_URL is configured
- Verify Google Apps Script is deployed
- Check Apps Script execution logs

**Order ID not showing?**
- Verify CMI payment success redirects to correct URL
- Check browser console for errors
- Ensure sessionStorage has booking info

## 📞 Support

For questions, contact: reservation@dakhlaclub.com
