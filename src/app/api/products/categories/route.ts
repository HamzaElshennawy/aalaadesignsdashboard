import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const categoryID = searchParams.get("categoryID");

  if (!categoryID) {
    const data = await sql`SELECT * FROM categories`;

    return NextResponse.json(data.rows);
  }
  const data = await sql`SELECT * FROM categories WHERE id = ${categoryID}`;

  return NextResponse.json(data.rows[0]);
}
