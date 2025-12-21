import express from "express";
import { PuppeteerService } from "../services/puppeteerService.js";
import { AiService } from "../services/aiService.js";
import { SupabaseService } from "../services/supabaseService.js";

const router = express.Router();



const isValidUrl = (string) => {
  try {
    new URL(string);
    return true;
  } catch (_) {
    return false;
  }
};
// scrape and save
router.post("/scrape-and-save", async (req, res) => {
  const { url, userId } = req.body;
  if (!url || !userId) {
    return res.status(400).json({
      success: false,
      error: "URL and userID are required",
    });
  }

  if (!isValidUrl(url)) {
    return res.status(400).json({
      success: false,
      error: "Invalid URL format",
    });
  }

  try {
    const puppeteerService = new PuppeteerService();
    const aiService = new AiService();
    const supabaseService = new SupabaseService();
    console.log("starting job scraping process");
    console.log("URL: ", url);
    console.log("User ID: ", userId);
    // scraping
    const content = await puppeteerService.scrapeJobUrl(url);
    console.log("Scraped", content.length, "characters");
    // extracting with ai
    const jobDetails = await aiService.extractJobDetails(content);
    console.log("extracted job details");
    jobDetails.sourceUrl = url;
    // save to supabase
    const savedApplication = await supabaseService.saveJobApplication(
      jobDetails,
      userId
    );
    console.log("Job scraping completed");
    res.json({
      success: true,
      message: "Job application saved successfully",
      data: savedApplication,
    });
  } catch (error) {
    console.error("Error in scraping process:", error.message);
    res.status(500).json({
      success: false,
      error: error.message || "Failed to process job posting",
    });
  }
});
// Just for extract
router.post("/extract-only", async (req, res) => {
  const { url } = req.body;

  if (!url || !isValidUrl(url)) {
    return res.status(400).json({
      success: false,
      error: "Valid URL is required",
    });
  }

  try {
    const puppeteerService = new PuppeteerService();
    const aiService = new AiService();
    console.log("\n Extracting job details (no save)...");

    const content = await puppeteerService.scrapeJobUrl(url);
    const jobDetails = await aiService.extractJobDetails(content);

    jobDetails.sourceUrl = url;

    res.json({
      success: true,
      data: jobDetails,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

// Health check
router.get("/health", (req, res) => {
  res.json({
    status: "ok",
    timestamp: new Date().toISOString(),
    services: {
      puppeteer: "ready",
      ai: "ready",
      database: "ready",
    },
  });
});
export default router;