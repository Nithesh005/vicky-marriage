import { event } from "@/data/event";

const query = encodeURIComponent(event.venue.mapsQuery);

export const mapsSearchUrl = `https://www.google.com/maps/search/?api=1&query=${query}`;
export const mapsDirectionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${query}`;
export const mapsEmbedUrl = `https://www.google.com/maps?q=${query}&output=embed`;
