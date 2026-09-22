"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import type { ReactNode } from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { careerApplicationSchema, type CareerApplicationInput } from "@/lib/validation";
import { cn } from "@/lib/utils";
import { ActionButton } from "../ui/Button";

export function CareerForm() {
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting }
  } = useForm<CareerApplicationInput>({
    resolver: zodResolver(careerApplicationSchema),
    defaultValues: {
      name: "",
      email: "",
      role: "",
      portfolio: "",
      message: "",
      website: ""
    }
  });

  async function onSubmit(values: CareerApplicationInput) {
    setStatus("idle");
    setMessage("");

    const response = await fetch("/api/careers", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values)
    });

    if (!response.ok) {
      setStatus("error");
      setMessage("Something went wrong. Please check the form and try again.");
      return;
    }

    setStatus("success");
    setMessage("Thanks. Your general application has been received.");
    reset();
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="grid gap-5 rounded-[2rem] border border-[var(--border)] bg-white p-6 shadow-sm sm:p-8"
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
      </div>
      <Field label="Role of Interest" error={errors.role?.message}>
        <input {...register("role")} className={fieldClass(Boolean(errors.role))} />
      </Field>
      <Field label="Portfolio or LinkedIn URL" error={errors.portfolio?.message}>
        <input
          {...register("portfolio")}
          type="url"
          className={fieldClass(Boolean(errors.portfolio))}
        />
      </Field>
      <Field label="Message" error={errors.message?.message}>
        <textarea
          {...register("message")}
          rows={5}
          className={fieldClass(Boolean(errors.message))}
        />
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
        {isSubmitting ? "Sending..." : "Send General Application"}
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
    "min-h-12 w-full rounded-2xl border bg-white px-4 py-3 text-sm text-[var(--foreground)] shadow-sm transition focus:border-[var(--brand-400)] focus:outline-none focus:ring-4 focus:ring-red-100",
    hasError ? "border-red-300" : "border-[var(--border)]"
  );
}
