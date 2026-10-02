import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const RECIPIENT = "lagunnikesh2064@gmail.com";
const clean = (s: string) => s.replace(/[\r\n]+/g, " ").trim();

const schema = z.object({
  kind: z.enum(["research application", "collaboration proposal"]),
  name: z.string().trim().min(2).max(100),
  email: z.string().trim().email().max(255),
  message: z.string().trim().min(20).max(4000),
  fields: z.array(z.tuple([z.string().max(60), z.string().max(4000)])).max(30),
});

const b64 = (s: string) =>
  btoa(Array.from(new TextEncoder().encode(s), (b) => String.fromCharCode(b)).join(""));
const header = (v: string) => (/^[\x00-\x7F]*$/.test(v) ? v : `=?UTF-8?B?${b64(v)}?=`);

export const submitJoinForm = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) => schema.parse(d))
  .handler(async ({ data }) => {
    const lovableKey = process.env["LOVABLE_API_KEY"];
    const gmailKey = process.env["GOOGLE_MAIL_API_KEY"];
    if (!lovableKey || !gmailKey) throw new Error("Email delivery is not configured.");

    const subject = `Lagun Lab — ${data.kind} from ${clean(data.name)}`;
    const body = data.fields.map(([k, v]) => `${clean(k)}:\n${v.trim()}`).join("\n\n");
    const raw = [
      `To: ${RECIPIENT}`,
      `Reply-To: ${clean(data.email)}`,
      `Subject: ${header(subject)}`,
      "MIME-Version: 1.0",
      'Content-Type: text/plain; charset="UTF-8"',
      "",
      body,
    ].join("\r\n");
    const encoded = b64(raw).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");

    const res = await fetch("https://connector-gateway.lovable.dev/google_mail/gmail/v1/users/me/messages/send", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${lovableKey}`,
        "X-Connection-Api-Key": gmailKey,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ raw: encoded }),
    });
    if (!res.ok) {
      console.error(`Gmail send failed [${res.status}]: ${await res.text()}`);
      throw new Error("Could not send your submission. Please try again.");
    }
    return { ok: true };
  });
