"use client";

import React, { useState } from "react";
import { useFunnel } from "../FunnelContext";
import { FunnelInput } from "../atoms/FunnelInput";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { cn } from "@/lib/utils";

const WHATSAPP_NUMBER = "4915511960927";

export function Screen7LeadCapture() {
  const { state, submitLead, nextStep } = useFunnel();
  const { answers, isSubmitting } = state;

  const [gdprAccepted, setGdprAccepted] = useState(false);
  const [contact, setContact] = useState("");
  const [contactError, setContactError] = useState("");
  const [submitError, setSubmitError] = useState("");

  const painLabel = answers.step2Label ?? "euren größten Schmerzpunkt";

  const validate = (): boolean => {
    if (!contact.trim() || contact.trim().length < 3) {
      setContactError("Bitte gib eine gültige E-Mail oder deinen Namen an.");
      return false;
    }
    setContactError("");
    return true;
  };

  // Primary CTA: WhatsApp (opens link, also logs via API)
  const handleWhatsApp = async () => {
    if (!gdprAccepted || !validate()) return;

    // Log lead asynchronously, don't block the WhatsApp redirect
    submitLead(contact, "whatsapp").catch(console.error);

    const msg = encodeURIComponent(
      `Hallo Daniel! Ich habe gerade den Berneby Digital-Check gemacht.\n\nMein größtes Problem: ${painLabel}\n\nMein Name / Kontakt: ${contact}\n\nIch freue mich auf die Ergebnisse.`
    );
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`, "_blank", "noopener");
    // Advance to success screen
    setTimeout(nextStep, 500);
  };

  // Secondary CTA: E-Mail submission via API
  const handleEmail = async () => {
    if (!gdprAccepted || !validate()) return;
    setSubmitError("");
    const ok = await submitLead(contact, "email");
    if (!ok) {
      setSubmitError("Fehler beim Senden. Bitte versuch es erneut.");
    }
  };

  return (
    <div className="flex flex-col gap-6 w-full">
      {/* Daniel Trust Element */}
      <div className="flex items-start gap-4 mt-2">
        <div className="shrink-0 w-14 h-14 border border-brand-cyan/20 overflow-hidden relative">
          <Image src="/Daniel.png" alt="Daniel Hamburg" fill className="object-cover" sizes="56px" />
        </div>
        <div className="flex flex-col justify-center">
          <p className="text-base font-bold text-white">Daniel Hamburg</p>
          <p className="text-sm text-white/50 mt-0.5">Werte deine Analyse persönlich aus.</p>
        </div>
      </div>

      {/* Dynamic Text Injection */}
      <div className="border-l-2 border-brand-cyan/40 pl-4 py-1">
        <p className="text-base text-white/80 leading-relaxed">
          Dein Report zeigt dir exakt, wie andere Betriebe im Erzgebirge{" "}
          <span className="text-brand-cyan font-bold">{painLabel}</span>{" "}
          dauerhaft in den Griff bekommen haben.
        </p>
      </div>

      {/* Contact Input */}
      <div className="flex flex-col gap-2">
        <FunnelInput
          id="funnel-contact"
          label="Wohin sollen wir die Ergebnisse senden?"
          placeholder="E-Mail oder Name + Telefon"
          value={contact}
          onChange={(e) => setContact(e.target.value)}
          error={contactError}
          disabled={isSubmitting}
        />
      </div>

      {/* DSGVO Checkbox */}
      <label className="flex items-start gap-3 cursor-pointer group">
        <button
          type="button"
          role="checkbox"
          aria-checked={gdprAccepted}
          onClick={() => setGdprAccepted((v) => !v)}
          className={cn(
            "shrink-0 mt-0.5 w-5 h-5 border-2 flex items-center justify-center transition-all",
            "tap-target",
            gdprAccepted
              ? "border-brand-cyan bg-brand-cyan"
              : "border-brand-cyan/30 group-hover:border-brand-cyan/60"
          )}
        >
          {gdprAccepted && (
            <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
              <path d="M1 4L3.5 6.5L9 1" stroke="#283569" strokeWidth="1.5" strokeLinecap="square" />
            </svg>
          )}
        </button>
        <span className="text-xs text-white/50 leading-relaxed">
          Ich stimme zu, dass Berneby Solutions mich per E-Mail oder WhatsApp kontaktieren darf.
          Kein Spam. Jederzeit widerruflich.{" "}
          <a href="/datenschutz" className="text-brand-cyan/80 underline underline-offset-2 hover:text-brand-cyan" target="_blank">
            Datenschutz
          </a>
        </span>
      </label>

      {/* CTAs */}
      <div className="flex flex-col gap-3 mt-4">
        {/* Micro copy */}
        <p className="text-center text-xs font-mono text-white/40 uppercase tracking-widest">
          Kein Agentur-Spam · Nur echte Ergebnisse · DSGVO-konform
        </p>
        
        {/* Primary: WhatsApp */}
        <Button
          onClick={handleWhatsApp}
          disabled={!gdprAccepted || isSubmitting}
          size="lg"
          className="w-full"
        >
          <svg className="mr-2" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
          REPORT VIA WHATSAPP
        </Button>

        {/* Secondary: E-Mail */}
        <Button
          onClick={handleEmail}
          disabled={!gdprAccepted || isSubmitting}
          variant="outline"
          size="lg"
          className="w-full"
        >
          {isSubmitting ? "WIRD GESENDET..." : "ODER PER E-MAIL"}
        </Button>
      </div>

      {/* Submit error */}
      {submitError && (
        <p className="text-sm text-red-400 text-center font-medium">{submitError}</p>
      )}
    </div>
  );
}
