"use client";

import { AnimatePresence, motion, useInView } from "framer-motion";
import { ArrowRight, Play, Volume2, VolumeX } from "lucide-react";
import Link from "next/link";
import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const eventHighlights = [
  {
    title: "Thought-Provoking Talks",
    description:
      "Our speakers deliver engaging presentations that challenge assumptions, spark new ideas, and inspire action across various disciplines.",
    video: "https://keithcollea.me/2.mp4",
  },
  {
    title: "Interactive Experiences",
    description:
      "Between talks, attendees engage in hands-on activities, discussions, and demonstrations that bring ideas to life in creative ways.",
    video: "https://keithcollea.me/3.mp4",
  },
  {
    title: "Community Connection",
    description:
      "Our events bring together diverse attendees from various backgrounds, fostering connections that often lead to collaboration and friendship.",
    video: "https://keithcollea.me/4.mp4",
  },
];

export default function EventHighlights() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const [activeVideo, setActiveVideo] = useState<number | null>(null);
  const [muted, setMuted] = useState(true);

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
    hover: {
      y: -5,
      transition: { type: "spring", stiffness: 300, damping: 15 },
    },
  };

  const headlineVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <section className="relative w-full overflow-hidden bg-white py-24 text-gray-900 transition-colors duration-300 dark:bg-black dark:text-white">
      {/* Background elements */}
      <div className="-z-10 absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.03)_0,rgba(0,0,0,0)_100%)] dark:bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.05)_0,rgba(255,255,255,0)_100%)]" />

        <motion.div
          animate={{
            x: [0, 20, 0],
            opacity: [0.2, 0.3, 0.2],
          }}
          className="absolute top-0 left-1/4 h-64 w-64 rounded-full bg-red-600/5 blur-3xl dark:bg-red-600/10"
          transition={{
            duration: 15,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
        <motion.div
          animate={{
            y: [0, -20, 0],
            opacity: [0.15, 0.25, 0.15],
          }}
          className="absolute right-1/4 bottom-0 h-64 w-64 rounded-full bg-red-600/5 blur-3xl dark:bg-red-600/10"
          transition={{
            duration: 18,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: 2,
          }}
        />
      </div>

      <motion.div
        animate={isInView ? "visible" : "hidden"}
        className="container mx-auto px-4"
        initial="hidden"
        ref={ref}
        variants={containerVariants}
      >
        <div className="mx-auto max-w-6xl">
          <motion.div
            className="mb-16 flex flex-col items-center text-center"
            variants={headlineVariants}
          >
            <span className="mb-3 inline-block rounded-full bg-red-100 px-4 py-1.5 font-medium text-red-600 text-sm dark:bg-red-900/30 dark:text-red-400">
              Memorable Moments
            </span>
            <h2 className="mb-6 bg-gradient-to-r from-black to-gray-800 bg-clip-text font-bold text-4xl text-transparent leading-tight md:text-5xl dark:from-white dark:to-red-100">
              Event{" "}
              <span className="text-red-600 dark:text-red-500">Highlights</span>
            </h2>
            <p className="mx-auto max-w-3xl text-gray-800 text-lg dark:text-red-50">
              Immerse yourself in the TEDxBeixinqiao experience through our
              event highlights. See what makes our community gatherings so
              special.
            </p>
          </motion.div>

          <motion.div
            className="mb-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3"
            variants={containerVariants}
          >
            {/* Highlight Cards */}
            {eventHighlights.map((highlight, index) => (
              <motion.div
                animate="visible"
                className={cn(
                  "group relative overflow-hidden rounded-xl bg-white/90 backdrop-blur-sm transition-all duration-300 dark:bg-gray-900/70 dark:backdrop-blur-md",
                  "shadow-md hover:shadow-red-600/20 hover:shadow-xl dark:hover:shadow-red-600/30"
                )}
                initial="hidden"
                key={index}
                variants={itemVariants}
                whileHover="hover"
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden">
                  {/* Video Thumbnail */}
                  <div className="h-full w-full bg-gray-100 dark:bg-gray-800">
                    <video
                      className="h-full w-full object-cover"
                      muted
                      playsInline
                      poster={`${highlight.video}#t=0.1`}
                      src={highlight.video}
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <button
                        className="flex h-16 w-16 items-center justify-center rounded-full bg-white/90 text-red-600 shadow-lg transition-transform hover:scale-110 hover:bg-white"
                        onClick={() => setActiveVideo(index)}
                      >
                        <Play className="h-8 w-8 fill-red-600" />
                      </button>
                    </div>
                  </div>
                </div>
                <div className="bg-transparent p-6">
                  <h3 className="mb-2 font-semibold text-black text-xl dark:text-white">
                    {highlight.title}
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300">
                    {highlight.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div className="flex justify-center" variants={itemVariants}>
            <Button
              asChild
              className="group overflow-hidden bg-red-600 hover:bg-red-700"
              variant="default"
            >
              <Link
                className="relative flex items-center gap-2"
                href="/speakers"
              >
                <motion.span
                  className="absolute inset-0 bg-red-500/40"
                  initial={{ width: "100%", height: "100%", x: "-100%" }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  whileHover={{ x: "100%" }}
                />
                <span className="z-10">Explore All Speakers</span>
                <ArrowRight className="z-10 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </motion.div>

      {/* Modal for video playback */}
      <AnimatePresence>
        {activeVideo !== null && (
          <motion.div
            animate={{ opacity: 1 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur"
            exit={{ opacity: 0 }}
            initial={{ opacity: 0 }}
            onClick={() => setActiveVideo(null)}
          >
            <motion.div
              animate={{ scale: 1, opacity: 1 }}
              className="relative mx-4 max-w-4xl overflow-hidden rounded-xl bg-black shadow-2xl"
              exit={{ scale: 0.9, opacity: 0 }}
              initial={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
            >
              <video
                autoPlay
                className="w-full"
                controls
                muted={muted}
                playsInline
                src={eventHighlights[activeVideo].video}
              />
              <div className="absolute right-4 bottom-4 flex gap-2">
                <button
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm transition-colors hover:bg-white/30"
                  onClick={() => setMuted(!muted)}
                >
                  {muted ? (
                    <VolumeX className="h-5 w-5 text-white" />
                  ) : (
                    <Volume2 className="h-5 w-5 text-white" />
                  )}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
