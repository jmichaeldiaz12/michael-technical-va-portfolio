import { z } from "zod";

// Control characters other than \n, \r, \t.
const CONTROL_CHARS = /[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g;

const stripControl = (s: string) => s.replace(CONTROL_CHARS, "");
// Single-line fields: CR/LF become a space.
const singleLine = (s: string) => stripControl(s).replace(/[\r\n]+/g, " ").trim();
const multiLine = (s: string) => stripControl(s).trim();

// Lengths are counted in code points so they match Postgres char_length.
const len = (s: string) => [...s].length;

function text(
  clean: (s: string) => string,
  label: string,
  empty: string,
  min: number,
  max: number,
) {
  return z
    .string()
    .transform(clean)
    .pipe(
      z
        .string()
        .refine((s) => len(s) >= 1, empty)
        .refine((s) => len(s) >= min, `${label} must be at least ${min} characters`)
        .refine((s) => len(s) <= max, `${label} must be ${max} characters or fewer`),
    );
}

export const contactSchema = z.object({
  name: text(singleLine, "Name", "Please enter your name", 2, 100),
  email: z
    .string()
    .transform((s) => singleLine(s).toLowerCase())
    .pipe(
      z
        .string()
        .refine((s) => len(s) >= 1, "Please enter your email address")
        .refine((s) => len(s) <= 254, "Email must be 254 characters or fewer")
        .pipe(z.email("Please enter a valid email address")),
    ),
  subject: text(singleLine, "Subject", "Please enter a subject", 3, 150),
  message: text(multiLine, "Message", "Please enter a message", 10, 5000),
});

export type ContactInput = z.infer<typeof contactSchema>;

export type ContactFormState = {
  status: "idle" | "success" | "error";
  message?: string;
  fieldErrors?: Partial<Record<keyof ContactInput, string>>;
  values?: Partial<ContactInput>;
};
