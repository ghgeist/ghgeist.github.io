import React from "react";
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

// Shared styling for form fields to ensure consistency
const fieldBaseStyles =
  "!bg-[#131A23] !border-white/20 hover:!border-white/25 focus:!border-[#0066cc] focus:!ring-2 focus:!ring-[#0066cc]/20 text-white text-base placeholder:text-gray-600 transition-all duration-300";

export function WorkWithMe() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<WorkWithMeFormData>();

  const onSubmit = async (data: WorkWithMeFormData) => {
    console.log("Form submitted:", data);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    toast.success("Message sent! I'll get back to you soon.");
    reset();
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
                      })}
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
                        pattern: {
                          value:
                            /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: "Invalid email address",
                        },
                      })}
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
                    {...register("organization")}
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
                    })}
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
                    {...register("engagement")}
                    className={`min-h-[100px] resize-y ${fieldBaseStyles}`}
                    placeholder="If helpful: timeline, scope, or how you’re thinking about working together."
                  />
                </div>

                <div className="flex justify-start pt-4">
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex h-11 items-center rounded-md border border-[#0066cc]/40 bg-[#005bb5] px-6 text-sm font-medium text-white transition-colors duration-200 hover:bg-[#004a94]"
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

