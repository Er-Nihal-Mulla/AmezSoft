import { company } from "@/config/company";
import type { ContactInput, LeadInput } from "@/lib/validation";

function baseHtml(title: string, rows: [string, string][]) {
  const escapedRows = rows
    .map(
      ([label, value]) =>
        `<tr><td style="padding:8px 12px;border-bottom:1px solid #eadeda;font-weight:700;color:#171311">${escapeHtml(label)}</td><td style="padding:8px 12px;border-bottom:1px solid #eadeda;color:#4f4642">${escapeHtml(value)}</td></tr>`
    )
    .join("");

  return `<!doctype html><html><body style="margin:0;background:#fffaf7;font-family:Arial,sans-serif;color:#171311"><div style="max-width:680px;margin:0 auto;padding:32px"><div style="background:#ffffff;border:1px solid #eadeda;border-radius:18px;overflow:hidden"><div style="background:#a11017;color:#ffffff;padding:24px"><h1 style="margin:0;font-size:22px">${escapeHtml(title)}</h1><p style="margin:8px 0 0;color:#ffe4e1">${escapeHtml(company.tagline)}</p></div><table style="width:100%;border-collapse:collapse;font-size:14px">${escapedRows}</table></div></div></body></html>`;
}

function baseText(title: string, rows: [string, string][]) {
  return [
    `${title}`,
    company.tagline,
    "",
    ...rows.map(([label, value]) => `${label}: ${value}`)
  ].join("\n");
}

export function contactTemplate(input: ContactInput, submittedAt: string) {
  const rows: [string, string][] = [
    ["Name", input.name],
    ["Email", input.email],
    ["Mobile", input.mobile],
    ["Company", input.companyName || "Not provided"],
    ["Service", input.service],
    ["Preferred contact", input.preferredContact],
    ["Requirement", input.requirement],
    ["Submitted at", submittedAt]
  ];

  return {
    subject: `New AmezSoft enquiry: ${input.service}`,
    html: baseHtml("New AmezSoft Website Enquiry", rows),
    text: baseText("New AmezSoft Website Enquiry", rows)
  };
}

export function leadTemplate(input: LeadInput, submittedAt: string) {
  const rows: [string, string][] = [
    ["Lead source", "AmezSoft Chatbot"],
    ["Name", input.name],
    ["Email", input.email],
    ["Mobile", input.mobile],
    ["Company", input.companyName || "Not provided"],
    ["Requirement", input.requirement],
    ["Page URL", input.pageUrl || "Not provided"],
    ["Language", input.language],
    ["Submitted at", submittedAt]
  ];

  return {
    subject: "New AmezSoft chatbot project lead",
    html: baseHtml("New AmezSoft Chatbot Lead", rows),
    text: baseText("New AmezSoft Chatbot Lead", rows)
  };
}

export function supportTemplate(input: ContactInput, submittedAt: string) {
  const rows: [string, string][] = [
    ["Name", input.name],
    ["Email", input.email],
    ["Mobile", input.mobile],
    ["Company", input.companyName || "Not provided"],
    ["Preferred contact", input.preferredContact],
    ["Message", input.requirement],
    ["Submitted at", submittedAt]
  ];

  return {
    subject: "New AmezSoft support enquiry",
    html: baseHtml("New AmezSoft Support Enquiry", rows),
    text: baseText("New AmezSoft Support Enquiry", rows)
  };
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
