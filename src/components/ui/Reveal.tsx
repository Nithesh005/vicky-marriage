"use client";

import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";
import { motion } from "framer-motion";
import type { ReactNode } from "react";

const ease = [0.22, 1, 0.36, 1] as const;

export function Reveal({
  children,
  className,
  delay = 0,
  y = 28,
  blur = false,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  blur?: boolean;
}) {
  const reduced = usePrefersReducedMotion();

  return (
    <motion.div
      className={className}
      initial={
        reduced
          ? false
          : { opacity: 0, y, filter: blur ? "blur(10px)" : "none" }
      }
      whileInView={{ opacity: 1, y: 0, filter: "none" }}
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      transition={{ duration: 0.9, delay, ease }}
    >
      {children}
    </motion.div>
  );
}

export function Stagger({
  children,
  className,
  delay = 0.12,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduced = usePrefersReducedMotion();

  return (
    <motion.div
      className={className}
      initial={reduced ? false : "hidden"}
      whileInView="show"
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: reduced ? 0 : delay } },
      }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, y: 22 },
        show: { opacity: 1, y: 0, transition: { duration: 0.75, ease } },
      }}
    >
      {children}
    </motion.div>
  );
}
