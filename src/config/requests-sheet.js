// Google Sheets ledger for contact requests (the "Excel" the client asked for).
// This is an ADDITIVE best-effort hook: EmailJS remains the primary delivery path,
// and an empty/disabled webhook here never blocks or breaks the form submission.
//
// Setup (once, ~5 min):
//   1. Create the Google Sheet in the account that should own the queue
//      (client's Gmail recommended — they see it in their Drive).
//   2. Extensions -> Apps Script -> paste the code from docs/requests-sheet-setup.md
//      -> Deploy as Web App (Execute as: Me, Access: Anyone) -> copy the URL.
//   3. Put that URL here and set REQUEST_SHEET_TOKEN to a secret of your choice
//      (the same token you set in the Apps Script code).
export const REQUEST_SHEET_WEBHOOK_URL = ''
export const REQUEST_SHEET_TOKEN = ''