/**
 * Dilshi & Roshen — Wedding RSVP + Wishes → Google Sheets
 *
 * Spreadsheet:
 *   https://docs.google.com/spreadsheets/d/1QTZ_S7wvID0_epx4DoiDBsIQr8iEF2VkSBLW-rPRN7k/edit
 *
 * HOW TO DEPLOY
 *   1. Open the spreadsheet → Extensions → Apps Script.
 *   2. Delete everything in Code.gs and paste this whole file. Save.
 *   3. (Optional) Select the `setup` function and click Run once — it creates the
 *      "RSVP" and "Wishes" tabs with formatted headers and asks for permission.
 *      If you skip this, the tabs are created automatically on the first response.
 *   4. Deploy → New deployment → type "Web app"
 *        Execute as:       Me
 *        Who has access:   Anyone
 *      Click Deploy and copy the Web app URL (ends in /exec).
 *   5. Paste that URL into GOOGLE_SCRIPT_URL in src/googleSheets.ts.
 *
 *   If you later edit this script: Deploy → Manage deployments → ✏️ → Version: New version → Deploy
 *   (this keeps the same /exec URL).
 */

const SPREADSHEET_ID = '1QTZ_S7wvID0_epx4DoiDBsIQr8iEF2VkSBLW-rPRN7k';
const TIMEZONE = 'Asia/Colombo';
const HEADER_BG = '#E8957A'; // peach
const HEADER_FG = '#ffffff';

const SHEETS = {
  rsvp: {
    name: 'RSVP',
    headers: ['Timestamp', 'Name', 'Attending', 'Guest Count', 'Invited To', 'Invitation Name', 'Message', 'Submitted At (ISO)'],
    widths: [170, 200, 110, 110, 190, 200, 360, 210],
    row: (p) => [
      now_(),
      clean_(p.name),
      clean_(p.status),
      Number(p.guestCount) || 0,
      clean_(p.invitedTo),
      clean_(p.inviteLinkName),
      clean_(p.message),
      clean_(p.submittedAt),
    ],
  },
  wishes: {
    name: 'Wishes',
    headers: ['Timestamp', 'Name', 'Wish', 'Submitted At (ISO)'],
    widths: [170, 200, 480, 210],
    row: (p) => [
      now_(),
      clean_(p.name),
      clean_(p.wish),
      clean_(p.submittedAt),
    ],
  },
};

/** Run once from the Apps Script editor to create both tabs up front (optional). */
function setup() {
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  Object.keys(SHEETS).forEach((key) => getOrCreateSheet_(ss, key));
}

function doPost(e) {
  const lock = LockService.getScriptLock();
  try {
    lock.waitLock(10000);

    const key = String((e && e.parameter && e.parameter.sheet) || '').toLowerCase();
    if (!SHEETS[key]) {
      return json_({ ok: false, error: 'Invalid sheet. Use "rsvp" or "wishes".' });
    }

    const payload = JSON.parse((e && e.parameter && e.parameter.payload) || '{}');
    const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
    const sheet = getOrCreateSheet_(ss, key);

    sheet.appendRow(SHEETS[key].row(payload));

    return json_({ ok: true, sheet: SHEETS[key].name });
  } catch (err) {
    return json_({ ok: false, error: String(err && err.message ? err.message : err) });
  } finally {
    try { lock.releaseLock(); } catch (_) {}
  }
}

function doGet(e) {
  const action = String((e && e.parameter && e.parameter.action) || '').toLowerCase();
  if (action === 'health') {
    return json_({ ok: true, service: 'dilshi-roshen-wedding', timestamp: new Date().toISOString() });
  }
  return json_({ ok: true, message: 'POST with sheet=rsvp|wishes and payload=<json>' });
}

/* ---------------- helpers ---------------- */

function getOrCreateSheet_(ss, key) {
  const cfg = SHEETS[key];
  let sheet = ss.getSheetByName(cfg.name);
  if (!sheet) sheet = ss.insertSheet(cfg.name);
  ensureHeaders_(sheet, cfg);
  return sheet;
}

function ensureHeaders_(sheet, cfg) {
  const cols = cfg.headers.length;
  const firstRow = sheet.getLastRow() > 0
    ? sheet.getRange(1, 1, 1, cols).getValues()[0].map(String)
    : [];

  // Already has the correct headers — nothing to do.
  if (firstRow.join('|') === cfg.headers.join('|')) return;

  // Row 1 looks like an older header row → overwrite it. Real data → insert a header row on top.
  const looksLikeHeader = firstRow.length > 0 && firstRow[0] === 'Timestamp';
  if (sheet.getLastRow() > 0 && !looksLikeHeader) sheet.insertRowBefore(1);

  if (sheet.getMaxColumns() < cols) {
    sheet.insertColumnsAfter(sheet.getMaxColumns(), cols - sheet.getMaxColumns());
  }

  const header = sheet.getRange(1, 1, 1, cols);
  header
    .setValues([cfg.headers])
    .setFontWeight('bold')
    .setFontColor(HEADER_FG)
    .setBackground(HEADER_BG)
    .setHorizontalAlignment('center');

  sheet.setFrozenRows(1);
  sheet.setRowHeight(1, 32);
  cfg.widths.forEach((w, i) => sheet.setColumnWidth(i + 1, w));
  if (sheet.getMaxRows() > 1) {
    sheet.getRange(2, 1, sheet.getMaxRows() - 1, cols).setWrap(true).setVerticalAlignment('top');
  }
  header.setVerticalAlignment('middle');
}

function now_() {
  return Utilities.formatDate(new Date(), TIMEZONE, 'yyyy-MM-dd HH:mm:ss');
}

function clean_(v) {
  if (v === null || v === undefined) return '';
  let s = String(v).trim();
  // Prevent spreadsheet formula injection from user-entered text.
  if (/^[=+\-@]/.test(s)) s = "'" + s;
  return s;
}

function json_(data) {
  return ContentService.createTextOutput(JSON.stringify(data)).setMimeType(ContentService.MimeType.JSON);
}
