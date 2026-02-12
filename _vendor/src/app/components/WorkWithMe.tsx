import React from "react";
import { useForm } from "react-hook-form";
import { motion as Motion } from "motion/react";
import { toast } from "sonner";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { Label } from "./ui/label";

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
      className="py-24 bg-[#0B0E14] border-t border-white/5"
    >
      <div className="mx-auto w-full max-w-6xl px-6 lg:px-8">
        <div className="max-w-5xl mx-auto md:mx-0">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Left Column: Intro & Context */}
            <Motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-bold text-white mb-6 tracking-tight">
                Work With Me
              </h2>

              <div className="max-w-xl space-y-6 text-lg text-gray-400 font-light leading-relaxed">
                <p>
                  I work on messy, ambiguous problems where
                  clarity, structure, and ownership matter. Most
                  engagements involve stabilizing a system,
                  defining what "good" looks like, and
                  delivering the models, workflows, or
                  prototypes that make progress possible.
                </p>
                <p>
                  If this sounds like the kind of work you're
                  trying to move forward, feel free to reach
                  out.
                </p>
              </div>
            </Motion.div>

            {/* Right Column: Fit Panel & Form */}
            <Motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
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
                    className="bg-[#005bb5] hover:bg-[#004a94] text-white px-8 py-6 text-base rounded-md transition-colors duration-200 font-medium"
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