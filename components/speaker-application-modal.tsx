"use client";

import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { useState } from "react";
import { SpeakerApplicationForm } from "@/components/speaker-application-form";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

type SpeakerApplicationModalProps = {
  variant?: "default" | "mobile";
  className?: string;
};

export function SpeakerApplicationModal({
  variant = "default",
  className,
}: SpeakerApplicationModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("application");

  return (
    <Dialog onOpenChange={setIsOpen} open={isOpen}>
      <DialogTrigger asChild>
        {variant === "default" ? (
          <Button
            className={cn(
              "group relative overflow-hidden bg-red-600 transition-all duration-300 hover:bg-red-700 dark:bg-red-600 dark:hover:bg-red-700",
              className
            )}
          >
            <motion.span
              className="absolute inset-0 bg-red-500/40"
              initial={{ width: "100%", height: "100%", x: "-101%" }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              whileHover={{ x: "101%" }}
            />
            <span className="z-10">Become a Speaker</span>
            <motion.div
              className="z-10"
              transition={{ type: "spring", stiffness: 400, damping: 15 }}
              whileHover={{ x: 3 }}
            >
              <ChevronRight className="h-4 w-4" />
            </motion.div>
          </Button>
        ) : (
          <Button
            className={cn(
              "group relative overflow-hidden bg-red-600 text-white transition-all duration-300 hover:bg-red-700 dark:bg-red-600 dark:hover:bg-red-700",
              className
            )}
            size="sm"
            variant="default"
          >
            <motion.span
              className="absolute inset-0 bg-red-500/40"
              initial={{ width: "100%", height: "100%", x: "-101%" }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              whileHover={{ x: "101%" }}
            />
            <span className="z-10">Become a Speaker</span>
          </Button>
        )}
      </DialogTrigger>

      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="text-center font-bold text-2xl text-red-600 dark:text-red-500">
            Speaker Portal
          </DialogTitle>
          <DialogDescription className="text-center">
            Apply as a speaker or nominate someone for our TEDx event.
          </DialogDescription>
        </DialogHeader>

        <Tabs
          className="mt-4 w-full"
          defaultValue="application"
          onValueChange={setActiveTab}
          value={activeTab}
        >
          <TabsList className="mb-6 grid w-full grid-cols-2">
            <TabsTrigger
              className="data-[state=active]:bg-red-600 data-[state=active]:text-white"
              value="application"
            >
              Speaker Application
            </TabsTrigger>
            <TabsTrigger
              className="data-[state=active]:bg-red-600 data-[state=active]:text-white"
              value="nomination"
            >
              Nominate Speaker
            </TabsTrigger>
          </TabsList>

          <TabsContent value="application">
            <SpeakerApplicationForm formType="application" />
          </TabsContent>

          <TabsContent value="nomination">
            <SpeakerApplicationForm formType="nomination" />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
