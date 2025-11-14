"use client";

import { motion } from "framer-motion";
import SpeakersGrid from "@/components/speakers/speakers-grid";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { previousSpeakers, currentSpeakers } from "@/data/speakers";

export default function SpeakersPageClient() {
  return (
    <div className="relative overflow-hidden bg-white py-24 dark:bg-black">
      {/* Background decorative elements */}
      <div className="-z-10 absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.03)_0,rgba(0,0,0,0)_100%)] dark:bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.05)_0,rgba(255,255,255,0)_100%)]" />
      <div className="absolute top-40 left-0 h-96 w-96 rounded-full bg-red-600/5 blur-3xl dark:bg-red-600/10" />
      <div className="absolute right-0 bottom-20 h-96 w-96 rounded-full bg-red-600/5 blur-3xl dark:bg-red-600/10" />

      <div className="container relative z-10 mx-auto px-4">
        <motion.div
          animate={{ opacity: 1, y: 0 }}
          className="mb-16 text-center"
          initial={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="mb-4 font-bold text-4xl text-black md:text-5xl lg:text-6xl dark:text-white">
            Our <span className="text-red-600 dark:text-red-500">Speakers</span>
          </h1>
          <p className="mx-auto max-w-2xl text-gray-700 text-lg dark:text-gray-300">
            Meet the innovative minds who will share their ideas and experiences at TEDxBeixinqiao 2025.
             Click on a speaker to learn more.
          </p>
        </motion.div>

        <Tabs className="w-full" defaultValue="current">
          <TabsList className="mb-8 grid w-full max-w-md mx-auto grid-cols-2">
            <TabsTrigger value="current">Current Speakers</TabsTrigger>
            <TabsTrigger value="previous">Previous Speakers</TabsTrigger>
          </TabsList>
          
          <TabsContent value="current">
            <SpeakersGrid speakers={currentSpeakers} />
          </TabsContent>
          
          <TabsContent value="previous">
            <SpeakersGrid speakers={previousSpeakers} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
