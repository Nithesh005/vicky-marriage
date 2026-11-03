const base = process.argv[2] || "http://localhost:3044";
const paths = [
  "/",
  "/robots.txt",
  "/sitemap.xml",
  "/manifest.webmanifest",
  "/images/engagement-og.jpg",
  "/favicon.ico",
  "/icons/icon-192.png",
  "/icons/icon-512.png",
  "/icons/apple-touch-icon.png",
];

const failures = [];
let canonicalHref = "";

function fail(message) {
  failures.push(message);
  console.error("FAIL", message);
}

for (const pathname of paths) {
  const response = await fetch(base + pathname);
  const buffer = Buffer.from(await response.arrayBuffer());
  console.log(pathname, response.status, response.headers.get("content-type"), buffer.length);
  if (!response.ok) fail(`${pathname} returned ${response.status}`);

  if (pathname === "/") {
    const html = buffer.toString("utf8");
    const titles = html.match(/<title>[\s\S]*?<\/title>/gi) || [];
    const descriptions = [...html.matchAll(/<meta[^>]*name=["']description["'][^>]*>/gi)].map((match) => match[0]);
    const social = [...html.matchAll(/<meta[^>]*(?:property|name)=["'](?:og:|twitter:)[^"']+["'][^>]*>/gi)].map(
      (match) => match[0],
    );
    const canonical = html.match(/<link[^>]*rel=["']canonical["'][^>]*>/i);
    const robots = [...html.matchAll(/<meta[^>]*name=["'](?:robots|googlebot)["'][^>]*>/gi)].map((match) => match[0]);
    const theme = html.match(/<meta[^>]*name=["']theme-color["'][^>]*>/i);
    const manifest = html.match(/<link[^>]*rel=["']manifest["'][^>]*>/i);
    const icons = [...html.matchAll(/<link[^>]*rel=["'][^"']*icon[^"']*["'][^>]*>/gi)].map((match) => match[0]);
    const ldBlocks = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/gi)].map(
      (match) => match[1],
    );

    console.log("TITLE_COUNT", titles.length);
    console.log(titles.join("\n"));
    console.log("DESC_COUNT", descriptions.length);
    descriptions.forEach((tag) => console.log(tag));
    console.log("CANONICAL", canonical?.[0] ?? "missing");
    robots.forEach((tag) => console.log(tag));
    console.log("THEME", theme?.[0] ?? "missing");
    console.log("MANIFEST_LINK", manifest?.[0] ?? "missing");
    icons.forEach((tag) => console.log(tag));
    console.log("SOCIAL");
    social.forEach((tag) => console.log(tag));
    console.log("LANG", html.match(/<html[^>]*>/i)?.[0]);
    console.log("CHARSET_UTF8", /charset=["']?utf-8/i.test(html));

    const requiredMeta = [
      "application-name",
      "keywords",
      "author",
      "creator",
      "publisher",
      "category",
    ];
    for (const name of requiredMeta) {
      const tag = html.match(new RegExp(`<meta[^>]*name=["']${name}["'][^>]*>`, "i"));
      console.log(name.toUpperCase(), tag?.[0] ?? "missing");
      if (!tag) fail(`missing meta ${name}`);
      if (tag[0].includes("Preethi") && /Preethi\s*(?:&amp;|&)\s*Vignesh/.test(tag[0])) {
        fail(`${name} reverses the couple's names`);
      }
    }

    if (titles.length !== 1) fail(`expected 1 title, found ${titles.length}`);
    if (descriptions.length !== 1) fail(`expected 1 description, found ${descriptions.length}`);
    if (!canonical) fail("missing canonical");
    canonicalHref = canonical?.[0].match(/href="([^"]+)"/)?.[1] ?? "";
    if (!theme) fail("missing theme-color");
    if (!manifest) fail("missing manifest link");
    if (ldBlocks.length !== 1) fail(`expected 1 JSON-LD block, found ${ldBlocks.length}`);
    if (/Preethi\s*&\s*Vignesh|Preethi\s+and\s+Vignesh/i.test(html)) fail("English name order is reversed");
    if (/ப்ரீத்தி[\s\S]{0,20}விக்னேஷ்/.test(html)) fail("Tamil name order is reversed");
    if (!html.includes("Vignesh") || !html.includes("Preethi")) fail("couple names missing");

    for (const block of ldBlocks) {
      const parsed = JSON.parse(block);
      const event = parsed["@graph"].find((node) => node["@type"] === "Event");
      const page = parsed["@graph"].find((node) => node.workTranslation);
      console.log("EVENT_NAME", event.name);
      console.log("EVENT_START", event.startDate);
      console.log("EVENT_LOCATION", event.location.name);
      console.log("EVENT_ORGANIZER", event.organizer ?? "omitted");
      console.log("EVENT_END", event.endDate ?? "omitted");
      console.log("TAMIL_DESCRIPTION", page.workTranslation.description);
      console.log("TAMIL_NAME", page.workTranslation.name);
      if (event.startDate !== "2026-11-15T10:30:00+05:30") fail("unexpected startDate");
      if (event.location.name !== "Sri Lakshimi Mahal") fail("unexpected venue");
      if (event.organizer) fail("organizer was invented");
      if (event.endDate) fail("endDate was invented");
      if (!event.location.geo) {
        console.log("EVENT_GEO", "omitted");
      } else {
        fail("venue coordinates were invented");
      }
      if (!page.workTranslation.description.includes("விக்னேஷ்")) fail("Tamil description missing");
    }

    const imageTags = social.filter((tag) => tag.includes("og:image") && !tag.includes("og:image:"));
    if (imageTags.length !== 1) fail(`expected 1 og:image, found ${imageTags.length}`);
    const imageUrl = imageTags[0]?.match(/content="([^"]+)"/)?.[1];
    if (!imageUrl) fail("og:image content missing");
    else {
      const imageResponse = await fetch(imageUrl);
      console.log("OG_IMAGE_FETCH", imageResponse.status, imageResponse.headers.get("content-type"), imageUrl);
      if (!imageResponse.ok) fail("og:image URL is broken");
    }
  }

  if (pathname === "/robots.txt" || pathname === "/sitemap.xml" || pathname === "/manifest.webmanifest") {
    const text = buffer.toString("utf8");
    console.log(text);
    if (pathname === "/sitemap.xml") {
      const loc = text.match(/<loc>([^<]+)<\/loc>/)?.[1] ?? "";
      if (loc !== canonicalHref) fail(`sitemap loc ${loc} does not match canonical ${canonicalHref}`);
      if (!text.includes("/images/engagement-og.jpg")) fail("sitemap is missing the share image");
      if (/\/api\/|\/admin\/|\/private\//.test(loc)) fail("sitemap includes a private path");
    }
    if (pathname === "/robots.txt") {
      if (!text.includes("Disallow: /api/")) fail("robots does not protect /api/");
      if (!text.includes("Disallow: /admin/")) fail("robots does not protect /admin/");
      if (!text.includes("Disallow: /private/")) fail("robots does not protect /private/");
      if (!text.includes("Allow: /")) fail("robots does not allow the public invitation");
    }
  }
}

if (failures.length) {
  console.error(`\n${failures.length} validation failure(s)`);
  process.exit(1);
}

console.log("\nMetadata validation passed");
