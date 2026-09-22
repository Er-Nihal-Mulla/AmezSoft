import { z } from "zod";

const phoneRegex = /^[+()\-\s0-9]{7,20}$/;

export const contactSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name.").max(80),
  email: z.email("Please enter a valid email address.").max(120),
  mobile: z
    .string()
    .trim()
    .min(7, "Please enter your mobile number.")
    .max(20)
    .refine((value) => phoneRegex.test(value), "Please enter a valid mobile number."),
  companyName: z.string().trim().max(120).optional(),
  service: z.string().trim().min(2, "Select a service."),
  requirement: z.string().trim().min(20, "Please share a little more detail.").max(3000),
  preferredContact: z.string().trim().min(2, "Select a preferred contact method."),
  website: z.string().max(0, "Spam detected.").optional()
});

export const leadSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name.").max(80),
  email: z.email("Please enter a valid email address.").max(120),
  mobile: z
    .string()
    .trim()
    .min(7, "Please enter your mobile number.")
    .max(20)
    .refine((value) => phoneRegex.test(value), "Please enter a valid mobile number."),
  companyName: z.string().trim().max(120).optional(),
  requirement: z.string().trim().min(20, "Please share a little more detail.").max(3000),
  consent: z.literal(true, {
    error: "Please confirm AmezSoft may contact you about this enquiry."
  }),
  pageUrl: z.url().max(300).optional(),
  language: z.enum(["English", "Hindi", "Hinglish"]).default("English"),
  website: z.string().max(0, "Spam detected.").optional()
});

export const chatRequestSchema = z.object({
  messages: z
    .array(
      z.object({
        role: z.enum(["user", "assistant"]),
        content: z.string().trim().min(1).max(700)
      })
    )
    .min(1)
    .max(10),
  pageUrl: z.url().max(300).optional(),
  languageHint: z.enum(["English", "Hindi", "Hinglish"]).optional()
});

export const careerApplicationSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name.").max(80),
  email: z.email("Please enter a valid email address.").max(120),
  role: z.string().trim().min(2, "Please enter the role you are interested in.").max(120),
  portfolio: z.url("Please enter a valid URL.").optional().or(z.literal("")),
  message: z.string().trim().min(20, "Please share a little more context.").max(2000),
  website: z.string().max(0, "Spam detected.").optional()
});

export type ContactInput = z.infer<typeof contactSchema>;
export type LeadInput = z.infer<typeof leadSchema>;
export type ChatRequestInput = z.infer<typeof chatRequestSchema>;
export type CareerApplicationInput = z.infer<typeof careerApplicationSchema>;
