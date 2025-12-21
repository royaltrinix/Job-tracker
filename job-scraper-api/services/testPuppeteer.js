import { PuppeteerService } from "./puppeteerService.js";

const scraper = new PuppeteerService();

const testUrl = 'https://example.com'
console.log('testing puppeteer')
console.log('URL: ', testUrl)

try {
    const content = await scraper.scrapeJobUrl(testUrl);
    console.log('\n Success!');
    console.log('First 500 characters:');
    console.log(content.substring(0, 500));
  } catch (error) {
    console.error('Test failed:', error.message);
  }