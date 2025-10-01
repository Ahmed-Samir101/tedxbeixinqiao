"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  sendSpeakerApplicationEmail,
  sendSpeakerNominationEmail,
} from "@/lib/email/resend-service";
import {
  createSpeakerApplication,
  createSpeakerNomination,
} from "@/lib/speakers-db-service";

// Lint constants
const MAX_FILE_SIZE_MB = 2;
const BYTES_PER_KILOBYTE = 1024;
const KILOBYTES_PER_MEGABYTE = 1024;
const MAX_FILE_SIZE_BYTES =
  MAX_FILE_SIZE_MB * KILOBYTES_PER_MEGABYTE * BYTES_PER_KILOBYTE;
const IDEA_WORD_LIMIT = 50;
const LONG_WORD_LIMIT = 150;
const SHORT_WORD_LIMIT = 30;
const SHORT_MIN_LENGTH = 2;
const MEDIUM_MIN_LENGTH = 5;
const PHONE_MIN_LENGTH = 5;
const WECHAT_MIN_LENGTH = 2;
const WORD_SPLIT_REGEX = /\s+/;

// Speaker Application schema with validation
const speakerApplicationSchema = z.object({
  fullName: z
    .string()
    .min(SHORT_MIN_LENGTH, {
      message: `Name must be at least ${SHORT_MIN_LENGTH} characters.`,
    })
    .max(SHORT_WORD_LIMIT, {
      message: `Name cannot exceed ${SHORT_WORD_LIMIT} words.`,
    }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  mobilePhone: z
    .string()
    .min(PHONE_MIN_LENGTH, { message: "Please provide a valid phone number." })
    .max(SHORT_WORD_LIMIT, {
      message: `Phone number cannot exceed ${SHORT_WORD_LIMIT} characters.`,
    }),
  wechatId: z
    .string()
    .min(WECHAT_MIN_LENGTH, { message: "Please provide your WeChat ID." })
    .max(SHORT_WORD_LIMIT, {
      message: `WeChat ID cannot exceed ${SHORT_WORD_LIMIT} characters.`,
    }),
  priorTedTalk: z
    .string()
    .min(SHORT_MIN_LENGTH, {
      message: `Please answer if you've given a TED talk before.`,
    })
    .max(SHORT_WORD_LIMIT, {
      message: `Response cannot exceed ${SHORT_WORD_LIMIT} words.`,
    }),
  job: z
    .string()
    .min(SHORT_MIN_LENGTH, { message: "Please provide your job information." })
    .max(SHORT_WORD_LIMIT, {
      message: `Job information cannot exceed ${SHORT_WORD_LIMIT} words.`,
    }),
  remarks: z
    .string()
    .max(SHORT_WORD_LIMIT, {
      message: `Remarks cannot exceed ${SHORT_WORD_LIMIT} words.`,
    })
    .optional(),
  ideaPresentation: z
    .string()
    .min(10, { message: "Please describe your idea in at least 10 words." })
    .refine(
      (value) => {
        const wordCount = value.trim().split(WORD_SPLIT_REGEX).length;
        return wordCount <= IDEA_WORD_LIMIT;
      },
      { message: `Description cannot exceed ${IDEA_WORD_LIMIT} words.` }
    ),
  commonBelief: z
    .string()
    .min(MEDIUM_MIN_LENGTH, { message: "Please describe the common belief." })
    .refine(
      (value) => {
        const wordCount = value
          .trim()
          .split(WORD_SPLIT_REGEX)
          .filter(Boolean).length;
        return wordCount <= LONG_WORD_LIMIT;
      },
      { message: `Response cannot exceed ${LONG_WORD_LIMIT} words.` }
    ),
  coreIdea: z
    .string()
    .min(MEDIUM_MIN_LENGTH, { message: "Please describe your core idea." })
    .refine(
      (value) => {
        const wordCount = value
          .trim()
          .split(WORD_SPLIT_REGEX)
          .filter(Boolean).length;
        return wordCount <= LONG_WORD_LIMIT;
      },
      { message: `Response cannot exceed ${LONG_WORD_LIMIT} words.` }
    ),
  personalInsight: z
    .string()
    .min(MEDIUM_MIN_LENGTH, {
      message: "Please share your personal insight or example.",
    })
    .refine(
      (value) => {
        const wordCount = value
          .trim()
          .split(WORD_SPLIT_REGEX)
          .filter(Boolean).length;
        return wordCount <= LONG_WORD_LIMIT;
      },
      { message: `Response cannot exceed ${LONG_WORD_LIMIT} words.` }
    ),
  potentialImpact: z
    .string()
    .min(MEDIUM_MIN_LENGTH, {
      message: "Please describe the potential impact.",
    })
    .refine(
      (value) => {
        const wordCount = value
          .trim()
          .split(WORD_SPLIT_REGEX)
          .filter(Boolean).length;
        return wordCount <= LONG_WORD_LIMIT;
      },
      { message: `Response cannot exceed ${LONG_WORD_LIMIT} words.` }
    ),
  rehearsalAvailability: z
    .string()
    .min(SHORT_MIN_LENGTH, {
      message: "Please provide your rehearsal availability.",
    })
    .max(IDEA_WORD_LIMIT, {
      message: `Response cannot exceed ${IDEA_WORD_LIMIT} words.`,
    }),
  // Note: File upload would be handled separately in a real implementation
  websiteUrl: z
    .string()
    .url({ message: "Please enter a valid URL." })
    .optional()
    .or(z.string().length(0)),
});

type SpeakerApplicationValues = z.infer<typeof speakerApplicationSchema>;

// Nominate Speaker schema with validation
const nominateSpeakerSchema = z.object({
  fullName: z
    .string()
    .min(SHORT_MIN_LENGTH, {
      message: `Name must be at least ${SHORT_MIN_LENGTH} characters.`,
    })
    .max(SHORT_WORD_LIMIT, {
      message: `Name cannot exceed ${SHORT_WORD_LIMIT} words.`,
    }),
  contact: z
    .string()
    .min(PHONE_MIN_LENGTH, { message: "Please provide contact information." })
    .max(SHORT_WORD_LIMIT, {
      message: `Contact information cannot exceed ${SHORT_WORD_LIMIT} words.`,
    }),
  priorTedTalk: z
    .string()
    .min(SHORT_MIN_LENGTH, {
      message: `Please answer if they've given a TED talk before.`,
    })
    .max(SHORT_WORD_LIMIT, {
      message: `Response cannot exceed ${SHORT_WORD_LIMIT} words.`,
    }),
  remarks: z
    .string()
    .min(SHORT_MIN_LENGTH, { message: "Please provide some remarks." })
    .max(SHORT_WORD_LIMIT, {
      message: `Remarks cannot exceed ${SHORT_WORD_LIMIT} words.`,
    }),
  websiteUrl: z
    .string()
    .url({ message: "Please enter a valid URL." })
    .optional()
    .or(z.string().length(0)),
});

type NominateSpeakerValues = z.infer<typeof nominateSpeakerSchema>;

type SpeakerFormProps = {
  formType: "application" | "nomination";
};

export function SpeakerApplicationForm({ formType }: SpeakerFormProps) {
  const [fileSelected, setFileSelected] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [agreed, setAgreed] = useState(false);

  // Speaker Application Form
  const applicationForm = useForm<SpeakerApplicationValues>({
    resolver: zodResolver(speakerApplicationSchema),
    defaultValues: {
      fullName: "",
      email: "",
      mobilePhone: "",
      wechatId: "",
      priorTedTalk: "",
      job: "",
      remarks: "",
      ideaPresentation: "",
      commonBelief: "",
      coreIdea: "",
      personalInsight: "",
      potentialImpact: "",
      rehearsalAvailability: "",
      websiteUrl: "",
    },
  });

  // Nominate Speaker Form
  const nominationForm = useForm<NominateSpeakerValues>({
    resolver: zodResolver(nominateSpeakerSchema),
    defaultValues: {
      fullName: "",
      contact: "",
      priorTedTalk: "",
      remarks: "",
      websiteUrl: "",
    },
  });

  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0] || null;

    // Check file size if a file is selected (2MB limit)
    if (file && file.size > MAX_FILE_SIZE_BYTES) {
      toast.error("File too large", {
        description: "The PDF file must be smaller than 2MB",
      });
      event.target.value = ""; // Reset the input
      setFileSelected(null);
      return;
    }

    setFileSelected(file);
  }

  async function onSubmitApplication(values: SpeakerApplicationValues) {
    try {
      setIsSubmitting(true);

      // Create form data to include the file
      const formData = new FormData();

      // Add all form values
      for (const [key, value] of Object.entries(values)) {
        formData.append(key, value as string);
      }

      // Add the file if selected
      if (fileSelected) {
        formData.append("pdfAttachment", fileSelected);
      }

      // Send email notification with form data
      const emailResult = await sendSpeakerApplicationEmail(
        values,
        fileSelected
      );

      if (!emailResult.success) {
        throw new Error("Failed to send application email");
      }

      await createSpeakerApplication(values);

      // Show success toast using Sonner
      toast.success("Application Submitted", {
        description:
          "Thank you for your speaker application. We'll review it and get back to you soon.",
      });

      // Reset the form
      applicationForm.reset();
      setFileSelected(null);
    } catch {
      toast.error("Submission Error", {
        description:
          "There was an error submitting your application. Please try again later.",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  async function onSubmitNomination(values: NominateSpeakerValues) {
    try {
      setIsSubmitting(true);

      // Send email notification with form data
      const emailResult = await sendSpeakerNominationEmail(values);

      if (!emailResult.success) {
        throw new Error("Failed to send nomination email");
      }

      // Save to database
      await createSpeakerNomination(values);

      // Show success toast using Sonner
      toast.success("Nomination Submitted", {
        description:
          "Thank you for your speaker nomination. We'll review it and consider reaching out to them.",
      });

      // Reset the form
      nominationForm.reset();
    } catch {
      toast.error("Submission Error", {
        description:
          "There was an error submitting your nomination. Please try again later.",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  // Speaker Application Form
  if (formType === "application") {
    return (
      <Form {...applicationForm}>
        <form
          className="space-y-6"
          onSubmit={applicationForm.handleSubmit(onSubmitApplication)}
        >
          <div className="space-y-4">
            <h3 className="border-b pb-2 font-semibold text-lg">
              Personal Information
            </h3>

            <FormField
              control={applicationForm.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Full Name <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Your full name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={applicationForm.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Email <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Your email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={applicationForm.control}
              name="rehearsalAvailability"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Will you be available in Beijing for rehearsals any time in
                    September through November? If not, when?{" "}
                    <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="(for example, Yes - available September through November, or No - only available in December)"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={applicationForm.control}
              name="mobilePhone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Mobile Phone <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Your mobile phone number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={applicationForm.control}
              name="wechatId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    WeChat ID <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Your WeChat ID" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={applicationForm.control}
              name="priorTedTalk"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Given TED or TEDx talk before?{" "}
                    <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="(for example, Yes - TEDxShanghai 2023)"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={applicationForm.control}
              name="job"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Job <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Your current job/position" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={applicationForm.control}
              name="remarks"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Remarks (Optional)</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Any additional information"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="space-y-4">
            <h3 className="border-b pb-2 font-semibold text-lg">Your Idea</h3>

            <FormField
              control={applicationForm.control}
              name="ideaPresentation"
              render={({ field }) => {
                // Calculate word count
                const wordCount = field.value
                  .trim()
                  .split(WORD_SPLIT_REGEX)
                  .filter(Boolean).length;
                const isOverLimit = wordCount > IDEA_WORD_LIMIT;

                return (
                  <FormItem>
                    <FormLabel>
                      In 50 words, what is the idea you would like to present on
                      stage, and why should we want you to do that on ours?{" "}
                      <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        className={`min-h-[100px] ${isOverLimit ? "border-red-500" : ""}`}
                        placeholder="Describe your idea and why it matters..."
                        {...field}
                      />
                    </FormControl>
                    <div className="flex justify-end">
                      <p
                        className={`text-xs ${isOverLimit ? "font-medium text-red-500" : "text-muted-foreground"}`}
                      >
                        {wordCount}/50 words
                      </p>
                    </div>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />

            <FormField
              control={applicationForm.control}
              name="commonBelief"
              render={({ field }) => {
                // Calculate word count
                const wordCount = field.value
                  .trim()
                  .split(WORD_SPLIT_REGEX)
                  .filter(Boolean).length;
                const isOverLimit = wordCount > LONG_WORD_LIMIT;

                return (
                  <FormItem>
                    <FormLabel>
                      1. Regarding your talk, what is the common belief/behavior
                      that your talk will challenge, (Most People Think){" "}
                      <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        className={`min-h-[100px] ${isOverLimit ? "border-red-500" : ""}`}
                        placeholder="Most people think..."
                        {...field}
                      />
                    </FormControl>
                    <div className="flex justify-end">
                      <p
                        className={`text-xs ${isOverLimit ? "font-medium text-red-500" : "text-muted-foreground"}`}
                      >
                        {wordCount}/150 words
                      </p>
                    </div>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />

            <FormField
              control={applicationForm.control}
              name="coreIdea"
              render={({ field }) => {
                // Calculate word count
                const wordCount = field.value
                  .trim()
                  .split(WORD_SPLIT_REGEX)
                  .filter(Boolean).length;
                const isOverLimit = wordCount > LONG_WORD_LIMIT;

                return (
                  <FormItem>
                    <FormLabel>
                      2. But I believe [your core idea]{" "}
                      <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        className={`min-h-[100px] ${isOverLimit ? "border-red-500" : ""}`}
                        placeholder="But I believe..."
                        {...field}
                      />
                    </FormControl>
                    <div className="flex justify-end">
                      <p
                        className={`text-xs ${isOverLimit ? "font-medium text-red-500" : "text-muted-foreground"}`}
                      >
                        {wordCount}/150 words
                      </p>
                    </div>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />

            <FormField
              control={applicationForm.control}
              name="personalInsight"
              render={({ field }) => {
                // Calculate word count
                const wordCount = field.value
                  .trim()
                  .split(WORD_SPLIT_REGEX)
                  .filter(Boolean).length;
                const isOverLimit = wordCount > LONG_WORD_LIMIT;

                return (
                  <FormItem>
                    <FormLabel>
                      3. I've learned this through [brief example or personal
                      insight] <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        className={`min-h-[100px] ${isOverLimit ? "border-red-500" : ""}`}
                        placeholder="I've learned this through..."
                        {...field}
                      />
                    </FormControl>
                    <div className="flex justify-end">
                      <p
                        className={`text-xs ${isOverLimit ? "font-medium text-red-500" : "text-muted-foreground"}`}
                      >
                        {wordCount}/150 words
                      </p>
                    </div>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />

            <FormField
              control={applicationForm.control}
              name="potentialImpact"
              render={({ field }) => {
                // Calculate word count
                const wordCount = field.value
                  .trim()
                  .split(WORD_SPLIT_REGEX)
                  .filter(Boolean).length;
                const isOverLimit = wordCount > LONG_WORD_LIMIT;

                return (
                  <FormItem>
                    <FormLabel>
                      4. I believe if more people embraced this idea, it would
                      [benefit / impact / change]{" "}
                      <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        className={`min-h-[100px] ${isOverLimit ? "border-red-500" : ""}`}
                        placeholder="I believe if more people embraced this idea, it would..."
                        {...field}
                      />
                    </FormControl>
                    <div className="flex justify-end">
                      <p
                        className={`text-xs ${isOverLimit ? "font-medium text-red-500" : "text-muted-foreground"}`}
                      >
                        {wordCount}/150 words
                      </p>
                    </div>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />

            <div className="space-y-2">
              <Label htmlFor="file-upload">
                Optional PDF Upload (CV, portfolio, etc.)
              </Label>
              <Input
                accept=".pdf"
                className="cursor-pointer"
                id="file-upload"
                onChange={handleFileChange}
                type="file"
              />
              <p className="text-muted-foreground text-sm">
                {fileSelected
                  ? `Selected: ${fileSelected.name}`
                  : "No file selected"}
              </p>
            </div>

            <FormField
              control={applicationForm.control}
              name="websiteUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Optional URL (personal website, video of speech, etc.)
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="(for example, https://yourwebsite.com or https://youtube.com/yourvideo)"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="flex items-center justify-between gap-2">
            <label className="flex cursor-pointer select-none items-center gap-2">
              <input
                aria-required="true"
                checked={agreed}
                className="h-4 w-4 accent-green-600"
                onChange={(e) => setAgreed(e.target.checked)}
                type="checkbox"
              />
              <span className="text-gray-500 text-sm">
                I understand the selection committee will invite some candidates
                for audition. Others may not hear back.
              </span>
            </label>
            <Button
              className="whitespace-nowrap bg-red-600 hover:bg-red-700"
              disabled={isSubmitting || !agreed}
              type="submit"
            >
              {isSubmitting ? "Submitting..." : "Submit Application"}
            </Button>
          </div>
        </form>
      </Form>
    );
  }

  // Nominate Speaker Form
  return (
    <Form {...nominationForm}>
      <form
        className="space-y-6"
        onSubmit={nominationForm.handleSubmit(onSubmitNomination)}
      >
        <div className="space-y-4">
          <h3 className="border-b pb-2 font-semibold text-lg">
            Nominee Information
          </h3>

          <FormField
            control={nominationForm.control}
            name="fullName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Full Name <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input placeholder="Nominee's full name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={nominationForm.control}
            name="contact"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Contact (phone, email) <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="(for example, +86 123 456 7890 or name@email.com)"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={nominationForm.control}
            name="priorTedTalk"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Given TED or TEDx talk before?{" "}
                  <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="(for example, No, or Yes at TEDxBeijing 2022)"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={nominationForm.control}
            name="remarks"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Remarks <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="(for example, Expert in AI ethics with unique perspectives)"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={nominationForm.control}
            name="websiteUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  URL (personal website, video of speech, etc.){" "}
                  <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="(for example, https://linkedin.com/in/nominee or video URL)"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex items-center justify-between gap-2">
          <label className="flex cursor-pointer select-none items-center gap-2">
            <input
              aria-required="true"
              checked={agreed}
              className="h-4 w-4 accent-green-600"
              onChange={(e) => setAgreed(e.target.checked)}
              type="checkbox"
            />
            <span className="text-gray-500 text-sm">
              I understand the selection committee will invite some candidates
              for audition. Others may not hear back.
            </span>
          </label>
          <Button
            className="whitespace-nowrap bg-red-600 hover:bg-red-700"
            disabled={isSubmitting || !agreed}
            type="submit"
          >
            {isSubmitting ? "Submitting..." : "Submit Nomination"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
