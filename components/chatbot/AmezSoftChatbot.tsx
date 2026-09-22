"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Bot, CheckCircle2, Loader2, MessageCircle, Send, User, X } from "lucide-react";
import { FormEvent, KeyboardEvent, useEffect, useMemo, useRef, useState } from "react";
import { chatbotQuickActions } from "@/data/chatbot-knowledge";
import { company, whatsappUrl } from "@/config/company";
import { cn } from "@/lib/utils";

type ChatMessage = {
  id: string;
  role: "user" | "assistant";
  content: string;
};

type LeadFormState = {
  name: string;
  email: string;
  mobile: string;
  companyName: string;
  requirement: string;
  consent: boolean;
};

const storageKey = "amezsoft-chat-session";
const sessionMaxAgeMs = 6 * 60 * 60 * 1000;
const greeting = "Hi! 👋 I'm the AmezSoft assistant. How can I help you today?";

const initialLeadForm: LeadFormState = {
  name: "",
  email: "",
  mobile: "",
  companyName: "",
  requirement: "",
  consent: false
};

export function AmezSoftChatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>(defaultMessages);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [leadMode, setLeadMode] = useState(false);
  const [leadForm, setLeadForm] = useState<LeadFormState>(initialLeadForm);
  const [leadStatus, setLeadStatus] = useState<"idle" | "submitting" | "success" | "error">(
    "idle"
  );
  const panelRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const storageReadyRef = useRef(false);

  const visibleQuickActions = useMemo(() => [...chatbotQuickActions], []);

  useEffect(() => {
    const id = window.setTimeout(() => {
      const restored = getStoredMessages();
      storageReadyRef.current = true;
      if (restored) {
        setMessages(restored);
      }
    }, 0);

    return () => window.clearTimeout(id);
  }, []);

  useEffect(() => {
    if (!storageReadyRef.current) {
      return;
    }

    window.localStorage.setItem(
      storageKey,
      JSON.stringify({ savedAt: Date.now(), messages: messages.slice(-12) })
    );
  }, [messages]);

  useEffect(() => {
    if (open) {
      inputRef.current?.focus();
    }
  }, [open]);

  function addMessage(role: ChatMessage["role"], content: string) {
    setMessages((current) => [
      ...current,
      {
        id: crypto.randomUUID(),
        role,
        content
      }
    ]);
  }

  async function sendMessage(content: string) {
    const trimmed = content.trim().slice(0, 700);
    if (!trimmed || loading) {
      return;
    }

    if (trimmed === "Start a Project") {
      addMessage("user", trimmed);
      setLeadMode(true);
      addMessage(
        "assistant",
        "Great. Please share a few details so AmezSoft can contact you about your project enquiry."
      );
      return;
    }

    if (trimmed === "WhatsApp") {
      addMessage("user", trimmed);
      addMessage("assistant", `You can message AmezSoft on WhatsApp here: ${whatsappUrl()}`);
      return;
    }

    const nextMessages: ChatMessage[] = [
      ...messages,
      { id: crypto.randomUUID(), role: "user" as const, content: trimmed }
    ].slice(-10);

    setMessages(nextMessages);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: nextMessages.map(({ role, content }) => ({ role, content })),
          pageUrl: window.location.href,
          languageHint: detectLanguage(trimmed)
        })
      });
      const data: { reply?: string } = await response.json();

      if (!response.ok || !data.reply) {
        throw new Error("Chat unavailable");
      }

      addMessage("assistant", data.reply);
    } catch {
      addMessage(
        "assistant",
        "I am having trouble connecting right now. You can still reach AmezSoft through the contact form, email, or WhatsApp."
      );
    } finally {
      setLoading(false);
    }
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    void sendMessage(input);
  }

  async function submitLead(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLeadStatus("submitting");

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...leadForm,
          language: detectLanguage(leadForm.requirement),
          pageUrl: window.location.href,
          website: ""
        })
      });

      if (!response.ok) {
        throw new Error("Lead submission failed");
      }

      setLeadStatus("success");
      setLeadMode(false);
      setLeadForm(initialLeadForm);
      addMessage(
        "assistant",
        `Your enquiry has been received. You can also contact AmezSoft at ${company.contact.salesEmail} or WhatsApp ${company.contact.whatsapp}.`
      );
    } catch {
      setLeadStatus("error");
    }
  }

  function trapFocus(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key === "Escape") {
      setOpen(false);
      return;
    }

    if (event.key !== "Tab" || !panelRef.current) {
      return;
    }

    const focusable = Array.from(
      panelRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
      )
    );

    if (focusable.length === 0) {
      return;
    }

    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }

  return (
    <div className="fixed bottom-4 right-4 z-[60] flex flex-col items-end gap-3 sm:bottom-5 sm:right-5">
      {!open ? (
        <a
          href={whatsappUrl()}
          target="_blank"
          rel="noreferrer"
          className="inline-flex min-h-11 items-center gap-2 rounded-full border border-emerald-200 bg-white px-4 py-2 text-sm font-bold text-emerald-700 shadow-lg transition hover:-translate-y-0.5 hover:bg-emerald-50"
        >
          WhatsApp
        </a>
      ) : null}

      <AnimatePresence>
        {open ? (
          <motion.section
            ref={panelRef}
            role="dialog"
            aria-label="AmezSoft Chatbot"
            aria-modal="false"
            onKeyDown={trapFocus}
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.96 }}
            transition={{ duration: 0.22 }}
            className="h-[min(720px,calc(100vh-2rem))] w-[min(420px,calc(100vw-2rem))] overflow-hidden rounded-[1.75rem] border border-[var(--border)] bg-white shadow-2xl"
          >
            <div className="brand-gradient flex items-center justify-between px-5 py-4 text-white">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white/16">
                  <Bot aria-hidden="true" className="h-5 w-5" />
                </span>
                <div>
                  <h2 className="text-sm font-black">AmezSoft Chatbot</h2>
                  <p className="text-xs text-white/75">Available 24/7</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/12 transition hover:bg-white/20"
                aria-label="Close chatbot"
              >
                <X aria-hidden="true" className="h-5 w-5" />
              </button>
            </div>

            <div className="flex h-[calc(100%-4.5rem)] flex-col">
              <div className="flex-1 space-y-4 overflow-y-auto bg-[var(--surface-muted)] px-4 py-5">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={cn(
                      "flex gap-2",
                      message.role === "user" ? "justify-end" : "justify-start"
                    )}
                  >
                    {message.role === "assistant" ? (
                      <span className="mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white text-[var(--brand-700)]">
                        <Bot aria-hidden="true" className="h-4 w-4" />
                      </span>
                    ) : null}
                    <p
                      className={cn(
                        "max-w-[82%] whitespace-pre-wrap rounded-3xl px-4 py-3 text-sm leading-6 shadow-sm",
                        message.role === "user"
                          ? "brand-gradient text-white"
                          : "border border-[var(--border)] bg-white text-[var(--foreground)]"
                      )}
                    >
                      {message.content}
                    </p>
                    {message.role === "user" ? (
                      <span className="mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white text-[var(--muted)]">
                        <User aria-hidden="true" className="h-4 w-4" />
                      </span>
                    ) : null}
                  </div>
                ))}

                {loading ? (
                  <div className="flex items-center gap-2 text-sm font-semibold text-[var(--muted)]">
                    <Loader2 aria-hidden="true" className="h-4 w-4 animate-spin" />
                    Typing...
                  </div>
                ) : null}

                {!leadMode ? (
                  <div className="flex flex-wrap gap-2">
                    {visibleQuickActions.map((action) => (
                      <button
                        key={action}
                        type="button"
                        onClick={() => void sendMessage(action)}
                        className="rounded-full border border-[var(--border)] bg-white px-3 py-2 text-xs font-bold text-[var(--brand-700)] shadow-sm transition hover:border-[var(--brand-300)]"
                      >
                        {action}
                      </button>
                    ))}
                  </div>
                ) : null}

                {leadMode ? (
                  <form
                    onSubmit={submitLead}
                    className="grid gap-3 rounded-3xl border border-[var(--border)] bg-white p-4 shadow-sm"
                  >
                    <LeadInput
                      label="Name"
                      value={leadForm.name}
                      onChange={(value) => setLeadForm({ ...leadForm, name: value })}
                    />
                    <LeadInput
                      label="Mobile Number"
                      value={leadForm.mobile}
                      onChange={(value) => setLeadForm({ ...leadForm, mobile: value })}
                    />
                    <LeadInput
                      label="Email"
                      type="email"
                      value={leadForm.email}
                      onChange={(value) => setLeadForm({ ...leadForm, email: value })}
                    />
                    <LeadInput
                      label="Company Name"
                      value={leadForm.companyName}
                      onChange={(value) => setLeadForm({ ...leadForm, companyName: value })}
                    />
                    <label className="grid gap-1 text-xs font-bold text-[var(--foreground)]">
                      Project Requirement
                      <textarea
                        value={leadForm.requirement}
                        onChange={(event) =>
                          setLeadForm({ ...leadForm, requirement: event.target.value })
                        }
                        rows={3}
                        className="rounded-2xl border border-[var(--border)] px-3 py-2 text-sm font-medium"
                        required
                      />
                    </label>
                    <label className="flex items-start gap-2 text-xs leading-5 text-[var(--muted)]">
                      <input
                        type="checkbox"
                        checked={leadForm.consent}
                        onChange={(event) =>
                          setLeadForm({ ...leadForm, consent: event.target.checked })
                        }
                        className="mt-1"
                        required
                      />
                      <span>
                        By submitting, you agree that AmezSoft may contact you regarding your
                        project enquiry.
                      </span>
                    </label>
                    {leadStatus === "error" ? (
                      <p className="rounded-2xl bg-red-50 px-3 py-2 text-xs font-bold text-red-700">
                        Please check the details and try again.
                      </p>
                    ) : null}
                    {leadStatus === "success" ? (
                      <p className="flex items-center gap-2 rounded-2xl bg-emerald-50 px-3 py-2 text-xs font-bold text-emerald-700">
                        <CheckCircle2 aria-hidden="true" className="h-4 w-4" />
                        Enquiry received.
                      </p>
                    ) : null}
                    <button
                      type="submit"
                      disabled={leadStatus === "submitting"}
                      className="brand-gradient inline-flex min-h-10 items-center justify-center gap-2 rounded-full px-4 py-2 text-sm font-bold text-white"
                    >
                      {leadStatus === "submitting" ? "Submitting..." : "Submit Enquiry"}
                    </button>
                  </form>
                ) : null}
              </div>

              <form
                onSubmit={handleSubmit}
                className="flex gap-2 border-t border-[var(--border)] bg-white p-3"
              >
                <input
                  ref={inputRef}
                  value={input}
                  onChange={(event) => setInput(event.target.value)}
                  maxLength={700}
                  placeholder="Ask about AmezSoft..."
                  className="min-h-11 flex-1 rounded-full border border-[var(--border)] px-4 text-sm focus:border-[var(--brand-400)] focus:outline-none focus:ring-4 focus:ring-red-100"
                  aria-label="Chat message"
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="brand-gradient flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-white disabled:opacity-60"
                  aria-label="Send message"
                >
                  <Send aria-hidden="true" className="h-4 w-4" />
                </button>
              </form>
            </div>
          </motion.section>
        ) : null}
      </AnimatePresence>

      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        className="brand-gradient flex h-14 w-14 items-center justify-center rounded-full text-white shadow-2xl transition hover:-translate-y-0.5"
        aria-label={open ? "Close AmezSoft Chatbot" : "Open AmezSoft Chatbot"}
      >
        {open ? (
          <X aria-hidden="true" className="h-6 w-6" />
        ) : (
          <MessageCircle aria-hidden="true" className="h-6 w-6" />
        )}
      </button>
    </div>
  );
}

