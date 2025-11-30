"use client";

import { AnimatePresence, motion, useInView } from "framer-motion";
import { Loader2, Send } from "lucide-react";
import { useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [activeField, setActiveField] = useState<keyof typeof formData | null>(
    null
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({
    success: false,
    message: "",
  });
  const formRef = useRef(null);
  const isInView = useInView(formRef, { once: false, amount: 0.3 });

  const handleFocus = (fieldName: keyof typeof formData) => {
    setActiveField(fieldName);
  };

  const handleBlur = () => {
    setActiveField(null);
  };

  type FormData = {
    name: string;
    email: string;
    message: string;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value as keyof FormData }));
  };

  type SubmitStatus = {
    success: boolean;
    message: string;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const json = await res.json();
      if (!res.ok || !json.ok) {
        throw new Error(json.error || "Failed to send message");
      }

      setFormData({ name: "", email: "", message: "" });
      setSubmitStatus({ success: true, message: "Your message has been sent! We'll get back to you soon." });
    } catch (error) {
      setSubmitStatus({ success: false, message: "There was an issue sending your message. Please try again later." });
    } finally {
      setIsSubmitting(false);
      // Auto-clear status after a delay
      setTimeout(() => setSubmitStatus({ success: false, message: "" }), 5000);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
        staggerChildren: 0.07,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const formLabelVariants = {
    initial: { y: 0 },
    focus: { y: -5, scale: 0.9 },
  };

  const buttonVariants = {
    idle: { scale: 1 },
    hover: { scale: 1.02 },
    tap: { scale: 0.98 },
  };

  const checkMarkVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeInOut",
      },
    },
  };

  return (
    <motion.div
      animate={isInView ? "visible" : "hidden"}
      className="overflow-hidden rounded-xl bg-white p-8 shadow-lg dark:bg-gray-900"
      initial="hidden"
      ref={formRef}
      variants={containerVariants}
    >
      <motion.div
        className="mb-6 flex flex-col space-y-2"
        variants={itemVariants}
      >
        <span className="inline-block font-semibold text-red-600 text-sm uppercase tracking-wider dark:text-red-500">
          Get in Touch
        </span>
        <h3 className="font-bold text-2xl text-gray-900 md:text-3xl dark:text-white">
          Send a Message
        </h3>
        <p className="text-gray-600 dark:text-gray-300">
          Have questions or ideas? Reach out and let's start a conversation.
        </p>
      </motion.div>

      <AnimatePresence mode="wait">
        {submitStatus.success ? (
          <motion.div
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center space-y-4 rounded-lg bg-green-50 p-6 text-center dark:bg-green-900/20"
            exit={{ opacity: 0, y: -20 }}
            initial={{ opacity: 0, scale: 0.9 }}
            key="success"
          >
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30">
              <svg
                className="h-8 w-8 text-green-600 dark:text-green-400"
                fill="none"
                viewBox="0 0 32 32"
              >
                <motion.path
                  animate="visible"
                  d="M6 16L13 23L26 10"
                  initial="hidden"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="3"
                  variants={checkMarkVariants}
                />
              </svg>
            </div>
            <h4 className="font-semibold text-gray-900 text-xl dark:text-white">
              Message Sent!
            </h4>
            <p className="text-gray-600 dark:text-gray-300">
              {submitStatus.message}
            </p>
            <motion.button
              className="mt-2 font-medium text-red-600 text-sm dark:text-red-400"
              onClick={() => setSubmitStatus({ success: false, message: "" })}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              Send another message
            </motion.button>
          </motion.div>
        ) : (
          <motion.form
            className="space-y-6"
            key="form"
            onSubmit={handleSubmit}
            variants={containerVariants}
          >
            <motion.div className="space-y-1" variants={itemVariants}>
              <motion.label
                animate={activeField === "name" ? "focus" : "initial"}
                className="font-medium text-gray-700 text-sm dark:text-gray-300"
                htmlFor="name"
                initial="initial"
                variants={formLabelVariants}
              >
                Your Name
              </motion.label>
              <div className="relative">
                <Input
                  className="border-gray-300 bg-gray-50 py-6 pr-4 pl-4 transition-all duration-300 focus:border-red-500 focus:bg-white focus:ring-2 focus:ring-red-500/20 dark:border-gray-700 dark:bg-gray-800/50 dark:focus:border-red-500"
                  id="name"
                  name="name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  onFocus={() => handleFocus("name")}
                  placeholder="John Doe"
                  required
                  type="text"
                  value={formData.name}
                />
                <motion.span
                  animate={{ width: activeField === "name" ? "100%" : "0%" }}
                  className="absolute bottom-0 left-0 h-0.5 bg-red-500"
                  initial={{ width: "0%" }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </motion.div>

            <motion.div className="space-y-1" variants={itemVariants}>
              <motion.label
                animate={activeField === "email" ? "focus" : "initial"}
                className="font-medium text-gray-700 text-sm dark:text-gray-300"
                htmlFor="email"
                initial="initial"
                variants={formLabelVariants}
              >
                Your Email
              </motion.label>
              <div className="relative">
                <Input
                  className="border-gray-300 bg-gray-50 py-6 pr-4 pl-4 transition-all duration-300 focus:border-red-500 focus:bg-white focus:ring-2 focus:ring-red-500/20 dark:border-gray-700 dark:bg-gray-800/50 dark:focus:border-red-500"
                  id="email"
                  name="email"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  onFocus={() => handleFocus("email")}
                  placeholder="john@example.com"
                  required
                  type="email"
                  value={formData.email}
                />
                <motion.span
                  animate={{ width: activeField === "email" ? "100%" : "0%" }}
                  className="absolute bottom-0 left-0 h-0.5 bg-red-500"
                  initial={{ width: "0%" }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </motion.div>

            <motion.div className="space-y-1" variants={itemVariants}>
              <motion.label
                animate={activeField === "message" ? "focus" : "initial"}
                className="font-medium text-gray-700 text-sm dark:text-gray-300"
                htmlFor="message"
                initial="initial"
                variants={formLabelVariants}
              >
                Your Message
              </motion.label>
              <div className="relative">
                <Textarea
                  className="min-h-[150px] border-gray-300 bg-gray-50 py-4 pr-4 pl-4 transition-all duration-300 focus:border-red-500 focus:bg-white focus:ring-2 focus:ring-red-500/20 dark:border-gray-700 dark:bg-gray-800/50 dark:focus:border-red-500"
                  id="message"
                  name="message"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  onFocus={() => handleFocus("message")}
                  placeholder="Share your thoughts or questions with us..."
                  required
                  value={formData.message}
                />
                <motion.span
                  animate={{ width: activeField === "message" ? "100%" : "0%" }}
                  className="absolute bottom-0 left-0 h-0.5 bg-red-500"
                  initial={{ width: "0%" }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </motion.div>

            <motion.div variants={itemVariants}>
              <motion.button
                className="group relative inline-flex h-12 w-full items-center justify-center overflow-hidden rounded-lg bg-gradient-to-r from-red-500 to-red-600 px-8 py-3 text-white shadow-md transition-all duration-300 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
                disabled={isSubmitting}
                initial="idle"
                type="submit"
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
              >
                <span className="-mt-12 group-hover:-translate-x-40 absolute right-0 h-32 w-8 translate-x-12 rotate-12 transform bg-white opacity-10 transition-all duration-1000 ease-out" />
                <span className="flex items-center space-x-2">
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <span>Send Message</span>
                      <Send className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </>
                  )}
                </span>
              </motion.button>
            </motion.div>
          </motion.form>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
