"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import type { Speaker } from "@/data/speakers";

type SpeakerModalProps = {
  speaker: Speaker | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function SpeakerModal({
  speaker,
  open,
  onOpenChange,
}: SpeakerModalProps) {
  if (!speaker) {
    return null;
  }

  return (
    <Dialog onOpenChange={onOpenChange} open={open}>
      <DialogContent className="max-w-5xl overflow-hidden border-none bg-transparent p-0 shadow-none">
        <motion.div
          animate={{ opacity: 1, scale: 1 }}
          className="relative flex flex-col overflow-hidden rounded-3xl bg-white/80 backdrop-blur-lg md:min-h-[650px] md:flex-row dark:bg-gray-900/90"
          exit={{ opacity: 0, scale: 0.95 }}
          initial={{ opacity: 0, scale: 0.95 }}
          transition={{ type: "spring", damping: 20, stiffness: 300 }}
        >
          {/* Left column: cinematic image section without gradient overlay */}
          <div className="relative w-full overflow-hidden md:w-2/5 lg:w-1/2">
            {/* Main image */}
            <div className="relative h-96 w-full md:h-full">
              <Image
                alt={speaker.name}
                className="object-cover object-center"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                src={speaker.imageSrc}
              />

              {/* Category badge with elegant styling */}
              <div className="absolute top-6 left-6 z-10">
                <div className="rounded-full border border-red-500/30 bg-red-500/20 px-3 py-1 font-medium text-red-50 text-xs backdrop-blur-sm">
                  {speaker.category}
                </div>
              </div>
            </div>

            {/* Elegant name overlay positioned at the bottom of the image */}
            <div className="absolute right-0 bottom-0 left-0 bg-gradient-to-t from-black/90 p-6 pt-12">
              <div className="flex flex-col items-start space-y-1">
                <motion.h2
                  animate={{ opacity: 1, y: 0 }}
                  className="max-w-xs font-bold text-3xl text-white tracking-tight md:text-4xl"
                  initial={{ opacity: 0, y: 10 }}
                  transition={{ delay: 0.2 }}
                >
                  {speaker.name}
                </motion.h2>
                <motion.p
                  animate={{ opacity: 1, y: 0 }}
                  className="font-medium text-lg text-white/80"
                  initial={{ opacity: 0, y: 10 }}
                  transition={{ delay: 0.3 }}
                >
                  {speaker.title}
                </motion.p>
              </div>
            </div>

            {/* Decorative elements */}
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.2, 0.3, 0.2],
              }}
              className="-top-12 -right-12 absolute h-40 w-40 rounded-full bg-red-500/20 blur-3xl"
              transition={{
                repeat: Number.POSITIVE_INFINITY,
                duration: 8,
                ease: "easeInOut",
              }}
            />
            <motion.div
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.15, 0.25, 0.15],
              }}
              className="-bottom-8 absolute left-1/3 h-36 w-36 rounded-full bg-blue-500/20 blur-3xl"
              transition={{
                repeat: Number.POSITIVE_INFINITY,
                duration: 10,
                ease: "easeInOut",
                delay: 1,
              }}
            />
          </div>

          {/* Right column: content with premium scrollable area */}
          <div className="relative flex-1 p-6 md:p-8 lg:p-10">
            {/* Accessibility requirement - DialogTitle (visually hidden) */}
            <DialogTitle className="sr-only">
              {speaker.name} - {speaker.title}
            </DialogTitle>

            {/* Premium styled content area with custom scrollbar */}
            <div className="custom-scrollbar max-h-[400px] overflow-y-auto pr-6 md:max-h-[540px]">
              {/* Talk title with elegant styling */}
              <motion.div
                animate={{ opacity: 1, y: 0 }}
                className="mb-8"
                initial={{ opacity: 0, y: 10 }}
                transition={{ delay: 0.3 }}
              >
                <div className="relative rounded-xl bg-gradient-to-br from-gray-50/80 to-gray-100/50 p-6 dark:from-gray-800/50 dark:to-gray-700/30">
                  <svg
                    className="absolute top-4 left-4 h-8 w-8 text-red-300/30 dark:text-red-500/20"
                    fill="none"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M7 8h10M7 12h10M7 16h4"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                    />
                  </svg>
                  <h3 className="pl-6 font-bold text-gray-900 text-xl dark:text-white">
                    {speaker.talkTitle}
                  </h3>
                </div>
              </motion.div>

              {/* Talk summary with premium typography */}
              <motion.div
                animate={{ opacity: 1, y: 0 }}
                className="mb-8"
                initial={{ opacity: 0, y: 10 }}
                transition={{ delay: 0.4 }}
              >
                <p className="mb-4 font-semibold text-gray-900 text-lg dark:text-gray-100">
                  About {speaker.name.split(" ")[0]}
                </p>
                <div className="prose prose-lg dark:prose-invert max-w-none">
                  <p className="first-letter:float-left first-letter:mr-3 first-letter:font-bold first-letter:font-serif first-letter:text-5xl first-letter:text-red-600 dark:first-letter:text-red-500">
                    {speaker.talkSummary}
                  </p>
                </div>
              </motion.div>

              {/* Talk description section */}
              <motion.div
                animate={{ opacity: 1, y: 0 }}
                className="mb-8"
                initial={{ opacity: 0, y: 10 }}
                transition={{ delay: 0.5 }}
              >
                <p className="mb-4 font-semibold text-gray-900 text-lg dark:text-gray-100">
                  About the talk
                </p>
                <div className="prose prose-lg dark:prose-invert max-w-none">
                  <p>{speaker.description}</p>
                </div>
              </motion.div>

              {/* Video section if available */}
              {speaker.videoId && (
                <motion.div
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-8 border-gray-200/50 border-t pt-8 dark:border-gray-700/50"
                  initial={{ opacity: 0, y: 10 }}
                  transition={{ delay: 0.6 }}
                >
                  <p className="mb-4 font-semibold text-gray-900 text-lg dark:text-gray-100">
                    Watch the talk
                  </p>
                  <div className="relative aspect-video w-full overflow-hidden rounded-xl">
                    <iframe
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="absolute inset-0 h-full w-full"
                      src={`https://www.youtube.com/embed/${speaker.videoId}`}
                      title={`${speaker.name} - ${speaker.talkTitle}`}
                    />
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
}
