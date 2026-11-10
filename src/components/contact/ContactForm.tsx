"use client";

import { useActionState, useEffect, useRef, useState, type FormEvent } from "react";
import { AlertCircle, CheckCircle2, Loader2 } from "lucide-react";
import { submitContact } from "@/app/contact/actions";
import {
  contactSchema,
  type ContactFormState,
  type ContactInput,
} from "@/lib/validation/contact";

const FIELD_ORDER: (keyof ContactInput)[] = ["name", "email", "subject", "message"];
const MESSAGE_MAX = 5000;

const inputBase =
  "mt-1.5 block w-full rounded-button border border-[#8792a6] bg-surface px-3.5 text-ink placeholder:text-muted focus:border-signal focus:outline-none focus:ring-2 focus:ring-signal aria-[invalid=true]:border-error";
const inputClass = `${inputBase} h-12`;
const textareaClass = `${inputBase} py-3`;
const labelClass = "block text-[0.9375rem] font-semibold text-ink";
const errorClass = "mt-1.5 text-sm text-error";

const initialState: ContactFormState = { status: "idle" };

export default function ContactForm() {
  // Bumping the key remounts the form, which resets useActionState after success.
  const [submission, setSubmission] = useState(0);
  return <ContactFormInner key={submission} onReset={() => setSubmission((n) => n + 1)} />;
}

