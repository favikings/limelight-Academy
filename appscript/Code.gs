/**
 * Limelight International Academy
 * Google Apps Script Backend
 * 
 * Handles student registration submissions from the landing page.
 * Stores data in Google Sheets with auto-generated Registration IDs.
 * 
 * SETUP:
 * 1. Create a new Google Sheet with columns:
 *    Timestamp | Registration ID | Full Name | WhatsApp | Email | Category
 * 2. Go to Extensions > Apps Script
 * 3. Paste this code
 * 4. Deploy > New Deployment > Web App
 *    - Execute as: Me
 *    - Who has access: Anyone
 * 5. Copy the Web App URL and paste it in js/script.js
 */

function doPost(e) {
  try {
    // Parse the incoming JSON payload
    var data = JSON.parse(e.postData.contents);

    // Validate required fields
    if (!data.fullName || !data.fullName.trim()) {
      return ContentService
        .createTextOutput(JSON.stringify({
          success: false,
          error: 'Full name is required'
        }))
        .setMimeType(ContentService.MimeType.JSON);
    }

    if (!data.whatsapp || !data.whatsapp.trim()) {
      return ContentService
        .createTextOutput(JSON.stringify({
          success: false,
          error: 'WhatsApp number is required'
        }))
        .setMimeType(ContentService.MimeType.JSON);
    }

    if (!data.category || !data.category.trim()) {
      return ContentService
        .createTextOutput(JSON.stringify({
          success: false,
          error: 'Category is required'
        }))
        .setMimeType(ContentService.MimeType.JSON);
    }

    // Open the Google Sheet
    // Replace with your actual Spreadsheet ID
    var ss = SpreadsheetApp.openById('1N77BmfsNBuCjkdliqdCJjCReB5PScHYLBtG2X48_Zmk');
    var sheet = ss.getActiveSheet();

    // Generate Registration ID
    var regId = generateRegistrationId(sheet);

    // Prepare the row data
    var timestamp = new Date();
    var row = [
      timestamp,
      regId,
      data.fullName.trim(),
      data.whatsapp.trim(),
      (data.email || '').trim(),
      data.category.trim()
    ];

    // Append to sheet
    sheet.appendRow(row);

    // Return success response
    return ContentService
      .createTextOutput(JSON.stringify({
        success: true,
        registrationId: regId,
        message: 'Registration successful'
      }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({
        success: false,
        error: 'An error occurred: ' + error.message
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Generates a unique Registration ID in the format: LIA-2026-0001
 * Increments based on existing entries in the sheet.
 */
function generateRegistrationId(sheet) {
  var year = new Date().getFullYear();
  var prefix = 'LIA-' + year + '-';

  // Get all values in column B (Registration ID column)
  var lastRow = sheet.getLastRow();
  var regIds = [];

  if (lastRow > 1) {
    regIds = sheet.getRange(2, 2, lastRow - 1, 1).getValues();
  }

  // Find the highest existing number
  var maxNum = 0;
  for (var i = 0; i < regIds.length; i++) {
    var id = regIds[i][0];
    if (id && typeof id === 'string' && id.indexOf(prefix) === 0) {
      var num = parseInt(id.replace(prefix, ''), 10);
      if (num > maxNum) {
        maxNum = num;
      }
    }
  }

  // Increment and pad with zeros
  var nextNum = maxNum + 1;
  var padded = ('0000' + nextNum).slice(-4);

  return prefix + padded;
}

/**
 * Test function - run this first to verify setup
 * Creates the header row in your Google Sheet
 */
function setupSheet() {
  var ss = SpreadsheetApp.openById('1N77BmfsNBuCjkdliqdCJjCReB5PScHYLBtG2X48_Zmk');
  var sheet = ss.getActiveSheet();

  // Set headers
  sheet.getRange(1, 1, 1, 6).setValues([[
    'Timestamp',
    'Registration ID',
    'Full Name',
    'WhatsApp',
    'Email',
    'Category'
  ]]);

  // Format header row
  sheet.getRange(1, 1, 1, 6)
    .setFontWeight('bold')
    .setBackground('#0D6B35')
    .setFontColor('#FFFFFF');

  // Set column widths
  sheet.setColumnWidth(1, 160); // Timestamp
  sheet.setColumnWidth(2, 150); // Reg ID
  sheet.setColumnWidth(3, 200); // Full Name
  sheet.setColumnWidth(4, 150); // WhatsApp
  sheet.setColumnWidth(5, 220); // Email
  sheet.setColumnWidth(6, 200); // Category

  Logger.log('Sheet setup complete!');
}
