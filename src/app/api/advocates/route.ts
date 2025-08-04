import db from "../../../db";
import { advocates } from "../../../db/schema";
import { or, ilike } from "drizzle-orm";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const search = searchParams.get("search")?.trim();

  if (search) {
    try {
      const data = await db
        .select()
        .from(advocates)
        .where(
          or(
            ilike(advocates.firstName, `%${search}%`),
            ilike(advocates.lastName, `%${search}%`),
            ilike(advocates.city, `%${search}%`),
            ilike(advocates.degree, `%${search}%`),
            ilike(advocates.yearsOfExperience.toString(), `%${search}%`)
          )
        );
      return Response.json({ data });
    } catch (error) {
      console.error("Database search error:", error);
      return Response.json({ error: "Search failed" }, { status: 500 });
    }
  } else {
    // If there is no search term, just return the first 10 advocates
    try {
      const data = await db.select().from(advocates).limit(10);
      return Response.json({ data });
    } catch (error) {
      console.error("Database fetch error:", error);
      return Response.json(
        { error: "Failed to fetch advocates" },
        { status: 500 }
      );
    }
  }
}
