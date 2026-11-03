import { Kolam } from "@/components/Ornament";
import type { ReactNode } from "react";

export function Section({
  id,
  labelledBy,
  className = "",
  children,
}: {
  id?: string;
  labelledBy?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={`relative scroll-mt-4 overflow-hidden px-5 py-24 sm:px-8 md:py-32 ${className}`}
    >
      {children}
    </section>
  );
}

export function SectionHeading({
  id,
  eyebrow,
  title,
  titleTa,
  tone = "light",
  className = "",
}: {
  id?: string;
  eyebrow?: string;
  title: string;
  titleTa?: string;
  tone?: "light" | "dark";
  className?: string;
}) {
  const titleColor = tone === "light" ? "text-champagne" : "text-maroon";
  const tamilColor = tone === "light" ? "text-blush" : "text-maroon/75";
  const eyebrowColor = tone === "light" ? "text-champagne/80" : "text-emerald";

  return (
    <div className={`mx-auto mb-14 max-w-3xl text-center md:mb-16 ${className}`}>
      {eyebrow ? <p className={`eyebrow mb-5 ${eyebrowColor}`}>{eyebrow}</p> : null}
      <Kolam className="mx-auto mb-6 h-8 w-44" />
      <h2 id={id} className={`font-serif text-title ${titleColor}`}>
        {title}
      </h2>
      {titleTa ? (
        <p lang="ta" className={`font-tamil mt-4 text-lg ${tamilColor}`}>
          {titleTa}
        </p>
      ) : null}
    </div>
  );
}
