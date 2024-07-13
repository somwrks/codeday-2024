import { sql } from "@vercel/postgres";

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const result = await sql`
        SELECT *
        FROM news
      `;

      if (result.rows.length === 0) {
        return res.status(200).json({ news: [] });
      }

      return res.status(200).json({ news: result.rows });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Failed to retrieve news from database" });
    }
  } else {
    return res.status(405).json({ error: "Method not allowed" });
  }
}