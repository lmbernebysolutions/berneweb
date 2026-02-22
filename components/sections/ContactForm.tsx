"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { IconLoader2, IconSend } from "@tabler/icons-react";
import { TechCorners } from "@/components/ui/tech-corners";
import { BLogo } from "@/components/brand/BLogo";

type FormState = "idle" | "sending" | "success" | "error";

export function ContactForm() {
  const [state, setState] = useState<FormState>("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState("sending");

    const form = e.currentTarget;
    const data = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value.trim(),
      email: (form.elements.namedItem("email") as HTMLInputElement).value.trim(),
      phone: (form.elements.namedItem("phone") as HTMLInputElement).value.trim() || undefined,
      message: (form.elements.namedItem("message") as HTMLTextAreaElement).value.trim(),
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        setState("success");
      } else {
        setState("error");
      }
    } catch {
      setState("error");
    }
  }

  if (state === "success") {
    return (
      <div className="relative flex flex-col items-center border border-brand-cyan/30 bg-brand-cyan/5 p-10 text-center overflow-hidden">
        <TechCorners pattern="all" variant="cyan" size="md" />

        <BLogo size={64} className="opacity-90" />
        <div className="mt-2 font-mono text-[0.6rem] text-brand-cyan/80 uppercase tracking-widest">
          STATUS: GESENDET
        </div>
        <h3 className="mt-4 text-xl font-extrabold uppercase tracking-wide">Nachricht gesendet</h3>
        <p className="mt-2 text-muted-foreground">
          Wir melden uns innerhalb von 24 Stunden bei Ihnen.
        </p>
        <Button
          variant="outline"
          className="mt-6 cursor-pointer"
          onClick={() => setState("idle")}
        >
          Neue Nachricht
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="name" className="text-xs font-bold uppercase tracking-[0.15em]">
            Name *
          </Label>
          <Input
            id="name"
            name="name"
            required
            autoComplete="name"
            placeholder="Max Mustermann…"
            disabled={state === "sending"}
            className="input-focus-glow"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email" className="text-xs font-bold uppercase tracking-[0.15em]">
            E-Mail *
          </Label>
          <Input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            spellCheck={false}
            placeholder="max@beispiel.de…"
            disabled={state === "sending"}
            className="input-focus-glow"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="phone" className="text-xs font-bold uppercase tracking-[0.15em]">
          Telefon
        </Label>
        <Input
          id="phone"
          name="phone"
          type="tel"
          autoComplete="tel"
          placeholder="+49…"
          disabled={state === "sending"}
          className="input-focus-glow"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="message" className="text-xs font-bold uppercase tracking-[0.15em]">
          Nachricht *
        </Label>
        <Textarea
          id="message"
          name="message"
          required
          placeholder="Wie können wir Ihnen helfen?…"
          rows={5}
          disabled={state === "sending"}
          className="input-focus-glow"
        />
      </div>

      {/* DSGVO-Pflichtfeld: Einwilligung / Hinweis Art. 13 DSGVO */}
      <div className="flex items-start gap-3 border border-white/10 bg-white/[0.02] p-4">
        <input
          id="privacy"
          name="privacy"
          type="checkbox"
          required
          disabled={state === "sending"}
          className="mt-0.5 h-4 w-4 shrink-0 cursor-pointer accent-brand-cyan"
        />
        <label htmlFor="privacy" className="text-xs leading-relaxed text-white/60 cursor-pointer">
          Ich habe die{" "}
          <a
            href="/datenschutz"
            target="_blank"
            rel="noopener noreferrer"
            className="text-brand-cyan underline underline-offset-2 hover:text-brand-cyan/80"
          >
            Datenschutzerklärung
          </a>{" "}
          gelesen und stimme der Verarbeitung meiner Daten zur Bearbeitung meiner Anfrage zu.{" "}
          <span className="text-white/40">(Pflichtfeld)</span>
        </label>
      </div>

      {state === "error" && (
        <div className="relative border border-destructive/30 bg-destructive/5 p-3">
          <div className="absolute top-0 left-0 h-1.5 w-1.5 border-t border-l border-destructive" />
          <div className="absolute bottom-0 right-0 h-1.5 w-1.5 border-b border-r border-destructive" />
          <p className="text-sm text-destructive">
            Etwas ist schiefgelaufen. Bitte versuchen Sie es erneut oder rufen Sie
            uns an.
          </p>
        </div>
      )}

      <Button
        type="submit"
        size="lg"
        className="group w-full cursor-pointer shadow-[0_0_15px_rgba(3,249,249,0.2)] sm:w-auto"
        disabled={state === "sending"}
      >
        {state === "sending" ? (
          <>
            <IconLoader2 className="size-4 animate-spin" />
            Wird gesendet...
          </>
        ) : (
          <>
            Nachricht senden
            <IconSend className="ml-1.5 size-4 transition-transform group-hover:translate-x-0.5" stroke={2} />
          </>
        )}
      </Button>
    </form>
  );
}
