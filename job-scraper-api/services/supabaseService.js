import { createClient } from '@supabase/supabase-js';

export class SupabaseService{
    constructor(){
        this.supabase = createClient(
            process.env.SUPABASE_URL,
            process.env.SUPABASE_SERVICE_KEY
        )
        console.log('supabase is initialized')
    }

    async saveJobApplication(jobData, userId){
        try{
            console.log('saving to supabase')
            console.log('data to save: ', jobData)
            const applicationData = {
                company_name: jobData.company || "",
                position_title: jobData.position || "",
                job_url: jobData.sourceUrl || "",
                location: jobData.location || "",
                salary_min: jobData.salary_min ? parseInt(jobData.salary_min) : null,
                salary_max: jobData.salary_max ? parseInt(jobData.salary_max) : null,
                date_applied: new Date().toISOString().split("T")[0],
                status: "Applied",
                application_method: jobData.applicationMethod || "LinkedIn",
                notes: jobData.description || "",
                user_id: userId,
                created_at: new Date().toISOString()
            };
            
            const { data, error } = await this.supabase
                .from('applications')
                .insert([applicationData])
                .select()
                .single()
            if (error) {
                throw error;
            }
            console.log('Application saved successfully!');
            console.log('Saved with ID:', data.id);
            return data;
        }catch(error){
            console.error('Supabase error:', error.message);
            throw new Error(`Failed to save application: ${error.message}`);
        }
    }
    async getUserApplications(userId){
        try{
            console.log('fetching user applications: ', userId)

            const {data, error} = await this.supabase
                .from('applications')
                .select('*')
                .eq('user_id', userId)
                .order('created_at', { ascending: false })
            if (error) throw error;
            console.log(`Found ${data.length} applications`);
            return data;
          
        }catch(error){
            console.error('Error fetching applications:', error.message);
            throw error;
        }
    }

    async updateApplication(applicationId, updates){
        try{
            console.log('updating application: ', applicationId)

            const {data, error} = await this.supabase
                .from('applications')
                .update(updates)
                .eq('id', applicationId)
                .select()
                .single()
            if (error) throw error;
            console.log(`application updated`);
            return data;
          
        }catch(error){
            console.error('Error updating application:', error.message);
            throw error;
        }
    }

    async deleteApplication(applicationId){
        try{
            console.log('deleting application: ', applicationId)

            const {error} = await this.supabase
                .from('applications')
                .delete()
                .eq('id', applicationId)
            if (error) throw error;
            console.log(`application deleted`);
            return true;
          
        }catch(error){
            console.error('Error deleting application:', error.message);
            throw error;
        }
    }

}