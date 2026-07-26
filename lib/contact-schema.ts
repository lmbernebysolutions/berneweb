import { z } from "zod";

/** Shared contact form schema (client + `/api/contact`). */
export const ContactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Bitte einen Namen mit mindestens 2 Zeichen eingeben.")
    .max(100, "Name ist zu lang."),
  email: z
    .string()
    .trim()
    .min(1, "Bitte eine E-Mail-Adresse eingeben.")
    .email("Bitte eine gültige E-Mail-Adresse eingeben.")
    .max(200, "E-Mail ist zu lang."),
  phone: z.preprocess(
    (value) => {
      if (typeof value !== "string") return undefined;
      const trimmed = value.trim();
      return trimmed.length === 0 ? undefined : trimmed;
    },
    z
      .string()
      .max(50, "Telefonnummer ist zu lang.")
      .optional()
  ),
  message: z
    .string()
    .trim()
    .min(10, "Bitte eine Nachricht mit mindestens 10 Zeichen eingeben.")
    .max(2000, "Nachricht ist zu lang."),
});

export type ContactPayload = z.infer<typeof ContactSchema>;
