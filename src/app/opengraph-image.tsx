import { event } from "@/data/event";
import { ImageResponse } from "next/og";

export const alt = event.seo.title;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(180deg, #4A1020 0%, #310B18 100%)",
          color: "#E7D4A5",
        }}
      >
        <div style={{ fontSize: 22, letterSpacing: 12, textTransform: "uppercase" }}>
          {event.type.en}
        </div>
        <div style={{ fontSize: 92, fontFamily: "serif", marginTop: 24 }}>
          {event.bride.firstName} & {event.groom.firstName}
        </div>
        <div style={{ fontSize: 28, marginTop: 28, color: "#FFF9EF" }}>
          {event.date.displayEn} · {event.time.displayEn}
        </div>
        <div style={{ fontSize: 22, marginTop: 12, color: "#F2D9D7" }}>
          {event.venue.name}, {event.venue.city}
        </div>
      </div>
    ),
    { ...size },
  );
}
