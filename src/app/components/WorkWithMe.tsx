import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { motion as Motion } from "motion/react";
import { toast } from "sonner";
import { Input } from "@/app/components/ui/input";
import { Textarea } from "@/app/components/ui/textarea";
import { Button } from "@/app/components/ui/button";
import { Label } from "@/app/components/ui/label";

interface WorkWithMeFormData {
  name: string;
  email: string;
  organization: string;
  problem: string;
  engagement: string;
}

// Security constants
const MAX_LENGTHS = {
  name: 100,
  email: 254, // RFC 5321 limit
  organization: 200,
  problem: 5000,
  engagement: 2000,
} as const;

// Rate limiting: prevent submissions more than once per 5 seconds
const SUBMISSION_COOLDOWN_MS = 5000;

// Basic email validation regex (RFC 5322 compliant subset)
const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

/**
 * Sanitizes single-line input by trimming whitespace and removing control characters
 * that could be used for injection attacks. Normalizes whitespace to single spaces.
 */
function sanitizeInput(value: string): string {
  return value
    .trim()
    // Remove all control characters (0x00-0x1F and 0x7F) including newlines
    // eslint-disable-next-line no-control-regex
    .replace(/[\u0000-\u001F\u007F]/g, "")
    .replace(/\s+/g, " "); // Normalize whitespace
}

/**
 * Sanitizes multi-line textarea input by trimming whitespace and removing dangerous
 * control characters while preserving newlines for formatting.
 */
function sanitizeTextarea(value: string): string {
  return value
    .trim()
    // Remove dangerous control characters but preserve newlines (\n, \r)
    // Remove: null, bell, backspace, tab, vertical tab, form feed, and other control chars
    // Preserve: newline (\n = \u000A), carriage return (\r = \u000D)
    // eslint-disable-next-line no-control-regex
    .replace(/[\u0000-\u0008\u000B-\u000C\u000E-\u001F\u007F]/g, "")
    // Normalize multiple spaces/tabs to single space, but preserve newlines
    .replace(/[ \t]+/g, " ")
    // Normalize CRLF and standalone CR to LF for consistency
    .replace(/\r\n/g, "\n")
    .replace(/\r/g, "\n");
}

// Shared styling for form fields to ensure consistency
const fieldBaseStyles =
  "!bg-[#131A23] !border-white/20 hover:!border-white/25 focus:!border-[#0066cc] focus:!ring-2 focus:!ring-[#0066cc]/20 text-white text-base placeholder:text-gray-600 transition-all duration-300";

