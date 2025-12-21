const API_URL = 'http://localhost:3001/api';
export const extractJobFromUrl = async(url) => {
    try{
        const response = await fetch(`${API_URL}/extract-only`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ url })
        });

        const result = await response.json();
        if(!response.ok){
            throw new Error(result.error || 'Failed to extract job details')
        }
        return result.data;
    }catch(error){
        console.error('Job extraction error: ', error)
        throw error;
    }
}

export const scrapeAndSaveJob = async (url, userId) => {
    try{
        const response = await fetch(`${API_URL}/scrape-and-save`,{
            method: 'POST',
            headers: {
                'Content-Type': 'applications/json',
            },
            body: JSON.stringify({ url,userId })
        })
        const result = await response.json();
        if(!response.ok){
            throw new Error(result.error || 'Failed to scrape and save job')
        }
        return result.data
    }catch{
        console.error('Job scraping error: ', error)
        throw error;
    }
}