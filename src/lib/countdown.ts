import { event } from "@/data/event";

export const EVENT_START_MS = Date.parse(event.datetime);

export type TimeLeft = {
  total: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

export function getTimeLeft(now = Date.now()): TimeLeft {
  const total = Math.max(0, EVENT_START_MS - now);
  const secondsTotal = Math.floor(total / 1000);
  return {
    total,
    days: Math.floor(secondsTotal / 86400),
    hours: Math.floor((secondsTotal % 86400) / 3600),
    minutes: Math.floor((secondsTotal % 3600) / 60),
    seconds: secondsTotal % 60,
  };
}
