export function redactEmail(email: string) {
  const [name, domain] = email.split("@");
  if (!name || !domain) {
    return "redacted";
  }

  return `${name.slice(0, 2)}***@${domain}`;
}

export function redactPhone(phone: string) {
  const digits = phone.replace(/\D/g, "");
  if (digits.length < 4) {
    return "redacted";
  }

  return `***${digits.slice(-4)}`;
}

export function safeLog(label: string, payload: Record<string, unknown>) {
  if (process.env.NODE_ENV === "production") {
    console.info(label, payload);
    return;
  }

  console.info(label, payload);
}
