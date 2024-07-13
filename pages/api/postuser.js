import { sql } from "@vercel/postgres";
import { getAuth } from "@clerk/nextjs/server";

export default async function handler(req, res) {
  if (req.method === "POST") {
    console.log(req.body);
    const { name, email, type } = req.body;

    try {
      const { userId } = await getAuth(req);

      if (!userId) {
        return res.status(401).json({ error: "Unauthorized" });
      }

      await sql`
        CREATE TABLE IF NOT EXISTS users (
          userid TEXT PRIMARY KEY,
          email TEXT NOT NULL,
          name TEXT NOT NULL,
          type TEXT
        )
      `;

      await sql`
        INSERT INTO users (userid, email, name, type)
        VALUES (${userId}, ${email}, ${name}, ${type=="" || type==null || type==undefined ? "user":type})
        ON CONFLICT (userid) 
        DO UPDATE SET email = ${email}, name = ${name}, type = ${type=="" || type==null || type==undefined ? "user":type}
      `;
console.log("saved user ")
      return res.status(200).json({ success: true, id: userId });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Failed to store user to database." });
    }
  } else {
    return res.status(405).json({ error: "Method not allowed" });
  }
}