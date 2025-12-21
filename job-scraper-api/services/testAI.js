import dotenv from "dotenv";
import { AiService } from "./aiService.js";

dotenv.config();
const aiService = new AiService();

const sampleJobText = `
Software Engineer - Google

Location: London, United Kingdom

About the role:
We are looking for a talented Software Engineer to join our team.
You will work on exciting projects using cutting-edge technology.

Requirements:
- 3+ years of experience with Python
- Strong knowledge of React and JavaScript
- Experience with cloud platforms (GCP, AWS)
- Bachelor's degree in Computer Science

Salary: £80,000 - £100,000 per year

Benefits:
- Health insurance
- Flexible working hours
- Remote work options

How to apply:
Please apply through our careers portal at careers.google.com
`;

console.log("Testing AI Service...\n");
console.log("Sample text length:", sampleJobText.length, "characters\n");

console.log("API Key loaded:", process.env.COHERE_API_KEY ? "Yes" : "No");
console.log("");

try {
  const extracted = await aiService.extractJobDetails(sampleJobText);

  console.log("\n Extraction successful!\n");
  console.log("Extracted Data:");
  console.log(JSON.stringify(extracted, null, 2));
} catch (error) {
  console.error("\n Test failed:", error.message);
}
