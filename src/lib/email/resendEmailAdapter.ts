import type { EmailAdapter, SendEmailOptions } from "payload";

type ResendEmailPayload = {
  attachments?: ResendEmailAttachment[];
  bcc?: string | string[];
  cc?: string | string[];
  from: string;
  headers?: Record<string, string>;
  html?: string;
  reply_to?: string;
  subject: string;
  text?: string;
  to: string | string[];
};

type ResendEmailAttachment = {
  content: string;
  filename: string;
};

type ResendEmailSendResponse = {
  id?: string;
  message?: string;
  name?: string;
  statusCode?: number;
};

type ResendEmailAdapterArgs = {
  apiKey: string;
  defaultFromAddress: string;
  defaultFromName: string;
};

type PayloadEmailAttachment = NonNullable<SendEmailOptions["attachments"]>[number];

const emailWithNamePattern = /^\s*"?([^"<]*)"?\s*<([^>]+)>\s*$/;

function normalizeEmail(value: SendEmailOptions["to"] | SendEmailOptions["from"]): string | undefined {
  if (!value) {
    return undefined;
  }

  if (typeof value === "string") {
    const match = value.match(emailWithNamePattern);
    return match?.[2] || value;
  }

  if (Array.isArray(value)) {
    return normalizeEmail(value[0]);
  }

  return value.address || value.email;
}

function normalizeRecipients(
  value: SendEmailOptions["to"] | SendEmailOptions["cc"] | SendEmailOptions["bcc"],
): string | string[] | undefined {
  if (!value) {
    return undefined;
  }

  if (!Array.isArray(value)) {
    return normalizeEmail(value);
  }

  const emails = value
    .map((address) => normalizeEmail(address))
    .filter((address): address is string => Boolean(address));

  return emails.length === 1 ? emails[0] : emails;
}

function normalizeFrom(
  value: SendEmailOptions["from"],
  defaultFromAddress: string,
  defaultFromName: string,
): string {
  if (!value) {
    return `${defaultFromName} <${defaultFromAddress}>`;
  }

  if (typeof value === "string") {
    return value;
  }

  if (Array.isArray(value)) {
    return normalizeFrom(value[0], defaultFromAddress, defaultFromName);
  }

  const email = value.address || value.email;

  if (!email) {
    return `${defaultFromName} <${defaultFromAddress}>`;
  }

  return value.name ? `${value.name} <${email}>` : email;
}

function normalizeContent(
  value: SendEmailOptions["html"] | SendEmailOptions["text"],
): string | undefined {
  if (!value) {
    return undefined;
  }

  return typeof value === "string" ? value : value.toString();
}

function normalizeAttachments(
  attachments: SendEmailOptions["attachments"],
): ResendEmailAttachment[] | undefined {
  if (!attachments?.length) {
    return undefined;
  }

  return (attachments as PayloadEmailAttachment[])
    .filter((attachment) => attachment.filename && attachment.content)
    .map((attachment) => ({
      content:
        typeof attachment.content === "string"
          ? Buffer.from(attachment.content).toString("base64")
          : Buffer.from(attachment.content).toString("base64"),
      filename: String(attachment.filename),
    }));
}

export function resendEmailAdapter({
  apiKey,
  defaultFromAddress,
  defaultFromName,
}: ResendEmailAdapterArgs): EmailAdapter<ResendEmailSendResponse> {
  return () => ({
    defaultFromAddress,
    defaultFromName,
    name: "resend",
    sendEmail: async (message) => {
      const to = normalizeRecipients(message.to);

      if (!to || (Array.isArray(to) && to.length === 0)) {
        throw new Error("Resend: message.to is required");
      }

      const payload: ResendEmailPayload = {
        attachments: normalizeAttachments(message.attachments),
        bcc: normalizeRecipients(message.bcc),
        cc: normalizeRecipients(message.cc),
        from: normalizeFrom(message.from, defaultFromAddress, defaultFromName),
        headers: message.headers as Record<string, string> | undefined,
        html: normalizeContent(message.html),
        reply_to: normalizeEmail(message.replyTo),
        subject: String(message.subject || ""),
        text: normalizeContent(message.text),
        to,
      };

      const response = await fetch("https://api.resend.com/emails", {
        body: JSON.stringify(payload),
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        method: "POST",
      });

      const result = (await response
        .json()
        .catch(() => undefined)) as ResendEmailSendResponse | undefined;

      if (!response.ok) {
        throw new Error(
          result?.message || result?.name || response.statusText || "Resend request failed",
        );
      }

      return result || {};
    },
  });
}