function LeadInput({
  label,
  value,
  onChange,
  type = "text"
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
}) {
  return (
    <label className="grid gap-1 text-xs font-bold text-[var(--foreground)]">
      {label}
      <input
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="rounded-2xl border border-[var(--border)] px-3 py-2 text-sm font-medium"
        required={label !== "Company Name"}
      />
    </label>
  );
}

function detectLanguage(text: string): "English" | "Hindi" | "Hinglish" {
  if (/[\u0900-\u097F]/.test(text)) {
    return "Hindi";
  }

  const normalized = text.toLowerCase();
  if (/\b(kya|hai|kaise|chahiye|batao|project banana|kitna)\b/.test(normalized)) {
    return "Hinglish";
  }

  return "English";
}

const defaultMessages: ChatMessage[] = [
  { id: "greeting", role: "assistant", content: greeting }
];

function getStoredMessages(): ChatMessage[] | null {
  const raw = window.localStorage.getItem(storageKey);
  if (!raw) {
    return null;
  }

  try {
    const parsed: { savedAt: number; messages: ChatMessage[] } = JSON.parse(raw);
    if (Date.now() - parsed.savedAt < sessionMaxAgeMs && parsed.messages.length > 0) {
      return parsed.messages.slice(-12);
    }
  } catch {
    window.localStorage.removeItem(storageKey);
  }

  return null;
}
