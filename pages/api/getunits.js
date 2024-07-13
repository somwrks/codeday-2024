import { sql } from "@vercel/postgres";
import { getAuth } from "@clerk/nextjs/server";

export default async function handler(req, res) {
  if (req.method === "GET") {
    const { userId } = await getAuth(req);

    try {
      const result = await sql`
        SELECT *
        FROM units
        WHERE userid = ${userId}
      `;

      if (result.rows.length === 0) {
        return res.status(200).json({ news: [] });
      }

      return res.status(200).json({ units: result.rows[0] });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Failed to retrieve news from database" });
    }
  } else {
    return res.status(405).json({ error: "Method not allowed" });
  }
}