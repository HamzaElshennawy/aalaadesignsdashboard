import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres";
import { User } from "@/lib/utils";

export async function GET() {
  //first get the users in the database with limit 100 user per request
  let users: User[] = [];
  const usersRequest = await sql`SELECT * FROM users LIMIT 100`;
  if (usersRequest.rows === undefined) {
    return NextResponse.json({
      Error: "Error happened please try again",
      status: 500,
    });
  }

  if (usersRequest.rowCount! > 0) {
    users = usersRequest.rows as User[];
    return NextResponse.json(users);
  }
  return NextResponse.json({
    Error: "Error happened please try again",
    status: 500,
  });
}
