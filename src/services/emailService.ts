/**
 * EmailJS Service — Contact Form Email Integration
 * Sends notification to portfolio owner and confirmation to visitor.
 *
 * Environment variables (prefix: VITE_):
 *   VITE_EMAILJS_SERVICE_ID
 *   VITE_EMAILJS_PUBLIC_KEY
 *   VITE_EMAILJS_NOTIFICATION_TEMPLATE_ID
 *   VITE_EMAILJS_CONFIRMATION_TEMPLATE_ID
 */

import emailjs from '@emailjs/browser';

// ---------------------------------------------------------------------------
// Config — all values come from Vite environment variables, never hardcoded.
// ---------------------------------------------------------------------------
const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID as string | undefined;
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY as string | undefined;
const NOTIFICATION_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_NOTIFICATION_TEMPLATE_ID as string | undefined;
const CONFIRMATION_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_CONFIRMATION_TEMPLATE_ID as string | undefined;

/**
 * Returns true only when all four environment variables are present and
 * non-empty. Allows the build to succeed before the user has wired up
 * their EmailJS credentials.
 */
export function isEmailJSConfigured(): boolean {
  return Boolean(
    SERVICE_ID?.trim() &&
    PUBLIC_KEY?.trim() &&
    NOTIFICATION_TEMPLATE_ID?.trim() &&
    CONFIRMATION_TEMPLATE_ID?.trim()
  );
}

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------
export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface EmailResult {
  notificationSent: boolean;
  confirmationSent: boolean;
  error?: string;
}

// ---------------------------------------------------------------------------
// Internal helpers
// ---------------------------------------------------------------------------

/** Trim all string fields and enforce max-length limits. */
function sanitize(data: ContactFormData): ContactFormData {
  return {
    name: data.name.trim().slice(0, 100),
    email: data.email.trim().slice(0, 254),
    subject: data.subject.trim().slice(0, 200),
    message: data.message.trim().slice(0, 5000),
  };
}

/** Basic email-format validation (RFC 5321 compliant enough for frontend). */
function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email);
}

// ---------------------------------------------------------------------------
// Validation
// ---------------------------------------------------------------------------

export interface ValidationError {
  field: 'name' | 'email' | 'subject' | 'message';
  message: string;
}

export function validateContactForm(data: ContactFormData): ValidationError[] {
  const errors: ValidationError[] = [];
  const s = sanitize(data);

  if (!s.name) errors.push({ field: 'name', message: 'Name is required.' });
  else if (s.name.length < 2) errors.push({ field: 'name', message: 'Name must be at least 2 characters.' });

  if (!s.email) errors.push({ field: 'email', message: 'Email address is required.' });
  else if (!isValidEmail(s.email)) errors.push({ field: 'email', message: 'Please enter a valid email address.' });

  if (!s.subject) errors.push({ field: 'subject', message: 'Subject is required.' });

  if (!s.message) errors.push({ field: 'message', message: 'Message is required.' });
  else if (s.message.length < 10) errors.push({ field: 'message', message: 'Message must be at least 10 characters.' });

  return errors;
}

// ---------------------------------------------------------------------------
// Email sending
// ---------------------------------------------------------------------------

/**
 * Sends a notification email to the portfolio owner and, on success,
 * a confirmation email to the visitor.
 *
 * Failure policy:
 *   - Notification fails  → throws, no confirmation sent.
 *   - Confirmation fails  → resolves with confirmationSent = false (not an error for the user).
 */
export async function sendContactEmail(data: ContactFormData): Promise<EmailResult> {
  if (!isEmailJSConfigured()) {
    // Surface a clear dev-time error; never silently succeed.
    throw new Error(
      'EmailJS is not configured. Please set VITE_EMAILJS_SERVICE_ID, ' +
      'VITE_EMAILJS_PUBLIC_KEY, VITE_EMAILJS_NOTIFICATION_TEMPLATE_ID, ' +
      'and VITE_EMAILJS_CONFIRMATION_TEMPLATE_ID in your .env.local file.'
    );
  }

  const s = sanitize(data);

  // -- Step 1: Notification to portfolio owner --
  // Template variables must match exactly what is configured in EmailJS dashboard.
  const notificationParams = {
    from_name: s.name,
    from_email: s.email,
    subject: s.subject,
    message: s.message,
    reply_to: s.email,
  };

  await emailjs.send(
    SERVICE_ID!,
    NOTIFICATION_TEMPLATE_ID!,
    notificationParams,
    { publicKey: PUBLIC_KEY! }
  );

  // -- Step 2: Confirmation to visitor --
  // If this fails we still treat the overall submission as successful.
  let confirmationSent = false;
  try {
    // Only the variables your confirmation template uses.
    const confirmationParams = {
      to_name: s.name,
      to_email: s.email,
    };

    await emailjs.send(
      SERVICE_ID!,
      CONFIRMATION_TEMPLATE_ID!,
      confirmationParams,
      { publicKey: PUBLIC_KEY! }
    );
    confirmationSent = true;
  } catch (err) {
    // Log for developers; do not propagate to the user.
    console.warn('[EmailJS] Confirmation email failed (non-critical):', err);
  }

  return { notificationSent: true, confirmationSent };
}

