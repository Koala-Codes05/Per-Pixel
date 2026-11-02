# Last summary — PerPixel

## 2026-11-02 — Contact enquiry delivery check

- Confirmed the published `https://perpixel-one.vercel.app/contact` returns HTTP 200, includes `create@perpixel.agency` as its form recipient, and does not contain the former Gmail address.
- The domain has MX records pointing to `smtp.secureserver.net` and `mailstore1.secureserver.net`. This establishes a mail route, not that this mailbox receives mail.
- Reviewed the client submission path: it posts JSON to FormSubmit's AJAX endpoint and only shows success after an explicit provider acknowledgement. All 8 local contact tests passed.
- FormSubmit says a changed recipient must activate the form again from an email sent after the first submission. I attempted one labeled test submission; the request timed out outside the sandbox. It may or may not have reached FormSubmit. No connected inbox integration can verify activation or receipt.
- No application code changed. `memory.md` and `last_summary.md` were updated with the check and its limits.

### Next useful step

Check `create@perpixel.agency` Inbox and Spam for a FormSubmit activation email or a message titled `PerPixel contact form delivery test` around 2026-11-02 09:49 UTC. If activation arrives, activate it, then submit once from the live contact page and confirm the enquiry arrives with the visitor email as Reply-To. If nothing arrives, first verify that the mailbox receives ordinary email, then contact FormSubmit support with the site URL and test time.
