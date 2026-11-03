import { event } from "@/data/event";
import Image from "next/image";

const flowers = {
  topLeft: {
    src: event.assets.flowerTopLeft,
    width: 500,
    height: 500,
  },
  topRight: {
    src: event.assets.flowerTopRight,
    width: 578,
    height: 432,
  },
  gold: {
    src: event.assets.flowerGold,
    width: 669,
    height: 373,
  },
  garland: {
    src: event.assets.flowerGarland,
    width: 669,
    height: 373,
  },
} as const;

type FloralImageProps = {
  variant: keyof typeof flowers;
  className?: string;
  priority?: boolean;
};

export default function FloralImage({
  variant,
  className = "",
  priority = false,
}: FloralImageProps) {
  const flower = flowers[variant];

  return (
    <Image
      src={flower.src}
      alt=""
      width={flower.width}
      height={flower.height}
      priority={priority}
      aria-hidden
      className={`pointer-events-none h-auto select-none ${className}`}
    />
  );
}
