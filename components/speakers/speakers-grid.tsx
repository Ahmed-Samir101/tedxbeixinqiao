"use client";

import { motion, useInView } from "framer-motion";
import { Facebook, Instagram, Linkedin, Play, Twitter } from "lucide-react";
import Image from "next/image";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import type { Speaker } from "@/data/speakers";

interface SpeakersGridProps {
  speakers: Speaker[];
}

export default function SpeakersGrid({ speakers }: SpeakersGridProps) {
  const gridRef = useRef(null);
  const isInView = useInView(gridRef, { once: true, amount: 0.1 });

  // Removed redundant Speaker interface as it's imported from data/speakers.ts

  const renderSocialIcon = (platform: string) => {
    switch (platform) {
      case "facebook":
        return <Facebook className="h-4 w-4" />;
      case "twitter":
        return <Twitter className="h-4 w-4" />;
      case "linkedin":
        return <Linkedin className="h-4 w-4" />;
      case "instagram":
        return <Instagram className="h-4 w-4" />;
      default:
        return null;
    }
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <motion.div
      animate={isInView ? "show" : "hidden"}
      className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
      initial="hidden"
      ref={gridRef}
      variants={container}
    >
      {speakers.map((speaker, index) => (
        <motion.div className="flex flex-col" key={index} variants={item}>
          <Dialog>
            <DialogTrigger asChild>
              <Card className="group relative h-full cursor-pointer overflow-hidden rounded-xl border-0 bg-transparent p-0 shadow-none transition-all duration-500">
                {/* Decorative elements */}
                <div className="-left-20 -top-20 absolute h-40 w-40 rounded-full bg-red-600/10 blur-3xl dark:bg-red-600/20" />
                <div className="-bottom-20 -right-20 absolute h-40 w-40 rounded-full bg-red-600/10 blur-3xl dark:bg-red-600/20" />

                {/* Speaker Image */}
                <div className="relative aspect-[3/4] w-full overflow-hidden rounded-xl bg-white shadow-lg transition-all duration-500 group-hover:shadow-red-600/10 group-hover:shadow-xl dark:bg-gray-900 dark:group-hover:shadow-red-600/20">
                  <Image
                    alt={speaker.name}
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    fill
                    src={
                      speaker.imageSrc ||
                      `/placeholder.svg?height=600&width=450&text=${encodeURIComponent(speaker.name)}`
                    }
                  />

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-80 transition-opacity duration-300" />

                  {/* Speaker Info */}
                  <div className="absolute right-0 bottom-0 left-0 p-6 text-white">
                    <h3 className="mb-1 font-bold text-2xl">{speaker.name}</h3>
                    <p className="mb-2 font-medium text-gray-300 text-sm">
                      {speaker.title}
                    </p>
                    <p className="mb-4 font-medium text-base text-red-400">
                      {speaker.talkTitle}
                    </p>

                    {/* Watch Talk Button */}
                    {speaker.videoId ? (
                      <div className="flex items-center gap-2">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-600 text-white transition-transform duration-300 group-hover:scale-110">
                          <Play className="h-5 w-5" />
                        </div>
                        <span className="font-medium">Watch Talk</span>
                      </div>
                    ) : null}
                  </div>

                  {/* Social Media Icons */}
                  <div className="absolute top-4 right-4 flex gap-2">
                    {speaker.socials.map((social, idx) => (
                      <Button
                        className="h-8 w-8 rounded-full bg-white/10 backdrop-blur-md transition-transform duration-300 hover:scale-110 hover:bg-white/20"
                        key={idx}
                        size="icon"
                        variant="ghost"
                      >
                        {renderSocialIcon(social.platform)}
                      </Button>
                    ))}
                  </div>
                </div>
              </Card>
            </DialogTrigger>

            {/* Enhanced Speaker Modal with Video - Width increased */}
            <DialogContent className="max-w-[95vw] overflow-hidden border-0 bg-transparent p-0 sm:max-w-[1000px] md:max-w-[1200px]">
              <div className="overflow-hidden rounded-xl border border-gray-200 bg-white/95 shadow-2xl backdrop-blur-xl dark:border-gray-800 dark:bg-black/95">
                {/* Background decorative elements */}
                <div className="-left-20 -top-20 absolute z-0 h-60 w-60 rounded-full bg-red-600/10 blur-[80px] dark:bg-red-600/15" />
                <div className="-right-20 -bottom-20 absolute z-0 h-60 w-60 rounded-full bg-red-600/10 blur-[80px] dark:bg-red-600/15" />

                <div className="relative z-10 p-6 md:p-8">
                  <DialogHeader className="mb-6">
                    <div className="flex items-center justify-between">
                      <DialogTitle className="font-bold text-2xl text-gray-900 md:text-3xl dark:text-white">
                        {speaker.talkTitle}
                      </DialogTitle>
                    </div>
                  </DialogHeader>

                  <div className="grid gap-8 md:grid-cols-7">
                    {/* Video Section - Takes 4/7 of the width on medium+ screens */}
                    {speaker.videoId ? (
                      <div className="h-full w-full md:col-span-4">
                        <div className="aspect-video w-full overflow-hidden rounded-xl border border-gray-200 bg-black shadow-lg dark:border-gray-800">
                          {/* Fixed YouTube embed by ensuring it has proper dimensions and removed relative URL formatting */}
                          <iframe
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            className="h-full w-full"
                            frameBorder="0"
                            height="100%"
                            src={`https://www.youtube.com/embed/${speaker.videoId}`}
                            style={{ aspectRatio: "16/9" }}
                            title={`${speaker.name} - ${speaker.talkTitle}`}
                            width="100%"
                          />
                        </div>
                      </div>
                    ) : null}

                    {/* Speaker Info - Takes 3/7 of the width on medium+ screens, or full width if no video */}
                    <div className={`flex flex-col ${speaker.videoId ? 'md:col-span-3' : 'md:col-span-7'}`}>
                      <div className="mb-4 flex items-center gap-4">
                        <div className="h-16 w-16 overflow-hidden rounded-full border-2 border-red-500 shadow-lg">
                          <Image
                            alt={speaker.name}
                            className="h-full w-full object-cover"
                            height={64}
                            src={
                              speaker.imageSrc ||
                              `/placeholder.svg?height=100&width=100&text=${encodeURIComponent(speaker.name.charAt(0))}`
                            }
                            width={64}
                          />
                        </div>
                        <div>
                          <h3 className="font-bold text-gray-900 text-xl dark:text-white">
                            {speaker.name}
                          </h3>
                          <p className="text-gray-600 text-sm dark:text-gray-400">
                            {speaker.title}
                          </p>
                        </div>
                      </div>

                      <div className="mb-6 rounded-xl bg-gray-50 p-4 dark:bg-gray-900/70">
                        <h4 className="mb-2 font-semibold text-gray-900 dark:text-white">Speaker Bio</h4>
                        <p className="text-gray-700 text-sm whitespace-pre-line dark:text-gray-300">{speaker.bio}</p>
                      </div>

                      <div className="mb-6 rounded-xl bg-gray-50 p-4 dark:bg-gray-900/70">
                        <h4 className="mb-2 font-semibold text-gray-900 dark:text-white">
                          About the Talk
                        </h4>
                        <p className="text-gray-700 dark:text-gray-300">
                          {speaker.description}
                        </p>
                      </div>

                      <div className="space-y-4">
                        <div>
                          <h4 className="mb-2 font-semibold text-gray-900 dark:text-white">
                            Talk Summary
                          </h4>
                          <p className="text-gray-600 text-sm dark:text-gray-400">
                            {speaker.talkSummary}
                          </p>
                        </div>

                        <div>
                          <h4 className="mb-2 font-semibold text-gray-900 dark:text-white">
                            Connect
                          </h4>
                          <div className="flex gap-3">
                            {speaker.socials.map((social, idx) => (
                              <Button
                                className="h-9 w-9 rounded-full border border-gray-200 bg-white transition-all duration-300 hover:bg-red-50 hover:text-red-600 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-red-900/30 dark:hover:text-red-500"
                                key={idx}
                                size="icon"
                                variant="outline"
                              >
                                <a
                                  href={social.url}
                                  rel="noopener noreferrer"
                                  target="_blank"
                                >
                                  {renderSocialIcon(social.platform)}
                                </a>
                              </Button>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </motion.div>
      ))}
    </motion.div>
  );
}
