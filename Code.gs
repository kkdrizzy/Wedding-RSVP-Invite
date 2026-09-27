/**
 * ═══════════════════════════════════════════════════════════════
 *  KAUSTUBH & DRISHTI — WEDDING RSVP
 *  Google Apps Script — Code.gs
 * ═══════════════════════════════════════════════════════════════
 *
 *  SETUP (one-time, 5 minutes):
 *  1. Go to https://sheets.google.com → create a new spreadsheet.
 *  2. Name the first sheet "RSVPs".
 *  3. Open Extensions → Apps Script → replace all code with this file.
 *  4. In the Apps Script editor, click Deploy → New Deployment.
 *       Type: Web App
 *       Execute as: Me
 *       Who has access: Anyone
 *  5. Click Deploy → copy the Web App URL.
 *  6. In script.js, replace:
 *       const GOOGLE_SCRIPT_URL = 'YOUR_GOOGLE_APPS_SCRIPT_URL';
 *     with the URL you copied.
 *  7. For email alerts: set NOTIFY_EMAIL below to your email address.
 * ═══════════════════════════════════════════════════════════════
 */

// ── CONFIG ────────────────────────────────────────────────────
const SHEET_NAME   = 'RSVPs';
const NOTIFY_EMAIL = 'YOUR_EMAIL@gmail.com';  // ← change this
const WEDDING_NAME = 'Kaustubh & Drishti Wedding';

// Column headers (in order)
const HEADERS = [
  'Timestamp', 'Name', 'Email', 'Phone',
  'Guests', 'Attending', 'Side', 'Events', 'Message'
];

// ── HANDLE POST (from the website) ────────────────────────────
function doPost(e) {
  try {
    const ss    = SpreadsheetApp.getActiveSpreadsheet();
    let   sheet = ss.getSheetByName(SHEET_NAME);

    // Auto-create sheet + header row on first run
    if (!sheet) {
      sheet = ss.insertSheet(SHEET_NAME);
      sheet.appendRow(HEADERS);
      // Style header row
      const headerRange = sheet.getRange(1, 1, 1, HEADERS.length);
      headerRange.setBackground('#4c1d95');
      headerRange.setFontColor('#ffffff');
      headerRange.setFontWeight('bold');
      sheet.setFrozenRows(1);
    }

    const params = e.parameter;

    const row = [
      params.timestamp      || new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
      params.name           || '',
      params.email          || '',
      params.phone          || '',
      params.guests         || '',
      params.attending      || '',
      params.side           || '',
      params.events         || '',
      params.message        || '',
    ];

    sheet.appendRow(row);

    // Auto-resize columns for readability
    sheet.autoResizeColumns(1, HEADERS.length);

    // Send email notification
    sendEmailNotification(params);

    return ContentService
      .createTextOutput(JSON.stringify({ result: 'success' }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ result: 'error', error: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// ── EMAIL NOTIFICATION ────────────────────────────────────────
function sendEmailNotification(params) {
  try {
    const attending = params.attending === 'yes' ? '✅ Joyfully Accepts' : '❌ Regretfully Declines';
    const subject   = `[${WEDDING_NAME}] New RSVP from ${params.name || 'a guest'}`;
    const body      = `
New RSVP received!

━━━━━━━━━━━━━━━━━━━━━━━━━━
Name:       ${params.name      || '—'}
Email:      ${params.email     || '—'}
Phone:      ${params.phone     || '—'}
━━━━━━━━━━━━━━━━━━━━━━━━━━
Attending:  ${attending}
Side:       ${params.side      || '—'}
Guests:     ${params.guests    || '—'}
Events:     ${params.events    || '—'}
Message:    ${params.message   || '—'}
━━━━━━━━━━━━━━━━━━━━━━━━━━
Timestamp: ${params.timestamp  || new Date().toString()}

View all RSVPs: ${SpreadsheetApp.getActiveSpreadsheet().getUrl()}
    `.trim();

    MailApp.sendEmail({
      to:      NOTIFY_EMAIL,
      subject: subject,
      body:    body,
    });
  } catch (mailErr) {
    // Email failure should NOT break the RSVP save
    console.error('Email error:', mailErr);
  }
}

// ── HANDLE GET (health check) ─────────────────────────────────
function doGet() {
  return ContentService
    .createTextOutput(JSON.stringify({ status: 'ok', app: WEDDING_NAME }))
    .setMimeType(ContentService.MimeType.JSON);
}
