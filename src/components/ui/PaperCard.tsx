import FloralImage from "@/components/FloralImage";
import type { ReactNode } from "react";

export function PaperCard({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`ivory-card ornament-frame relative mx-auto ${className}`}>
      <FloralImage variant="gold" className="absolute -left-2 -top-4 w-24 md:-left-1 md:w-36" />
      <FloralImage variant="gold" className="absolute -right-2 -top-4 w-24 -scale-x-100 md:w-36" />
      <FloralImage variant="gold" className="absolute -bottom-4 -left-2 w-24 -scale-y-100 md:w-36" />
      <FloralImage variant="gold" className="absolute -right-2 -bottom-4 w-24 rotate-180 md:w-36" />
      <div className="relative z-10">{children}</div>
    </div>
  );
}
