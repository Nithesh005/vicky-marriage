const html = await (await fetch("http://localhost:3044")).text();
const checks = {
  hero: html.includes("The Beginning of Forever"),
  pageVenue: html.includes("R.U. Sunil"),
  metaVenue: html.includes("Sri Lakshimi"),
  groomBeforeBride: html.indexOf("Vignesh") !== -1 && html.indexOf("Vignesh") < html.indexOf("Preethi"),
};
console.log(checks);
if (!checks.hero || !checks.pageVenue || !checks.metaVenue || !checks.groomBeforeBride) {
  process.exit(1);
}
