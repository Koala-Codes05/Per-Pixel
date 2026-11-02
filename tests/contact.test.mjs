import assert from "node:assert/strict";
import { test } from "node:test";
import { CONTACT_EMAIL, sendEnquiry } from "../src/lib/contact.ts";

const enquiry = { name: "Test founder", email: "founder@example.com", phone: "", message: "A brand website brief." };
const signal = new AbortController().signal;

test("sends the brief to the studio inbox with the visitor as reply-to", async () => {
  assert.equal(CONTACT_EMAIL, "create@perpixel.agency");
  await sendEnquiry(enquiry, signal, async (url, options) => {
    assert.equal(url, `https://formsubmit.co/ajax/${CONTACT_EMAIL}`);
    assert.equal(options.method, "POST");
    assert.equal(options.signal, signal);
    const body = JSON.parse(options.body);
    assert.equal(body._replyto, enquiry.email);
    assert.equal(body.message, enquiry.message);
    assert.equal(body.phone, "");
    assert.equal(body._honey, "");
    return Response.json({ success: "true" });
  });
});
test("accepts a boolean provider acknowledgement", async () => {
  await sendEnquiry(enquiry, signal, async () => Response.json({ success: true }));
});

for (const [label, response] of [
  ["provider rejection", () => Response.json({ success: false })],
  ["string false", () => Response.json({ success: "false" })],
  ["missing acknowledgement", () => Response.json({})],
  ["HTTP failure even with success body", () => Response.json({ success: true }, { status: 503 })],
  ["non-JSON service failure", () => new Response("Service unavailable", { status: 502 })],
]) {
  test(`does not report success for ${label}`, async () => {
    await assert.rejects(sendEnquiry(enquiry, signal, async () => response()));
  });
}

test("network errors and aborted requests remain failures", async () => {
  await assert.rejects(sendEnquiry(enquiry, signal, async () => { throw new TypeError("Network failure"); }));
  await assert.rejects(sendEnquiry(enquiry, signal, async () => { throw new DOMException("Timed out", "AbortError"); }));
});
