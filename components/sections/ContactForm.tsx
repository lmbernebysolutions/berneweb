"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CONTACT_SUBJECTS } from "@/lib/constants";
import { IconCheck, IconLoader2, IconArrowRight, IconSend } from "@tabler/icons-react";

type FormState = "idle" | "sending" | "success" | "error";

export function ContactForm() {
  const [state, setState] = useState<FormState>("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState("sending");

    // Simulate form submission (replace with actual endpoint)
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setState("success");
    } catch {
      setState("error");
    }
  }

  if (state === "success") {
    return (
      <div className="flex flex-col items-center rounded-2xl border border-border bg-section-alt p-10 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-green-100 shadow-lg shadow-green-100/50">
          <IconCheck className="size-8 text-green-600" stroke={2} />
        </div>
        <h3 className="mt-5 text-xl font-extrabold">Nachricht gesendet!</h3>
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
          <Label htmlFor="name" className="text-sm font-semibold">
            Name *
          </Label>
          <Input
            id="name"
            name="name"
            required
            placeholder="Max Mustermann"
            disabled={state === "sending"}
            className="rounded-xl"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email" className="text-sm font-semibold">
            E-Mail *
          </Label>
          <Input
            id="email"
            name="email"
            type="email"
            required
            placeholder="max@beispiel.de"
            disabled={state === "sending"}
            className="rounded-xl"
          />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="phone" className="text-sm font-semibold">
            Telefon
          </Label>
          <Input
            id="phone"
            name="phone"
            type="tel"
            placeholder="+49 ..."
            disabled={state === "sending"}
            className="rounded-xl"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="subject" className="text-sm font-semibold">
            Betreff *
          </Label>
          <Select name="subject" required disabled={state === "sending"}>
            <SelectTrigger id="subject" className="rounded-xl">
              <SelectValue placeholder="Bitte wählen" />
            </SelectTrigger>
            <SelectContent>
              {CONTACT_SUBJECTS.map((subject) => (
                <SelectItem key={subject} value={subject}>
                  {subject}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="message" className="text-sm font-semibold">
          Nachricht *
        </Label>
        <Textarea
          id="message"
          name="message"
          required
          placeholder="Wie können wir Ihnen helfen?"
          rows={5}
          disabled={state === "sending"}
          className="rounded-xl"
        />
      </div>

      {state === "error" && (
        <div className="rounded-xl border border-destructive/20 bg-destructive/5 p-3">
          <p className="text-sm text-destructive">
            Etwas ist schiefgelaufen. Bitte versuchen Sie es erneut oder rufen Sie
            uns an.
          </p>
        </div>
      )}

      <Button
        type="submit"
        size="lg"
        className="group w-full cursor-pointer shadow-lg sm:w-auto"
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
