import { sql } from "@vercel/postgres";
import { getAuth } from "@clerk/nextjs/server";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { userId } = req.body;
console.log(userId)
    try {

      if (!userId) {
        return res.status(401).json({ error: "Unauthorized" });
      }

      await sql`
        CREATE TABLE IF NOT EXISTS units (
          userid TEXT PRIMARY KEY,
          status TEXT
        )
      `;

      await sql`
        INSERT INTO units (userid, status)
        VALUES (${userId}, 1)
        ON CONFLICT (userid) 
        DO UPDATE SET userid = ${userId}, status = 1
      `;
      await sql`
        UPDATE news
  SET status = 1
  WHERE userid = ${userId};
      `;

      return res.status(200).json({ success: true, id: userId });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Failed to store user to database." });
    }
  } else {
    return res.status(405).json({ error: "Method not allowed" });
  }
}