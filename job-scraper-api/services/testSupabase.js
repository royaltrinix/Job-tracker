import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '..', '.env') });

import { SupabaseService } from './supabaseService.js';

const supabaseService = new SupabaseService();

// ⚠️ REPLACE THIS with a real user ID from your auth.users table
const testUserId = 'dc88739f-2571-4913-9ea8-f728e49685fc';


const testJobData = {
  company: 'Test Company Inc',
  position: 'Senior Software Engineer',
  sourceUrl: 'https://test.com/job/12345',
  location: 'Manchester, UK',
  salary_min: '50000',
  salary_max: '70000',
  applicationMethod: 'LinkedIn',
  description: 'This is a test job posting for a senior software engineer role.'
};

console.log('🧪 Testing Supabase Service with YOUR schema...\n');

try {
  // Test 1: Save application
  console.log('📝 Test 1: Saving application...');
  const saved = await supabaseService.saveJobApplication(testJobData, testUserId);
  console.log('✅ Saved! ID:', saved.id);
  console.log('📋 Saved data:', saved, '\n');

  // Test 2: Get user applications
  console.log('📋 Test 2: Fetching user applications...');
  const applications = await supabaseService.getUserApplications(testUserId);
  console.log(`✅ Found ${applications.length} application(s)`);
  if (applications.length > 0) {
    console.log('First application:', applications[0].company_name, '-', applications[0].position_title);
  }
  console.log('');

  // Test 3: Update application
  console.log('✏️ Test 3: Updating application status...');
  const updated = await supabaseService.updateApplication(saved.id, {
    status: 'Interview',
    notes: 'Had first round interview, waiting for feedback'
  });
  console.log('✅ Updated! New status:', updated.status);
  console.log('✅ Updated! Notes:', updated.notes, '\n');

  // Test 4: Delete application (cleanup)
  console.log('🗑️ Test 4: Deleting test application...');
  await supabaseService.deleteApplication(saved.id);
  console.log('✅ Deleted!\n');

  console.log('🎉 All tests passed!');

} catch (error) {
  console.error('❌ Test failed:', error.message);
  if (error.details) {
    console.error('Details:', error.details);
  }
  if (error.hint) {
    console.error('Hint:', error.hint);
  }
}