"use client";

import { motion } from "framer-motion";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

const ROTATION_ANGLE = 90;

export function ModeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const initialIconState = {
    opacity: 0,
    rotate: 0,
  };

  return (
    <Button
      className="relative h-9 w-9 rounded-md border-0 bg-transparent text-gray-800 transition-colors hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800/70"
      onClick={toggleTheme}
      size="icon"
      variant="outline"
    >
      <div className="relative h-4 w-4">
        {/* Moon icon (visible in light mode) */}
        <motion.div
          animate={
            mounted
              ? {
                  opacity: theme === "light" ? 1 : 0,
                  rotate: theme === "light" ? 0 : -ROTATION_ANGLE,
                }
              : initialIconState
          }
          className="absolute inset-0 text-gray-700 dark:text-blue-300"
          initial={initialIconState}
          transition={{ duration: 0.25 }}
        >
          <Moon className="h-4 w-4" />
        </motion.div>

        {/* Sun icon (visible in dark mode) */}
        <motion.div
          animate={
            mounted
              ? {
                  opacity: theme === "dark" ? 1 : 0,
                  rotate: theme === "dark" ? 0 : ROTATION_ANGLE,
                }
              : initialIconState
          }
          className="absolute inset-0 text-yellow-400 dark:text-yellow-300"
          initial={initialIconState}
          transition={{ duration: 0.25 }}
        >
          <Sun className="h-4 w-4" />
        </motion.div>
      </div>

      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
