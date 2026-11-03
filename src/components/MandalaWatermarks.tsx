import { event } from "@/data/event";
import Image from "next/image";

export default function MandalaWatermarks() {
  return (
    <>
      <div className="pointer-events-none absolute -left-16 top-10 h-64 w-64 opacity-20">
        <Image
          src={event.assets.mandala}
          alt=""
          fill
          sizes="256px"
          className="object-contain"
        />
      </div>
      <div className="pointer-events-none absolute -right-16 bottom-10 h-64 w-64 opacity-20">
        <Image
          src={event.assets.mandala}
          alt=""
          fill
          sizes="256px"
          className="object-contain"
        />
      </div>
    </>
  );
}
