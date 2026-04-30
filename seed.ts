import { createClient } from '@vercel/kv';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

// Load environment variables from .env.local
dotenv.config({ path: '.env.local' });

// Initialize KV Client
const kv = createClient({
  url: process.env.KV_REST_API_URL || '',
  token: process.env.KV_REST_API_TOKEN || '',
});

// ─── 1. SEED MOCK ALLIANCE ROSTER ───────────────────────────────────────────
async function seedSubmissions() {
  try {
    const filePath = path.join(process.cwd(), 'data', 'submissions', 'mock.json');
    
    if (!fs.existsSync(filePath)) {
      console.warn(`⚠️ Skipping Submissions: mock.json not found at ${filePath}`);
      return;
    }

    const rawData = fs.readFileSync(filePath, 'utf8');
    const mockData = JSON.parse(rawData);

    // Format the data to perfectly match what the API and UI expect
    const formattedSubmissions = mockData.map((item: any) => ({
      ...item,
      id: item.id || `mem_${Math.random().toString(36).substring(2, 11)}`,
      submittedAt: item.submittedAt || new Date().toISOString(),
      status: "approved", // CRITICAL: Force status to "approved" so they show up
      group: item.group || item.rank || "R1", 
      reviewedAt: item.reviewedAt || new Date().toISOString()
    }));

    console.log(`🚀 Pushing ${formattedSubmissions.length} alliance submissions to KV...`);
    await kv.set("submissions", formattedSubmissions);
    console.log('✅ Alliance Roster synced successfully!');
    
  } catch (error) {
    console.error('❌ Roster sync failed:', error);
  }
}

// ─── 2. SEED CLEANED KINGSHOT DATABASE ──────────────────────────────────────
async function seedKingshotDatabase() {
  try {
    const dataPath = path.join(process.cwd(), "kingshot_database_clean.json");
    
    if (!fs.existsSync(dataPath)) {
      console.warn(`⚠️ Skipping Game Data: kingshot_database_clean.json not found.`);
      return;
    }

    const rawData = fs.readFileSync(dataPath, "utf8");
    const parsedData = JSON.parse(rawData);

    console.log(`🚀 Pushing Kingshot Game Data to KV...`);
    await kv.set("kingshot_game_data", parsedData);
    console.log("✅ Kingshot Database synced successfully!");

  } catch (error) {
    console.error("❌ Game Data sync failed:", error);
  }
}

// ─── MAIN EXECUTION ─────────────────────────────────────────────────────────
async function runSeeders() {
  if (!process.env.KV_REST_API_URL) {
    console.error("❌ Missing KV_REST_API_URL. Make sure your .env.local is set up.");
    return;
  }

  console.log("--- Starting Database Seeding ---");
  await seedSubmissions();
  await seedKingshotDatabase();
  console.log("--- Seeding Complete! Refresh your site. ---");
}

runSeeders();