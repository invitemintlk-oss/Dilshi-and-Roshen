type SheetName = 'rsvp' | 'wishes';

type SheetPayload = Record<string, string | number>;

/**
 * Apps Script Web App URL for the Dilshi & Roshen RSVP + Wishes sheet
 * (https://docs.google.com/spreadsheets/d/1QTZ_S7wvID0_epx4DoiDBsIQr8iEF2VkSBLW-rPRN7k).
 *
 * Deploy google-apps-script/code.gs as a Web app (Execute as: Me, Access: Anyone)
 * and paste the URL ending in /exec here.
 */
const GOOGLE_SCRIPT_URL =
  'https://script.google.com/macros/s/AKfycbwOhH1Z-DFnXU6K59LY0_DGb02DhIQyBJtYYEl7H5fV5JrRbFrIlu7L2ttBT-gyimPR3A/exec';

export async function submitToGoogleSheet(sheet: SheetName, payload: SheetPayload): Promise<void> {
  if (!GOOGLE_SCRIPT_URL.startsWith('https://script.google.com/')) {
    throw new Error('Google Apps Script URL is not configured (src/googleSheets.ts)');
  }

  const body = new URLSearchParams();
  body.append('sheet', sheet);
  body.append('payload', JSON.stringify(payload));

  // Apps Script web apps don't send CORS headers; no-cors still delivers the request.
  await fetch(GOOGLE_SCRIPT_URL, {
    method: 'POST',
    mode: 'no-cors',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' },
    body: body.toString(),
  });
}
