"use client";

import { motion, useInView } from "framer-motion";
import { Mail, MapPin, MessageSquare } from "lucide-react";
import Image from "next/image";
import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  type FormData = {
    name: string;
    email: string;
    message: string;
  };

  type ChangeEvent = {
    target: {
      name: string;
      value: string;
    };
  };

  const handleChange = (e: ChangeEvent) => {
    const { name, value } = e.target;
    setFormData((prev: FormData) => ({ ...prev, [name]: value }));
  };

  type SubmitEvent = {
    preventDefault: () => void;
  };

  const handleSubmit = (e: SubmitEvent) => {
    e.preventDefault();
    // Reset form
    setFormData({ name: "", email: "", message: "" });
    // Show success message
    alert("Thank you for your message! We'll get back to you soon.");
  };

  return (
    <section className="w-full bg-white py-20 dark:bg-black" id="contact">
      <motion.div
        animate={isInView ? "visible" : "hidden"}
        className="container mx-auto px-4"
        initial="hidden"
        ref={ref}
        variants={containerVariants}
      >
        <div className="mx-auto max-w-6xl">
          <motion.div className="mb-12 text-center" variants={itemVariants}>
            <h2 className="mb-4 font-bold text-3xl text-black md:text-4xl dark:text-white">
              Get in{" "}
              <span className="text-red-600 dark:text-red-500">Touch</span>
            </h2>
            <p className="mx-auto max-w-3xl text-gray-700 text-lg dark:text-gray-300">
              Have questions about our upcoming events or interested in
              partnership opportunities? Reach out to our team, and we'll be
              happy to assist you.
            </p>
          </motion.div>

          <motion.div
            className="mx-auto grid gap-8 md:grid-cols-2"
            variants={itemVariants}
          >
            <div className="flex flex-col gap-6">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-500">
                  <Mail className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="mb-1 font-semibold text-black text-lg dark:text-white">
                    Email
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300">
                    Info@tedxbeixinqiao.com
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-500">
                  <MessageSquare className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="mb-1 font-semibold text-black text-lg dark:text-white">
                    WeChat
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300">
                    TedxBeixinqiao2025
                  </p>
                  <p className="mt-2 text-gray-600 text-sm dark:text-gray-400">
                    Scan the QR-Code below to follow our official WeChat Page
                  </p>
                  <div className="mt-4 h-40 w-40 overflow-hidden rounded bg-white p-2 shadow-sm dark:bg-gray-800">
                    <div className="relative h-full w-full">
                      <Image
                        alt="TEDxBeixinqiao WeChat QR Code"
                        className="h-full w-full object-contain"
                        height={144}
                        src="/qrcode.jpg"
                        width={144}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-500">
                  <MapPin className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="mb-1 font-semibold text-black text-lg dark:text-white">
                    Address
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300">
                    Beixinqiao subdistrict, Dongcheng, Beijing
                  </p>
                </div>
              </div>
            </div>

            <motion.div
              className="rounded-lg bg-gray-50 p-6 shadow-sm dark:bg-gray-900"
              variants={itemVariants}
            >
              <h3 className="mb-4 font-semibold text-black text-xl dark:text-white">
                Send us a message
              </h3>
              <form className="space-y-4" onSubmit={handleSubmit}>
                <div>
                  <Input
                    className="border-gray-300 dark:border-gray-700"
                    name="name"
                    onChange={handleChange}
                    placeholder="Your Name"
                    required
                    type="text"
                    value={formData.name}
                  />
                </div>
                <div>
                  <Input
                    className="border-gray-300 dark:border-gray-700"
                    name="email"
                    onChange={handleChange}
                    placeholder="Your Email"
                    required
                    type="email"
                    value={formData.email}
                  />
                </div>
                <div>
                  <Textarea
                    className="min-h-[120px] border-gray-300 dark:border-gray-700"
                    name="message"
                    onChange={handleChange}
                    placeholder="Your Message"
                    required
                    value={formData.message}
                  />
                </div>
                <Button
                  className="w-full bg-red-600 text-white hover:bg-red-700 dark:bg-red-600 dark:hover:bg-red-700"
                  type="submit"
                >
                  Send Message
                </Button>
              </form>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