function ContactFormInner({ onReset }: { onReset: () => void }) {
  const [state, formAction, isPending] = useActionState(submitContact, initialState);
  const [localErrors, setLocalErrors] = useState<ContactFormState["fieldErrors"] | null>(null);
  const [messageLength, setMessageLength] = useState([...(state.values?.message ?? "")].length);
  // Field keys whose error was dismissed because the user edited the field. Cleared on each submit.
  const [dismissed, setDismissed] = useState<ReadonlySet<keyof ContactInput>>(new Set());
  const elapsedInputRef = useRef<HTMLInputElement>(null);
  const mountedAtRef = useRef<number | null>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    mountedAtRef.current = performance.now();
  }, []);

  const succeeded = state.status === "success";
  useEffect(() => {
    if (succeeded) headingRef.current?.focus();
  }, [succeeded]);

  if (succeeded) {
    return (
      <div
        role="status"
        className="mt-5 rounded-block border border-rule bg-paper p-6 text-center"
      >
        <CheckCircle2 size={36} className="mx-auto text-green-700" aria-hidden="true" />
        <h3
          ref={headingRef}
          tabIndex={-1}
          className="mt-3 text-s2 font-bold text-ink focus:outline-none"
        >
          Message sent
        </h3>
        <p className="mt-2 text-body">{state.message}</p>
        <button
          type="button"
          onClick={onReset}
          className="mt-5 inline-flex h-12 items-center justify-center rounded-button border-[1.5px] border-ink/20 bg-transparent px-5 font-semibold text-ink transition-colors hover:border-ink/50"
        >
          Send another message
        </button>
      </div>
    );
  }

  const allErrors = localErrors ?? state.fieldErrors ?? {};
  const errors: NonNullable<ContactFormState["fieldErrors"]> = {};
  for (const k of FIELD_ORDER) {
    if (allErrors[k] && !dismissed.has(k)) errors[k] = allErrors[k];
  }
  const hasVisibleErrors = FIELD_ORDER.some((k) => errors[k]);
  const values = state.values ?? {};

  function dismiss(key: keyof ContactInput) {
    if (allErrors[key] && !dismissed.has(key)) setDismissed(new Set(dismissed).add(key));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    const form = event.currentTarget;
    const data = new FormData(form);
    const result = contactSchema.safeParse({
      name: data.get("name"),
      email: data.get("email"),
      subject: data.get("subject"),
      message: data.get("message"),
    });
    setDismissed(new Set());
    if (result.success) {
      setLocalErrors(null);
      if (elapsedInputRef.current) {
        const mountedAt = mountedAtRef.current ?? performance.now();
        elapsedInputRef.current.value = String(Math.round(performance.now() - mountedAt));
      }
      return;
    }
    event.preventDefault();
    const fieldErrors: NonNullable<ContactFormState["fieldErrors"]> = {};
    for (const issue of result.error.issues) {
      const key = issue.path[0] as keyof ContactInput | undefined;
      if (key && !fieldErrors[key]) fieldErrors[key] = issue.message;
    }
    setLocalErrors(fieldErrors);
    const first = FIELD_ORDER.find((k) => fieldErrors[k]);
    if (first) {
      (form.elements.namedItem(first) as HTMLElement | null)?.focus();
    }
  }

  function describedBy(key: keyof ContactInput) {
    return errors[key] ? `contact-${key}-error` : undefined;
  }

  // Server banners (rate limit, unavailable, ...) stay until the next submit. The generic
  // "fix the highlighted fields" banner only shows while a field error is still visible.
  const serverMessage = state.status === "error" ? state.message : undefined;
  const serverIsFieldBanner = Boolean(state.fieldErrors);
  let bannerMessage: string | undefined;
  if (localErrors) {
    bannerMessage = hasVisibleErrors ? "Please fix the highlighted fields." : undefined;
  } else if (serverMessage) {
    bannerMessage = serverIsFieldBanner && !hasVisibleErrors ? undefined : serverMessage;
  }
  const showBanner = Boolean(bannerMessage);

  return (
    <form action={formAction} onSubmit={handleSubmit} noValidate className="mt-5 space-y-5">
      <div>
        <label htmlFor="contact-name" className={labelClass}>
          Name
        </label>
        <input
          id="contact-name"
          name="name"
          type="text"
          required
          minLength={2}
          maxLength={100}
          autoComplete="name"
          onChange={() => dismiss("name")}
          defaultValue={values.name ?? ""}
          aria-invalid={errors.name ? true : undefined}
          aria-describedby={describedBy("name")}
          className={inputClass}
        />
        {errors.name && (
          <p id="contact-name-error" className={errorClass}>
            {errors.name}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="contact-email" className={labelClass}>
          Email
        </label>
        <input
          id="contact-email"
          name="email"
          type="email"
          required
          maxLength={254}
          autoComplete="email"
          onChange={() => dismiss("email")}
          defaultValue={values.email ?? ""}
          aria-invalid={errors.email ? true : undefined}
          aria-describedby={describedBy("email")}
          className={inputClass}
        />
        {errors.email && (
          <p id="contact-email-error" className={errorClass}>
            {errors.email}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="contact-subject" className={labelClass}>
          Subject
        </label>
        <input
          id="contact-subject"
          name="subject"
          type="text"
          required
          minLength={3}
          maxLength={150}
          onChange={() => dismiss("subject")}
          defaultValue={values.subject ?? ""}
          aria-invalid={errors.subject ? true : undefined}
          aria-describedby={describedBy("subject")}
          className={inputClass}
        />
        {errors.subject && (
          <p id="contact-subject-error" className={errorClass}>
            {errors.subject}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="contact-message" className={labelClass}>
          Message
        </label>
        <textarea
          id="contact-message"
          name="message"
          rows={6}
          required
          minLength={10}
          maxLength={MESSAGE_MAX}
          defaultValue={values.message ?? ""}
          onChange={(e) => {
            setMessageLength([...e.target.value].length);
            dismiss("message");
          }}
          aria-invalid={errors.message ? true : undefined}
          aria-describedby={
            [describedBy("message"), "contact-message-count"].filter(Boolean).join(" ")
          }
          className={textareaClass}
        />
        <div className="mt-1.5 flex items-start justify-between gap-4">
          <div>
            {errors.message && (
              <p id="contact-message-error" className="text-sm text-error">
                {errors.message}
              </p>
            )}
          </div>
          <p id="contact-message-count" className="shrink-0 text-sm text-muted">
            {messageLength} / {MESSAGE_MAX}
          </p>
        </div>
      </div>

      {/* Honeypot: hidden from people and assistive tech; bots tend to fill it. */}
      <div className="absolute -left-[9999px]" aria-hidden="true">
        <label htmlFor="contact-company-website">Leave this field empty</label>
        <input
          id="contact-company-website"
          name="company_website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>
      {/* No defaultValue: React would reset it to "" on every re-render. The value is set imperatively in handleSubmit. */}
      <input ref={elapsedInputRef} type="hidden" name="form_elapsed_ms" />

      {showBanner && (
        <div
          role="alert"
          className="flex items-start gap-3 rounded-button border border-error/30 bg-red-50 p-3.5 text-sm text-error"
        >
          <AlertCircle size={18} className="mt-0.5 shrink-0" aria-hidden="true" />
          <p>{bannerMessage}</p>
        </div>
      )}

      <div>
        <button
          type="submit"
          disabled={isPending}
          aria-busy={isPending}
          className="inline-flex h-12 items-center justify-center gap-2 rounded-button bg-signal px-5 font-semibold text-white transition-colors hover:bg-signal-hover disabled:cursor-not-allowed disabled:opacity-70"
        >
          {isPending ? (
            <>
              <Loader2 size={18} className="motion-safe:animate-spin" aria-hidden="true" />
              Sending…
            </>
          ) : (
            "Send message"
          )}
        </button>
        <p className="mt-3 text-sm text-muted">
          Your details are only used to reply to your inquiry.
        </p>
      </div>
    </form>
  );
}
