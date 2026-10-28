export const CONTACT_EMAIL = "perpixeldigital@gmail.com";
export const ENQUIRY_SUBJECT = "New project enquiry — PerPixel";
export const UPDATES_SUBJECT = "New updates request — PerPixel";

type Enquiry = { name: string; email: string; phone: string; message: string };

export async function sendEnquiry(enquiry: Enquiry, signal: AbortSignal, request: typeof fetch = fetch) {
  const response = await request(`https://formsubmit.co/ajax/${CONTACT_EMAIL}`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({
      ...enquiry,
      _subject: ENQUIRY_SUBJECT,
      _replyto: enquiry.email,
      _template: "table",
      _honey: "",
    }),
    signal,
  });
  const result = await response.json();
  if (!response.ok || (result?.success !== true && result?.success !== "true")) {
    throw new Error("Submission was not accepted");
  }
}

/** FormSubmit emails this request to the studio; it does not create a managed mailing list. */
export async function sendUpdatesRequest(email: string, signal: AbortSignal, request: typeof fetch = fetch) {
  const response = await request(`https://formsubmit.co/ajax/${CONTACT_EMAIL}`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({
      email,
      request: "Please add me to PerPixel's studio updates by email.",
      _subject: UPDATES_SUBJECT,
      _replyto: email,
      _template: "table",
      _honey: "",
    }),
    signal,
  });
  const result = await response.json();
  if (!response.ok || (result?.success !== true && result?.success !== "true")) {
    throw new Error("Submission was not accepted");
  }
}
