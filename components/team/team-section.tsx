"use client";

import { motion, useInView } from "framer-motion";
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { getSortedTeam } from "@/data/team-members";
import { cn } from "@/lib/utils";

const getRoleStyles = (role: string) => {
  const roleStyles = {
    leadership: "bg-red-600/80",
    communications: "bg-blue-600/80",
    operations: "bg-amber-600/80",
    speakers: "bg-emerald-600/80",
    technical: "bg-indigo-600/80",
  };
  return roleStyles[role as keyof typeof roleStyles] || "bg-gray-600/80";
};

export default function TeamSection() {
  const [hoveredMember, setHoveredMember] = useState<string | null>(null);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  // Get only 4 featured team members
  const FEATURED_TEAM_COUNT = 4;
  const featuredTeam = getSortedTeam().slice(0, FEATURED_TEAM_COUNT);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <section className="w-full py-24" id="team">
      <motion.div
        animate={isInView ? "visible" : "hidden"}
        className="container mx-auto px-4"
        initial="hidden"
        ref={ref}
        variants={containerVariants}
      >
        <div className="mx-auto max-w-7xl">
          <motion.div
            className="mb-12 flex flex-col items-center text-center"
            variants={itemVariants}
          >
            <span className="mb-3 inline-block rounded-full bg-red-100 px-4 py-1.5 font-medium text-red-600 text-sm dark:bg-red-900/30 dark:text-red-400">
              Our Team
            </span>
            <h2 className="mb-6 font-bold text-4xl text-black md:text-5xl dark:text-white">
              Meet the{" "}
              <span className="text-red-600 dark:text-red-500">People</span>{" "}
              Behind TEDxBeixinqiao
            </h2>
            <p className="mx-auto max-w-3xl text-gray-700 text-lg dark:text-gray-300">
              Our dedicated team brings together diverse talents and
              perspectives to create meaningful TEDx experiences that inspire
              and connect our community.
            </p>
          </motion.div>

          <motion.div
            className="mb-10 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-4"
            variants={itemVariants}
          >
            {featuredTeam.map((member) => (
              <Link
                href={`/team#${member.role}`}
                key={member.name}
                onMouseEnter={() => setHoveredMember(member.name)}
                onMouseLeave={() => setHoveredMember(null)}
                passHref
              >
                <div className="group hover:-translate-y-2 relative overflow-hidden rounded-xl shadow-lg transition-all duration-300">
                  <div className="relative aspect-square bg-gray-200 dark:bg-gray-800">
                    <Image
                      alt={member.name}
                      className={cn(
                        "object-cover transition-transform duration-700 ease-out",
                        hoveredMember === member.name
                          ? "scale-110"
                          : "scale-100"
                      )}
                      fill
                      src={member.image}
                    />
                    <div
                      className={cn(
                        "absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent transition-opacity duration-300",
                        hoveredMember === member.name
                          ? "opacity-100"
                          : "opacity-70"
                      )}
                    />
                  </div>
                  <div className="absolute right-0 bottom-0 left-0 p-4 text-white">
                    <div
                      className={cn(
                        "mb-1 inline-block rounded-full px-2 py-0.5 font-medium text-xs",
                        getRoleStyles(member.role)
                      )}
                    >
                      {member.role.charAt(0).toUpperCase() +
                        member.role.slice(1)}
                    </div>
                    <h3 className="font-bold text-xl">{member.name}</h3>
                    <p className="text-sm text-white/90">{member.title}</p>
                  </div>
                </div>
              </Link>
            ))}
          </motion.div>

          <motion.div className="flex justify-center" variants={itemVariants}>
            <Button asChild>
              <Link className="flex items-center gap-1" href="/team">
                Meet All Team Members <ChevronRight className="h-4 w-4" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
