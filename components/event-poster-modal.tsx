"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

type Dec6EventModalProps = {
  className?: string;
};

export function Dec6EventModal({ className }: Dec6EventModalProps) {
  const [open, setOpen] = useState(false);
  const [failed, setFailed] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          aria-label="Open December 6th event poster"
          className={cn(
            "group relative flex flex-col items-center justify-center overflow-hidden bg-red-700 px-8 py-6 text-center font-bold text-white shadow-xl transition-colors duration-300 hover:bg-red-800 dark:bg-red-600 dark:hover:bg-red-700",
            "min-h-[120px]",
            "cursor-pointer",
            className
          )}
          type="button"
        >
          <motion.span
            className="absolute inset-0 bg-gradient-to-br from-red-600/0 via-red-600/40 to-red-800/0"
            initial={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            whileHover={{ opacity: 1 }}
          />
          <span className="z-10 flex w-full flex-col items-center leading-snug">
            <span className="text-[10px] sm:text-xs font-semibold tracking-wide uppercase">December 6th Event</span>
            <span className="mt-1 break-words text-lg sm:text-xl md:text-2xl">IDEAS THAT MOVE</span>
          </span>
          <motion.div
            className="z-10 mt-3"
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
            whileHover={{ y: -3 }}
          >
            <Sparkles className="h-6 w-6" />
          </motion.div>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-center font-extrabold text-2xl text-red-600 dark:text-red-500">
            December 6th • IDEAS THAT MOVE
          </DialogTitle>
          <DialogDescription className="mx-auto max-w-lg text-center text-base">
            Experience an evening of transformative ideas, stories, and energy. Below is the event poster—share the movement.
          </DialogDescription>
        </DialogHeader>
        <div className="relative mx-auto mt-4 aspect-[3/4] w-full max-w-sm overflow-hidden rounded-lg border border-red-600/30 shadow-md">
          {failed ? (
            <div className="flex h-full w-full items-center justify-center bg-red-50 text-center text-sm font-medium text-red-600 dark:bg-red-950/40 dark:text-red-400">
              Poster unavailable. Ensure file exists at /public/dec6_event.png
            </div>
          ) : (
            <a
              href="https://yoopay.cn/event/65313846"
              target="_blank"
              rel="noopener"
              aria-label="Open full-size December 6th event poster in new tab"
              className="group focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              <Image
                alt="December 6th event poster with IDEAS THAT MOVE branding"
                fill
                priority
                sizes="(max-width: 640px) 100vw, 400px"
                src="/dec6_event.png"
                className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                onError={() => setFailed(true)}
              />
              <span className="absolute bottom-0 left-0 right-0 bg-black/50 px-2 py-1 text-center text-[11px] font-medium text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                Click to view poster
              </span>
            </a>
          )}
        </div>
        {/* Close button removed from content — use dialog's top-right close control */}
      </DialogContent>
    </Dialog>
  );
}

type Dec6SpeakersButtonProps = {
  className?: string;
};

export function Dec6SpeakersButton({ className }: Dec6SpeakersButtonProps) {
    return (
        <Button
            aria-label="View December 6th speakers"
            className={cn(
                "relative overflow-hidden bg-black/80 font-semibold text-white text-lg backdrop-blur-sm transition-colors duration-300 hover:bg-black dark:bg-gray-900 dark:hover:bg-black",
                "border-2 border-red-600/40",
                // slightly increased padding
                "px-10 py-8",
                className
            )}
            type="button"
            asChild
        >
            <a href="/speakers?event=dec6" className="flex flex-col items-center">
                <span className="text-sm tracking-wide uppercase text-red-400">December 6th Speakers</span>
                <span className="text-xl">Lineup Preview</span>
            </a>
        </Button>
    );
}
