import { CohereClient } from "cohere-ai";

export class AiService {
  constructor() {
    this.cohere = new CohereClient({
      token: process.env.COHERE_API_KEY,
    });
  }

  async extractJobDetails(content) {
    try {
      console.log("extracting job details with cohere ai");
      console.log("This may take 5-10 seconds...\n");

      const response = await this.cohere.chat({
        model: "command-r7b-12-2024",
        message: `You are a job posting parser. Extract job details from this text and return ONLY a valid JSON object with these exact fields:
        {
            "company": "company name",
            "position": "job title/position",
            "location": "work location (city, country or Remote)",
            "salary_min": "minimum salary as number string (e.g. '50000') or empty string if not found",
            "salary_max": "maximum salary as number string (e.g. '80000') or empty string if not found",
            "applicationMethod": "Online, Email, LinkedIn, Indeed, or Other",
            "description": "brief job description (2-3 sentences max)"
        }


        Important: 
        - Return ONLY the JSON object, no markdown, no explanation, no code blocks
        - For salary: Extract min and max as separate numbers
        - Example: "£50,000 - £80,000" should be salary_min: "50000", salary_max: "80000"
        - Example: "$100k" should be salary_min: "100000", salary_max: ""
        - If no salary mentioned, use empty strings

        Job posting content:
        ${content.substring(0, 15000)}`,
        temperature: 0.3,
      });

      console.log("Received response from Cohere");
      console.log("Response text:", response.text.substring(0, 200) + "...\n");

      const responseText = response.text;
      let jsonMatch = responseText.match(/\{[\s\S]*\}/);

      if (jsonMatch) {
        const parsed = JSON.parse(jsonMatch[0]);
        console.log("job details extracted successfully");
        console.log("Extracted data:", parsed);
        return parsed;
      }
      throw new Error("Could not parse AI response into JSON");
    } catch (error) {
      console.error("Ai extraction error: ", error.message);
      throw new Error(`Failed to extract job details: ${error.message}`);
    }
  }
}
