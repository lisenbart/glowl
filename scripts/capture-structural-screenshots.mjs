import { chromium } from "playwright";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.join(__dirname, "..", "glowl_audit_screenshots");
const base = "http://127.0.0.1:4173";

async function shot(page, name, opts = {}) {
  const file = path.join(outDir, name);
  await page.screenshot({ path: file, fullPage: opts.fullPage ?? false });
  console.log("saved", name);
}

async function setViewport(page, width, height = 900) {
  await page.setViewportSize({ width, height });
}

async function scrollToSelector(page, selector) {
  await page.evaluate((sel) => {
    const el = document.querySelector(sel);
    if (el) el.scrollIntoView({ block: "start" });
  }, selector);
  await page.waitForTimeout(400);
}

async function checkOverflow(page) {
  return page.evaluate(() => {
    const doc = document.documentElement;
    return {
      scrollWidth: doc.scrollWidth,
      clientWidth: doc.clientWidth,
      overflow: doc.scrollWidth > doc.clientWidth + 1,
    };
  });
}

async function main() {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  // Home desktop 1440
  await setViewport(page, 1440, 900);
  await page.goto(base + "/", { waitUntil: "networkidle" });
  await page.waitForTimeout(600);
  await shot(page, "general-home-desktop-1440.png");
  console.log("overflow 1440", await checkOverflow(page));

  // Section crops at 1440
  await scrollToSelector(page, ".client-experience");
  await shot(page, "general-client-experience.png");

  await scrollToSelector(page, ".selected-work");
  await shot(page, "general-selected-work.png");

  await scrollToSelector(page, ".production-directions");
  await shot(page, "general-production-directions.png");

  await scrollToSelector(page, ".founders-section");
  await shot(page, "general-team.png");

  // Tablet 768
  await setViewport(page, 768, 900);
  await page.goto(base + "/", { waitUntil: "networkidle" });
  await page.waitForTimeout(500);
  await shot(page, "general-home-tablet-768.png");
  console.log("overflow 768", await checkOverflow(page));

  // Mobile 390
  await setViewport(page, 390, 844);
  await page.goto(base + "/", { waitUntil: "networkidle" });
  await page.waitForTimeout(500);
  await shot(page, "general-home-mobile-390.png");
  console.log("overflow 390", await checkOverflow(page));

  // Mobile 320
  await setViewport(page, 320, 700);
  await page.goto(base + "/", { waitUntil: "networkidle" });
  await page.waitForTimeout(500);
  await shot(page, "general-home-mobile-320.png");
  console.log("overflow 320", await checkOverflow(page));

  // Services desktop
  await setViewport(page, 1440, 900);
  await page.goto(base + "/services", { waitUntil: "networkidle" });
  await page.waitForTimeout(500);
  await shot(page, "general-services-desktop-1440.png");
  console.log("overflow services 1440", await checkOverflow(page));

  // Services mobile
  await setViewport(page, 390, 844);
  await page.goto(base + "/services", { waitUntil: "networkidle" });
  await page.waitForTimeout(500);
  await shot(page, "general-services-mobile-390.png");
  console.log("overflow services 390", await checkOverflow(page));

  // Verify copy / forbidden strings
  await setViewport(page, 1440, 900);
  await page.goto(base + "/", { waitUntil: "networkidle" });
  const homeText = await page.locator("main").innerText();
  const checks = {
    heroH1: homeText.includes("Every Process. One Standard."),
    heroBody: homeText.includes(
      "Whether handcrafted, fully AI-generated, or somewhere in between, every project is shaped by experienced directors and producers from first idea to final frame.",
    ),
    aiH2: homeText.includes("The Process Follows the Idea."),
    clientLabel: homeText.includes("Selected Client Experience"),
    trustedByAbsent: !homeText.includes("Trusted by"),
    hiringAbsent: !homeText.includes("We're hiring"),
    teamTitle: homeText.includes("The Team Behind the Work"),
    performanceAbsent: !homeText.includes("Performance & Social"),
  };
  console.log("home checks", checks);

  const sectionOrder = await page.evaluate(() => {
    const main = document.querySelector("main");
    if (!main) return [];
    return Array.from(main.children).map((el) => ({
      tag: el.tagName.toLowerCase(),
      id: el.id || null,
      class: el.className,
      label: el.getAttribute("aria-label"),
    }));
  });
  console.log("home section order", sectionOrder);

  await page.goto(base + "/services", { waitUntil: "networkidle" });
  const servicesText = await page.locator("main").innerText();
  console.log("services checks", {
    hero: servicesText.includes("Production Built Around the Brief."),
    estimateBlockAbsent: !servicesText.includes("Have a project in mind?"),
    performanceAbsent: !servicesText.includes("Performance & Social"),
  });
  const servicesOrder = await page.evaluate(() => {
    const main = document.querySelector("main");
    if (!main) return [];
    return Array.from(main.children).map((el) => ({
      tag: el.tagName.toLowerCase(),
      id: el.id || null,
      class: el.className,
      label: el.getAttribute("aria-label"),
    }));
  });
  console.log("services section order", servicesOrder);

  // Footer body
  const footer = await page.locator("footer").innerText();
  console.log(
    "footer body",
    footer.includes("Commercials, game content and films — from creative development to final delivery."),
  );

  // Overflow at 1024
  await setViewport(page, 1024, 800);
  await page.goto(base + "/", { waitUntil: "networkidle" });
  console.log("overflow 1024", await checkOverflow(page));

  await browser.close();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
