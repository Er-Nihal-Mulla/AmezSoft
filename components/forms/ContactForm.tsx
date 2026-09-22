"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import type { ReactNode } from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { services } from "@/data/services";
import { contactSchema, type ContactInput } from "@/lib/validation";
import { ActionButton } from "../ui/Button";
import { cn } from "@/lib/utils";

const contactMethods = ["Email", "Phone", "WhatsApp", "Video call"];

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting }
  } = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      mobile: "",
      companyName: "",
      service: "",
      requirement: "",
      preferredContact: "",
      website: ""
    }
  });

  async function onSubmit(values: ContactInput) {
    setStatus("idle");
    setMessage("");

    const response = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values)
    });

    if (!response.ok) {
      setStatus("error");
      setMessage("Something went wrong. Please review the form and try again.");
      return;
    }

    setStatus("success");
    setMessage("Thanks. Your enquiry has been received and is ready for follow-up.");
    reset();
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="grid gap-5 rounded-[2rem] border border-[var(--border)] bg-white p-6 shadow-[var(--shadow-tight)] sm:p-8"
    >
      <input
        className="hidden"
        tabIndex={-1}
        autoComplete="off"
        {...register("website")}
        aria-hidden="true"
      />
      <div className="grid gap-5 md:grid-cols-2">
        <Field label="Name" error={errors.name?.message}>
          <input
            {...register("name")}
            autoComplete="name"
            className={fieldClass(Boolean(errors.name))}
          />
        </Field>
        <Field label="Email" error={errors.email?.message}>
          <input
            {...register("email")}
            type="email"
            autoComplete="email"
            className={fieldClass(Boolean(errors.email))}
          />
        </Field>
        <Field label="Mobile Number" error={errors.mobile?.message}>
          <input
            {...register("mobile")}
            autoComplete="tel"
            className={fieldClass(Boolean(errors.mobile))}
          />
        </Field>
        <Field label="Company Name" error={errors.companyName?.message}>
          <input
            {...register("companyName")}
            autoComplete="organization"
            className={fieldClass(Boolean(errors.companyName))}
          />
        </Field>
        <Field label="Service" error={errors.service?.message}>
          <select {...register("service")} className={fieldClass(Boolean(errors.service))}>
            <option value="">Select service</option>
            {services.map((service) => (
              <option key={service.slug} value={service.title}>
                {service.title}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <Field label="Project Requirement" error={errors.requirement?.message}>
        <textarea
          {...register("requirement")}
          rows={6}
          className={fieldClass(Boolean(errors.requirement))}
        />
      </Field>

      <Field label="Preferred Contact Method" error={errors.preferredContact?.message}>
        <select
          {...register("preferredContact")}
          className={fieldClass(Boolean(errors.preferredContact))}
        >
          <option value="">Select contact method</option>
          {contactMethods.map((method) => (
            <option key={method} value={method}>
              {method}
            </option>
          ))}
        </select>
      </Field>

      {message ? (
        <p
          className={cn(
            "rounded-2xl px-4 py-3 text-sm font-semibold",
            status === "success" ? "bg-emerald-50 text-emerald-800" : "bg-red-50 text-red-800"
          )}
          role="status"
        >
          {message}
        </p>
      ) : null}

      <ActionButton type="submit" disabled={isSubmitting} showArrow className="w-full sm:w-fit">
        {isSubmitting ? "Sending..." : "Send Project Enquiry"}
      </ActionButton>
    </form>
  );
}

function Field({
  label,
  error,
  children
}: {
  label: string;
  error?: string;
  children: ReactNode;
}) {
  return (
    <label className="grid gap-2 text-sm font-semibold text-[var(--foreground)]">
      <span>{label}</span>
      {children}
      {error ? <span className="text-sm font-medium text-red-700">{error}</span> : null}
    </label>
  );
}

function fieldClass(hasError: boolean) {
  return cn(
    "min-h-12 w-full rounded-2xl border bg-white px-4 py-3 text-sm text-[var(--foreground)] shadow-sm transition placeholder:text-[var(--muted)] focus:border-[var(--brand-400)] focus:outline-none focus:ring-4 focus:ring-red-100",
    hasError ? "border-red-300" : "border-[var(--border)]"
  );
}
