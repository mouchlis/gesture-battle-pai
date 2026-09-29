const SPREADSHEET_ID = ''; // Opsional. Isi ID Google Sheet untuk menyimpan skor.
const SHEET_NAME = 'Skor';

function doGet(e) {
  const p = e && e.parameter ? e.parameter : {};
  if (p.action === 'saveScore') {
    saveScore_(p);
    return ContentService
      .createTextOutput('OK')
      .setMimeType(ContentService.MimeType.TEXT);
  }

  return ContentService
    .createTextOutput(JSON.stringify({
      ok: true,
      service: 'Gesture Battle API',
      message: 'API aktif'
    }))
    .setMimeType(ContentService.MimeType.JSON);
}

function saveScore_(p) {
  if (!SPREADSHEET_ID) return;

  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  let sh = ss.getSheetByName(SHEET_NAME);

  if (!sh) {
    sh = ss.insertSheet(SHEET_NAME);
    sh.appendRow(['Waktu', 'Player 1', 'Player 2']);
  }

  sh.appendRow([
    new Date(),
    Number(p.p1 || 0),
    Number(p.p2 || 0)
  ]);
}
