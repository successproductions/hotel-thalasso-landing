# 🔧 Google Sheets Troubleshooting

## Error: "Unexpected token '<', '<!DOCTYPE'..."

This error means the Apps Script is returning HTML instead of JSON. Here's how to fix it:

---

## ✅ Checklist

### 1. Check Your .env.local File

Make sure you have the correct URL in `.env.local`:

```env
GOOGLE_SHEETS_URL=https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec
```

**Important Notes:**
- ✅ URL must end with `/exec` (not `/edit` or `/dev`)
- ✅ Must start with `https://script.google.com/macros/s/`
- ✅ No spaces or quotes around the URL
- ✅ Restart your dev server after adding this

### 2. Verify Apps Script Deployment

In Google Apps Script editor:

1. Click **Deploy** → **Manage deployments**
2. Make sure you have an **Active** deployment
3. Check these settings:
   - ⚙️ **Type**: Web app
   - 👤 **Execute as**: Me (your email)
   - 🌍 **Who has access**: **Anyone** (this is crucial!)
   - 🔗 **URL**: Should end with `/exec`

**If "Who has access" is NOT set to "Anyone":**
- Click ✏️ edit icon
- Change it to "Anyone"
- Click "Deploy"

### 3. Test the Apps Script Directly

Open the Web App URL in your browser:
```
https://script.google.com/macros/s/YOUR_ID/exec
```

**Expected result:**
```json
{
  "status": "success",
  "message": "Halloween Reservation Google Sheets API is running!",
  "timestamp": "2025-..."
}
```

**If you see HTML or authorization page:**
- The deployment isn't set to "Anyone"
- Redeploy with correct permissions

### 4. Check Apps Script Code

In the Apps Script editor:

1. Make sure you pasted the ENTIRE `google-apps-script.js` file
2. Verify the `SHEET_NAME` matches your sheet tab name
3. Click **Save** (💾 icon)
4. Check for any red error indicators

### 5. Common Issues

#### Issue: "Authorization required" page
**Fix**: Set "Who has access" to "Anyone" in deployment settings

#### Issue: Wrong sheet name
**Fix**: Update `SHEET_NAME` in the script to match your sheet tab name

#### Issue: Old deployment URL
**Fix**: Always use the URL from the LATEST deployment

---

## 📝 Step-by-Step Fix

1. **Open your Google Sheet**

2. **Go to Extensions → Apps Script**

3. **Deploy the script:**
   ```
   Deploy → Manage deployments
   ```

4. **Check/Edit deployment:**
   - Click ✏️ next to your deployment
   - Set "Who has access" to **Anyone**
   - Click "Deploy"

5. **Copy the Web App URL** (should end with `/exec`)

6. **Update your .env.local:**
   ```env
   GOOGLE_SHEETS_URL=https://script.google.com/macros/s/YOUR_ACTUAL_ID/exec
   ```

7. **Restart your dev server:**
   ```bash
   # Stop the server (Ctrl+C)
   npm run dev
   ```

8. **Test again**

---

## 🧪 Testing Commands

Run these in your terminal to check:

```bash
# Check if GOOGLE_SHEETS_URL is set
echo $GOOGLE_SHEETS_URL

# Test the URL directly
curl "YOUR_GOOGLE_SHEETS_URL"
```

The curl command should return JSON, not HTML.

---

## 📞 Still Having Issues?

Check the terminal output after submitting a reservation. You should see:

```
Attempting to save to Google Sheets...
URL: https://script.google.com/...
Response status: 200
Response text: {"status":"success",...}
✅ Data saved to Google Sheets successfully!
```

If you see HTML in the response, the deployment permissions are wrong.

---

## ✅ Success Indicators

When working correctly:
- ✅ Form submits successfully
- ✅ Email is received
- ✅ Console shows "✅ Data saved to Google Sheets successfully!"
- ✅ New row appears in your Google Sheet
- ✅ No errors in terminal

---

## 🎯 Quick Fix Summary

**Most Common Issue**: "Who has access" not set to "Anyone"

**Solution**:
1. Apps Script → Deploy → Manage deployments
2. Edit deployment → "Who has access" → **Anyone**
3. Deploy
4. Copy new URL to .env.local
5. Restart dev server
