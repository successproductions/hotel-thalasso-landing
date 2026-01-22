// ===================================================================
// UPDATED GOOGLE APPS SCRIPT FOR DAKHLA CLUB RESERVATIONS
// Now includes Order ID column for payment tracking
// ===================================================================

const SHEET_NAME = 'Réservations Offer 3';
const EVASION_SHEET_NAME = 'Reservations 3,5,7';

/**
 * Handles POST requests to save reservation data
 */
function doPost(e) {
  try {
    // Parse the incoming JSON data
    const data = JSON.parse(e.postData.contents);
    
    // Check if this is an Evasion page request (has selectedOffer field)
    if (data.selectedOffer) {
      // Route to Evasion handler
      const result = doPostEvasion(data);
      return ContentService
        .createTextOutput(JSON.stringify(result))
        .setMimeType(ContentService.MimeType.JSON);
    }
    
    // Otherwise, handle as Offer 3 reservation (existing code)
    // Get the active spreadsheet and sheet
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    let sheet = ss.getSheetByName(SHEET_NAME);
    
    // Create sheet if it doesn't exist
    if (!sheet) {
      sheet = ss.insertSheet(SHEET_NAME);
    }
    
    // Check if headers exist, if not create them
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        'Date de soumission',
        'Nom complet',
        'Email',
        'Téléphone',
        'Nombre de personnes',
        "Date d'arrivée",
        'Statut',
        'ID Commande' // NEW COLUMN
      ]);
      
      // Format header row
      const headerRange = sheet.getRange(1, 1, 1, 8); // Updated to 8 columns
      headerRange.setBackground('#139584');
      headerRange.setFontColor('#ffffff');
      headerRange.setFontWeight('bold');
      headerRange.setHorizontalAlignment('center');
    }
    
    // Prepare the row data
    const timestamp = data.timestamp ? new Date(data.timestamp) : new Date();
    
    // Get the next empty row
    const lastRow = sheet.getLastRow();
    const nextRow = lastRow + 1;
    
    // First, set the phone column (D) as TEXT format BEFORE adding data
    const phoneCell = sheet.getRange(nextRow, 4);
    phoneCell.setNumberFormat('@STRING@'); // Force text format
    
    // Set data WITHOUT phone number first
    const rowDataWithoutPhone = [[
      Utilities.formatDate(timestamp, Session.getScriptTimeZone(), 'dd/MM/yyyy HH:mm:ss'),
      data.fullName || '',
      data.email || '',
      '', // Empty for now (phone)
      data.numberOfPeople || '',
      data.arrivalDate || '',
      'Confirmé', // Status changed to Confirmé since payment is successful
      data.orderId || '' // NEW: Order ID
    ]];
    
    // Write the data (without phone)
    const rowRange = sheet.getRange(nextRow, 1, 1, 8); // Updated to 8 columns
    rowRange.setValues(rowDataWithoutPhone);
    
    // Now set the phone number separately with apostrophe to preserve format
    phoneCell.setValue("'" + (data.phone || ''));
    
    // Alternate row colors
    if (lastRow % 2 === 0) {
      rowRange.setBackground('#f9f9f9');
    }
    
    // Auto-resize columns
    for (let i = 1; i <= 8; i++) {
      sheet.autoResizeColumn(i);
    }
    
    return ContentService
      .createTextOutput(JSON.stringify({
        status: 'success',
        message: 'Réservation enregistrée avec succès',
        row: nextRow
      }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    Logger.log('Error: ' + error.toString());
    return ContentService
      .createTextOutput(JSON.stringify({
        status: 'error',
        message: error.toString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Handles Evasion (3, 5, 7 days) reservations
 */
function doPostEvasion(data) {
  try {
    // Get the active spreadsheet and sheet
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    let sheet = ss.getSheetByName(EVASION_SHEET_NAME);
    
    // Create sheet if it doesn't exist
    if (!sheet) {
      sheet = ss.insertSheet(EVASION_SHEET_NAME);
    }
    
    // Check if headers exist, if not create them
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        'Date de soumission',
        'ID Commande', // NEW: Moved to second column for visibility
        'Programme choisi',
        'Nom complet',
        'Email',
        'Téléphone',
        'Nombre de personnes',
        "Date d'arrivée",
        'Statut'
      ]);
      
      // Format header row
      const headerRange = sheet.getRange(1, 1, 1, 9); // Updated to 9 columns
      headerRange.setBackground('#d6bb8e');
      headerRange.setFontColor('#ffffff');
      headerRange.setFontWeight('bold');
      headerRange.setHorizontalAlignment('center');
    }
    
    // Prepare the row data
    const timestamp = data.timestamp ? new Date(data.timestamp) : new Date();
    
    // Get offer label
    let offerLabel = 'Évasion ' + data.selectedOffer + ' Nuits';
    
    // Get the next empty row
    const lastRow = sheet.getLastRow();
    const nextRow = lastRow + 1;
    
    // First, set the phone column (F) as TEXT format BEFORE adding data
    const phoneCell = sheet.getRange(nextRow, 6); // Phone is now column 6
    phoneCell.setNumberFormat('@STRING@'); // Force text format
    
    // Set data WITHOUT phone number first
    const rowDataWithoutPhone = [[
      Utilities.formatDate(timestamp, Session.getScriptTimeZone(), 'dd/MM/yyyy HH:mm:ss'),
      data.orderId || '', // NEW: Order ID in column 2
      offerLabel,
      data.fullName || '',
      data.email || '',
      '', // Empty for now (phone)
      data.numberOfPeople || '',
      data.arrivalDate || '',
      'Confirmé' // Status changed to Confirmé since payment is successful
    ]];
    
    // Write the data (without phone)
    const rowRange = sheet.getRange(nextRow, 1, 1, 9); // Updated to 9 columns
    rowRange.setValues(rowDataWithoutPhone);
    
    // Now set the phone number separately with apostrophe to preserve format
    phoneCell.setValue("'" + (data.phone || ''));
    
    // Alternate row colors
    if (lastRow % 2 === 0) {
      rowRange.setBackground('#f9f9f9');
    }
    
    // Auto-resize columns
    for (let i = 1; i <= 9; i++) {
      sheet.autoResizeColumn(i);
    }
    
    return {
      status: 'success',
      message: 'Réservation Évasion enregistrée avec succès',
      row: nextRow
    };
    
  } catch (error) {
    Logger.log('Evasion Error: ' + error.toString());
    return {
      status: 'error',
      message: error.toString()
    };
  }
}

/**
 * Handles GET requests (for testing)
 */
function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({
      status: 'success',
      message: 'Évasion Holistique - Reservation API is running! 🌴',
      version: '2.0 - With Order ID tracking',
      timestamp: new Date().toISOString()
    }))
    .setMimeType(ContentService.MimeType.JSON);
}

/**
 * Test function to verify sheet access (Run this manually to test)
 */
function testSheetAccess() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(EVASION_SHEET_NAME);
  
  if (!sheet) {
    Logger.log('⚠️ Sheet not found, creating: ' + EVASION_SHEET_NAME);
    sheet = ss.insertSheet(EVASION_SHEET_NAME);
    Logger.log('✅ Sheet created: ' + EVASION_SHEET_NAME);
  } else {
    Logger.log('✅ Sheet found: ' + EVASION_SHEET_NAME);
    Logger.log('Last row: ' + sheet.getLastRow());
  }
}

/**
 * Test function to add sample data with Order ID
 */
function testAddSampleReservation() {
  const sampleData = {
    timestamp: new Date().toISOString(),
    selectedOffer: '5',
    fullName: 'Test User',
    email: 'test@example.com',
    phone: '+212 6 12 34 56 78',
    numberOfPeople: '2',
    arrivalDate: '2026-03-15',
    orderId: 'EVAMKTEST123456'
  };
  
  const result = doPostEvasion(sampleData);
  Logger.log('Test result: ' + JSON.stringify(result));
}
