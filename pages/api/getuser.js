import { sql } from "@vercel/postgres";
import { getAuth } from "@clerk/nextjs/server";

export default async function handler(req, res) {
    const { userId } = await getAuth(req);

    try {
      const result = await sql`
        SELECT *
        FROM users
        WHERE userid = ${userId}
      `;

      if (result.rows.length === 0) {
        return res.status(200).json({ news: [] });
      }
console.log("get user" , result.rows[0])
      return res.status(200).json({ user: result.rows[0] });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Failed to retrieve news from database" });
    }
 
}