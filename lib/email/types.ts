export type EmailMessage = {
  to: string[];
  cc?: string[];
  subject: string;
  html: string;
  text: string;
  replyTo?: string;
};

export type EmailResult = {
  ok: boolean;
  provider: "development-log" | "resend";
};

export interface EmailProvider {
  send(message: EmailMessage): Promise<EmailResult>;
}
