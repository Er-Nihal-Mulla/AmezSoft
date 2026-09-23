"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { mainNavigation } from "@/data/navigation";
import { cn } from "@/lib/utils";
import { LinkButton } from "../ui/Button";
import { containerClassName } from "../ui/Container";
import { Logo } from "./Logo";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-50 border-b border-white/60 bg-white/78 backdrop-blur-xl">
      <nav
        className={containerClassName("wide", "flex h-20 items-center justify-between")}
        aria-label="Primary"
      >
        <Logo />

        <div className="hidden items-center gap-1 lg:flex">
          {mainNavigation.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "rounded-full px-3 py-2 text-sm font-semibold text-[var(--muted)] transition hover:bg-[var(--surface-muted)] hover:text-[var(--brand-700)]",
                  active && "bg-[var(--surface-muted)] text-[var(--brand-700)]"
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </div>

        <div className="hidden lg:block">
          <LinkButton href="/contact" className="px-4 py-2.5" showArrow>
            Start a Project
          </LinkButton>
        </div>

        <button
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[var(--border)] bg-white text-[var(--foreground)] shadow-sm lg:hidden"
          aria-label={open ? "Close navigation" : "Open navigation"}
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? (
            <X aria-hidden="true" className="h-5 w-5" />
          ) : (
            <Menu aria-hidden="true" className="h-5 w-5" />
          )}
        </button>
      </nav>

      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-x-0 top-20 z-40 h-[calc(100vh-5rem)] bg-[var(--foreground)]/30 p-4 backdrop-blur-sm lg:hidden"
          >
            <motion.div
              initial={{ opacity: 0, y: -12, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.98 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden rounded-3xl border border-white/70 bg-white p-3 shadow-2xl"
            >
              <div className="grid gap-1">
                {mainNavigation.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "rounded-2xl px-4 py-3 text-base font-semibold text-[var(--muted)] transition hover:bg-[var(--surface-muted)] hover:text-[var(--brand-700)]",
                      pathname === item.href &&
                        "bg-[var(--surface-muted)] text-[var(--brand-700)]"
                    )}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
              <LinkButton
                href="/contact"
                className="mt-4 w-full"
                onClick={() => setOpen(false)}
              >
                Start a Project
              </LinkButton>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
