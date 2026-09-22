import { emailDestinations, EmailService } from "@/lib/email/email-service";
import { contactTemplate, leadTemplate, supportTemplate } from "@/lib/email/templates";
import type { ContactInput, LeadInput } from "@/lib/validation";

export class LeadNotificationService {
  constructor(private readonly emailService = new EmailService()) {}

  async sendContactEnquiry(input: ContactInput) {
    const destinations = emailDestinations();
    const submittedAt = new Date().toISOString();
    const template =
      input.service.toLowerCase().includes("support") ||
      input.requirement.toLowerCase().includes("support")
        ? supportTemplate(input, submittedAt)
        : contactTemplate(input, submittedAt);

    const to = template.subject.toLowerCase().includes("support")
      ? [destinations.support]
      : [destinations.sales];

    return this.emailService.send({
      ...template,
      to,
      cc: [destinations.general],
      replyTo: input.email
    });
  }

  async sendChatbotLead(input: LeadInput) {
    const destinations = emailDestinations();
    const submittedAt = new Date().toISOString();
    const template = leadTemplate(input, submittedAt);

    return this.emailService.send({
      ...template,
      to: [destinations.sales],
      cc: [destinations.general],
      replyTo: input.email
    });
  }
}
