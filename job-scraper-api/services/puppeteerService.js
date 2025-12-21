import puppeteer from 'puppeteer'

export class PuppeteerService{
    async scrapeJobUrl(url){
        let browser;
        try{
            console.log("Launching browser...")
            browser = await puppeteer.launch({
                headless: 'new',
                args: [
                    '--no-sandbox',              
                    '--disable-setuid-sandbox',  
                    '--disable-dev-shm-usage',   
                    '--disable-gpu'  
                ]            
            })

            const page = await browser.newPage();
            await page.setExtraHTTPHeaders({
                "User-Agent":
                  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120 Safari/537.36",
              });

            await page.setViewport({ 
                width: 1920,   
                height: 1080  
            });
            console.log('Navigating to:', url);
            await page.goto(url, {
                waitUntil: 'networkidle2',
                timeout: 30000
            })

            await new Promise(resolve => setTimeout(resolve, 3000));

            const content = await page.evaluate(()=> {
                const scripts = document.querySelectorAll('script, style, noscript');
                scripts.forEach(script => script.remove())
                return document.body.innerText;
            })

            console.log('Content extracted successfully');
            console.log('Content length:', content.length, 'characters');
            return content
        }catch(error){
            console.error('Puppeteer error:', error.message);
            throw new Error(`Failed to scrape URL: ${error.message}`);
        }finally{
            if (browser) {
                await browser.close();
                console.log('Browser closed');
              }
        }
    }
}