export function WorkWithMe() {
  const lastSubmissionTime = useRef<number>(0);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<WorkWithMeFormData>({
    mode: "onBlur", // Validate on blur for better UX
  });

  const onSubmit = async (data: WorkWithMeFormData) => {
    // Rate limiting check
    const now = Date.now();
    const timeSinceLastSubmission = now - lastSubmissionTime.current;
    if (timeSinceLastSubmission < SUBMISSION_COOLDOWN_MS) {
      const remainingSeconds = Math.ceil(
        (SUBMISSION_COOLDOWN_MS - timeSinceLastSubmission) / 1000
      );
      toast.error(
        `Please wait ${remainingSeconds} second${remainingSeconds > 1 ? "s" : ""} before submitting again.`
      );
      return;
    }

    try {
      setSubmitError(null);

      // Sanitize all inputs
      const sanitizedData: WorkWithMeFormData = {
        name: sanitizeInput(data.name),
        email: sanitizeInput(data.email).toLowerCase(),
        organization: data.organization ? sanitizeInput(data.organization) : "",
        problem: sanitizeTextarea(data.problem),
        engagement: data.engagement ? sanitizeTextarea(data.engagement) : "",
      };

      // Additional validation after sanitization
      if (sanitizedData.name.length === 0) {
        toast.error("Name cannot be empty.");
        return;
      }
      if (sanitizedData.email.length === 0) {
        toast.error("Email cannot be empty.");
        return;
      }
      if (sanitizedData.problem.length === 0) {
        toast.error("Problem description cannot be empty.");
        return;
      }

      // In production, this would send to a backend API
      // For now, simulate submission with error handling
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Update last submission time on success
      lastSubmissionTime.current = now;

      toast.success("Message sent! I'll get back to you soon.");
      reset();
    } catch (error) {
      // Generic error message that doesn't leak implementation details
      setSubmitError("Failed to send message. Please try again later.");
      toast.error("Failed to send message. Please try again later.");
      
      // Only log errors in development
      if (import.meta.env.DEV) {
        console.error("Form submission error:", error);
      }
    }
  };

  return (
    <section
      id="work-with-me"
      className="border-t border-white/5 bg-[#0B0E14] py-16 md:py-20"
    >
      <div className="mx-auto w-full max-w-6xl px-6 lg:px-8">
        <div className="max-w-5xl mx-auto md:mx-0">
          <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-2">
            {/* Left Column: Intro & Context */}
            <Motion.div
              initial={{ opacity: 0.95, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35 }}
            >
              <h2 className="text-3xl font-bold text-white mb-6 tracking-tight">
                Work With Me
              </h2>

              <div className="max-w-xl space-y-5 text-base leading-relaxed text-gray-300/85 md:text-lg">
                <p>
                  I work in messy, ambiguous systems where clarity, structure, and ownership are missing. I help teams define what "good" looks like, stabilize what is fragile, and build the models, workflows, or prototypes needed to move forward with confidence.
                </p>
                <p>
                  If this sounds like the work you are trying to move forward, feel free to reach out.
                </p>
              </div>
            </Motion.div>

            {/* Right Column: Fit Panel & Form */}
            <Motion.div
              initial={{ opacity: 0.95, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: 0.08 }}
            >
              {/* Contact Form */}
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="w-full space-y-6"
              >
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label
                      htmlFor="name"
                      className="text-gray-400 font-normal text-base"
                    >
                      Your Name *
                    </Label>
                    <Input
                      id="name"
                      {...register("name", {
                        required: "Name is required",
                        maxLength: {
                          value: MAX_LENGTHS.name,
                          message: `Name must be less than ${MAX_LENGTHS.name} characters`,
                        },
                        validate: (value) => {
                          const sanitized = sanitizeInput(value);
                          if (sanitized.length === 0) {
                            return "Name cannot be empty";
                          }
                          return true;
                        },
                      })}
                      maxLength={MAX_LENGTHS.name}
                      className={`h-12 ${fieldBaseStyles}`}
                    />
                    {errors.name && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.name.message}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label
                      htmlFor="email"
                      className="text-gray-400 font-normal text-base"
                    >
                      Your Email *
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      {...register("email", {
                        required: "Email is required",
                        maxLength: {
                          value: MAX_LENGTHS.email,
                          message: `Email must be less than ${MAX_LENGTHS.email} characters`,
                        },
                        pattern: {
                          value: EMAIL_REGEX,
                          message: "Invalid email address",
                        },
                        validate: (value) => {
                          const sanitized = sanitizeInput(value).toLowerCase();
                          if (sanitized.length === 0) {
                            return "Email cannot be empty";
                          }
                          if (!EMAIL_REGEX.test(sanitized)) {
                            return "Invalid email address";
                          }
                          return true;
                        },
                      })}
                      maxLength={MAX_LENGTHS.email}
                      className={`h-12 ${fieldBaseStyles}`}
                    />
                    {errors.email && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.email.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="organization"
                    className="text-gray-400 font-normal text-base"
                  >
                    Organization / Company
                  </Label>
                  <Input
                    id="organization"
                    {...register("organization", {
                      maxLength: {
                        value: MAX_LENGTHS.organization,
                        message: `Organization must be less than ${MAX_LENGTHS.organization} characters`,
                      },
                    })}
                    maxLength={MAX_LENGTHS.organization}
                    className={`h-12 ${fieldBaseStyles}`}
                  />
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="problem"
                    className="text-gray-400 font-normal text-base"
                  >
                    Tell me about the problem or opportunity *
                  </Label>
                  <Textarea
                    id="problem"
                    {...register("problem", {
                      required:
                        "Please describe the problem or opportunity",
                      maxLength: {
                        value: MAX_LENGTHS.problem,
                        message: `Description must be less than ${MAX_LENGTHS.problem} characters`,
                      },
                      validate: (value) => {
                        const sanitized = sanitizeTextarea(value);
                        if (sanitized.length === 0) {
                          return "Please describe the problem or opportunity";
                        }
                        return true;
                      },
                    })}
                    maxLength={MAX_LENGTHS.problem}
                    className={`min-h-[150px] resize-y ${fieldBaseStyles}`}
                    placeholder="What are you trying to solve?"
                  />
                  {errors.problem && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.problem.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="engagement"
                    className="text-gray-400 font-normal text-base"
                  >
                    What kind of engagement are you considering?
                  </Label>
                  <Textarea
                    id="engagement"
                    {...register("engagement", {
                      maxLength: {
                        value: MAX_LENGTHS.engagement,
                        message: `Engagement details must be less than ${MAX_LENGTHS.engagement} characters`,
                      },
                    })}
                    maxLength={MAX_LENGTHS.engagement}
                    className={`min-h-[100px] resize-y ${fieldBaseStyles}`}
                    placeholder="If helpful: timeline, scope, or how you’re thinking about working together."
                  />
                </div>

                {submitError && (
                  <div className="rounded-md bg-red-500/10 border border-red-500/20 p-3">
                    <p className="text-red-400 text-sm">{submitError}</p>
                  </div>
                )}

                <div className="flex justify-start pt-4">
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex h-11 items-center rounded-md border border-[#0066cc]/40 bg-[#005bb5] px-6 text-sm font-medium text-white transition-colors duration-200 hover:bg-[#004a94] disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting
                      ? "Sending..."
                      : "Get in touch"}
                  </Button>
                </div>
              </form>
            </Motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

