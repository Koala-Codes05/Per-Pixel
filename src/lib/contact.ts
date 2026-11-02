export const CONTACT_EMAIL = "create@perpixel.agency";
export const ENQUIRY_SUBJECT = "New project enquiry — PerPixel";

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
