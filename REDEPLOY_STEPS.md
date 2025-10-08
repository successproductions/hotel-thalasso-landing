# 🚀 CRITICAL: How to Redeploy Apps Script

## ⚠️ Important: Saving ≠ Deploying

When you change the Apps Script code:
1. ✅ **Save** = Saves the code in the editor
2. ❌ **BUT** your web app still uses the OLD deployed version
3. ✅ **Deploy** = Updates the live web app with new code

---

## 📋 Step-by-Step Redeployment

### Method 1: Create New Version (Recommended)

1. **Open Apps Script Editor**
   - In your Google Sheet
   - Extensions → Apps Script

2. **Make sure code is saved**
   - Click 💾 **Save project**
   - Wait for "Saved" message

3. **Deploy → Manage deployments**
   - Click the **Deploy** button (top right)
   - Select **Manage deployments**

4. **Edit existing deployment**
   - You should see 1 active deployment
   - Click the ✏️ **Edit** icon (pencil) next to it

5. **Create new version**
   - Under "Version", click the dropdown
   - Select **New version**
   - Description: "Fixed phone number error"
   - **IMPORTANT**: Keep "Execute as" = **Me**
   - **IMPORTANT**: Keep "Who has access" = **Anyone**

6. **Click Deploy**
   - Click the blue **Deploy** button
   - Wait for confirmation

7. **Verify URL**
   - The Web app URL should be the same
   - Copy it just to be sure
   - Compare with your `.env.local` file

---

### Method 2: Archive Old & Create Fresh (If Method 1 Fails)

1. **Open Apps Script Editor**

2. **Deploy → Manage deployments**

3. **Archive the old deployment**
   - Click 🗑️ **Archive** button
   - Confirm

4. **Create new deployment**
   - Click **Deploy** → **New deployment**
   - Click ⚙️ gear icon next to "Select type"
   - Choose **Web app**
   - Settings:
     - Description: "Halloween Reservation API v2"
     - Execute as: **Me**
     - Who has access: **Anyone**
   - Click **Deploy**

5. **Authorize (if asked)**
   - Click "Authorize access"
   - Choose your account
   - Click "Advanced" → "Go to [project]"
   - Click "Allow"

6. **Copy NEW Web App URL**
   - Copy the entire URL ending with `/exec`

7. **Update .env.local**
   ```
   GOOGLE_SHEETS_URL=YOUR_NEW_URL_HERE
   ```

8. **Restart dev server**
   ```bash
   npm run dev
   ```

---

## 🧪 How to Test if Deployment Worked

### Test 1: Browser Test
Open the Web App URL directly in browser:
```
https://script.google.com/macros/s/YOUR_ID/exec
```

You should see:
```json
{
  "status": "success",
  "message": "Halloween Reservation Google Sheets API is running!",
  "timestamp": "2025-..."
}
```

### Test 2: Check Version
In Apps Script:
1. Click **Deploy** → **Manage deployments**
2. You should see the NEW version number
3. Status should be **Active**

---

## 🔍 Troubleshooting

### Issue: Still getting #ERROR!

**Solution**: You probably skipped the "New version" step.

1. Go back to **Deploy → Manage deployments**
2. Click ✏️ **Edit**
3. Make SURE you select **"New version"** from dropdown
4. Click **Deploy**

### Issue: Can't find "New version" option

**Solution**: Use Method 2 (Archive & Create Fresh)

### Issue: Phone still shows as error after redeployment

**Solutions**:
1. Make sure you're testing with a FRESH reservation (not old data)
2. Old rows will keep the error - delete them or fix manually
3. Check the terminal logs when submitting:
   ```
   ✅ Data saved to Google Sheets successfully!
   ```

---

## ✅ Success Checklist

After redeployment, verify:
- [ ] Saved the updated script
- [ ] Created **New version** (not just saved)
- [ ] Deployed the new version
- [ ] Tested the Web App URL in browser (shows JSON)
- [ ] Submitted NEW test reservation
- [ ] Phone number shows correctly (without #ERROR!)

---

## 💡 Quick Fix for Existing Errors

To fix rows that already have `#ERROR!`:

1. Click on the error cell (column E)
2. Look at the formula bar - you'll see something like `+212 612345678`
3. Edit the cell:
   - Type: `'+212 612345678` (with apostrophe at start)
   - Press Enter
4. Error should disappear

OR just delete the error rows and ask customers to resubmit.

---

## 🎯 Remember

**ALWAYS** after changing Apps Script code:
1. Save (💾)
2. Deploy → Manage deployments
3. Edit → New version
4. Deploy (button)

Just "Save" is NOT enough! 🚨
