import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const limit = 30; // Number of products per page
  const page = parseInt(searchParams.get("page") || "1", 10); // Get the page number, default to 1
  const category = searchParams.get("category"); // Get the category ID
  const offset = (page - 1) * limit; // Calculate the offset based on the page number

  try {
    if (category) {
      // Fetch the total number of products in the category
      const totalCountResult = await sql`
        SELECT COUNT(*) FROM products
        WHERE categoryid = ${category};
      `;
      const totalProducts = parseInt(totalCountResult.rows[0].count, 10);

      // Fetch the products for the current page in the category
      const { rows } = await sql`
        SELECT * FROM products
        WHERE categoryid = ${category}
        ORDER BY createdat
        OFFSET ${offset}
        LIMIT ${limit};
      `;

      // Calculate total pages and next page
      const totalPages = Math.ceil(totalProducts / limit);
      const nextPage = page < totalPages ? page + 1 : null;

      return NextResponse.json({
        products: rows,
        currentPage: page,
        totalProducts: totalProducts,
        totalPages: totalPages,
        nextPage: nextPage,
        limit: limit,
      });
    } else {
      // Fetch the total number of products
      const totalCountResult = await sql`SELECT COUNT(*) FROM products`;
      const totalProducts = parseInt(totalCountResult.rows[0].count, 10);

      // Fetch the products for the current page
      const { rows } = await sql`
      SELECT * FROM products
      ORDER BY createdat
      OFFSET ${offset}
      LIMIT ${limit};
    `;

      // Calculate total pages and next page
      const totalPages = Math.ceil(totalProducts / limit);
      const nextPage = page < totalPages ? page + 1 : null;

      return NextResponse.json({
        products: rows,
        currentPage: page,
        totalProducts: totalProducts,
        totalPages: totalPages,
        nextPage: nextPage,
        limit: limit,
      });
    }
  } catch (error) {
    return NextResponse.json(
      { error: "Error fetching products" },
      { status: 500 }
    );
  }
}
