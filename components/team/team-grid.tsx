"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { teamMembers } from "@/data/team-members";

// Removed duplicate team data array as it's now imported from data/team-members.ts

export default function TeamGrid() {
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
      animate="show"
      className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
      initial="hidden"
      variants={container}
    >
      {teamMembers.map((member) => (
        <motion.div key={member.name} variants={item}>
          <Dialog>
            <Card className="group overflow-hidden border-0 bg-white/90 backdrop-blur-sm transition-all duration-300 hover:shadow-md hover:shadow-red-600/10 dark:bg-gray-900/70 dark:backdrop-blur-md dark:hover:shadow-red-600/20">
              <div className="relative aspect-square w-full overflow-hidden bg-gray-100 dark:bg-gray-800">
                <Image
                  alt={member.name}
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  fill
                  src={`/team/${member.name.split(" ")[0].toLowerCase()}.jpg`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <div className="absolute right-0 bottom-0 left-0 p-4 text-white">
                    <p className="font-medium text-sm">{member.title}</p>
                  </div>
                </div>
              </div>
              <CardContent className="p-4">
                <h3 className="font-semibold text-black text-lg dark:text-white">
                  {member.name}
                </h3>
                <p className="mb-3 text-gray-500 text-sm dark:text-gray-400">
                  {member.title}
                </p>

                <DialogTrigger asChild>
                  {/* Making the entire card clickable but without showing a button */}
                  <div className="absolute inset-0 cursor-pointer">
                    <span className="sr-only">Read bio for {member.name}</span>
                  </div>
                </DialogTrigger>
              </CardContent>
            </Card>

            <DialogContent className="max-w-3xl border-0 bg-transparent p-0">
              <div className="overflow-hidden rounded-xl border border-gray-200 bg-white/95 shadow-2xl backdrop-blur-xl dark:border-gray-800 dark:bg-black/95">
                <div className="grid md:grid-cols-2">
                  <div className="relative aspect-[3/2] w-full overflow-hidden rounded-lg">
                    <Image
                      alt={member.name}
                      className="object-cover"
                      fill
                      src={`/team/${member.name.split(" ")[0].toLowerCase()}.jpg`}
                    />
                  </div>

                  <div className="p-6">
                    <h3 className="mb-1 font-bold text-gray-900 text-xl dark:text-white">
                      {member.name}
                    </h3>
                    <p className="mb-4 font-medium text-gray-500 text-sm dark:text-gray-400">
                      {member.title}
                    </p>

                    {member.quote && (
                      <div className="mb-4 rounded-lg bg-gray-100 p-4 italic dark:bg-gray-800">
                        "{member.quote}"
                      </div>
                    )}

                    <p className="text-gray-700 dark:text-gray-300">
                      {member.bio}
                    </p>
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
