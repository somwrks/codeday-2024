import { sql } from "@vercel/postgres";
import { getAuth } from "@clerk/nextjs/server";
import dayjs from 'dayjs';
import crypto from 'crypto';

function generateUniqueId() {
  return crypto.randomUUID();
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  console.log(req.body);
  const { location, description, title } = req.body;
  const currentTime = dayjs().format('HH:mm:ss');
  const currentDate = dayjs().format('YYYY-MM-DD');

  try {
    const { userId } = await getAuth(req);

    if (!userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const newsId = generateUniqueId();
    const defaultImage = "/vercel.svg"; // Set a default image URL if needed

    // Ensure the news table exists
    await sql`
      CREATE TABLE IF NOT EXISTS news (
        newsid TEXT PRIMARY KEY,
        userid TEXT NOT NULL,
        location JSONB,
        time TIME,
        image TEXT,
        date DATE,
        description TEXT,
        title TEXT
      )
    `;

    // Insert the new news entry
    await sql`
      INSERT INTO news (newsid, userid, location, time, image, date, description, title)
      VALUES (${newsId}, ${userId}, ${JSON.stringify(location)}, ${currentTime}, ${defaultImage}, ${currentDate}, ${description}, ${title})
    `;

    return res.status(200).json({ success: true, id: newsId });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to store news to database." });
  }
}