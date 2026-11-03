import { event } from "@/data/event";

function pad(value: number) {
  return String(value).padStart(2, "0");
}

function stamp(date: Date) {
  return (
    date.getUTCFullYear() +
    pad(date.getUTCMonth() + 1) +
    pad(date.getUTCDate()) +
    "T" +
    pad(date.getUTCHours()) +
    pad(date.getUTCMinutes()) +
    pad(date.getUTCSeconds()) +
    "Z"
  );
}

export function buildCalendarIcs() {
  const startLocal = event.datetime.replace(/[-:]/g, "").replace("+0530", "");
  const dtStart = startLocal.slice(0, 15);
  const location = `${event.venue.name}, ${event.venue.city}, ${event.venue.state}, ${event.venue.country}`;
  const uid = `engagement-${event.groom.firstName}-${event.bride.firstName}-${event.date.isoDate}@invitation`.toLowerCase();

  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Vignesh and Preethi//Engagement Invitation//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VTIMEZONE",
    `TZID:${event.timezone}`,
    "BEGIN:STANDARD",
    "DTSTART:19700101T000000",
    "TZOFFSETFROM:+0530",
    "TZOFFSETTO:+0530",
    "TZNAME:IST",
    "END:STANDARD",
    "END:VTIMEZONE",
    "BEGIN:VEVENT",
    `UID:${uid}`,
    `DTSTAMP:${stamp(new Date())}`,
    `DTSTART;TZID=${event.timezone}:${dtStart}`,
    `SUMMARY:${event.calendar.title}`,
    `LOCATION:${location}`,
    `DESCRIPTION:${event.seo.description}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ];

  return lines.join("\r\n");
}

export function downloadCalendarInvite() {
  const ics = buildCalendarIcs();
  const blob = new Blob([ics], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = "vignesh-preethi-engagement.ics";
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  URL.revokeObjectURL(url);
}
