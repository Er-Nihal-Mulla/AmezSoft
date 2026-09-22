import type { CareerApplicationInput, ContactInput } from "@/lib/validation";

export type MailResult = {
  ok: boolean;
  provider: "development-log";
};

export interface MailProvider {
  sendProjectEnquiry(input: ContactInput): Promise<MailResult>;
  sendCareerApplication(input: CareerApplicationInput): Promise<MailResult>;
}
