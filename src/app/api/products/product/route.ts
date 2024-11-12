import { NextResponse, NextRequest } from "next/server";
import { sql } from "@vercel/postgres";

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const searchParams = new URLSearchParams(url.searchParams);
  const id = searchParams.get("id");
  const result = await sql`SELECT
    p.id AS product_id,
    p.name AS product_name,
    p.description,
    p.price,
    p.stock,
    p.createdat,
    p.image_path,
	p.categoryid,
	material,
	subcategoryid,
    JSON_AGG(JSON_BUILD_OBJECT('color', pc.name, 'sizes', (SELECT ARRAY_AGG(DISTINCT ps.size) FROM productsize ps WHERE ps.productid = pc.productid AND pc.productid = p.id))) AS colors_and_sizes
    FROM
        products p
    LEFT JOIN
        productcolor pc ON p.id = pc.productid
    WHERE
        p.id = ${id}
    GROUP BY
        p.id, p.name, p.description, p.price, p.stock, p.createdat, p.image_path;`;
  // also return related products depending on the product category
  const relatedProducts =
    await sql`SELECT * FROM products WHERE categoryid = ${result.rows[0].categoryid} ORDER BY RANDOM() LIMIT 3`;

  //console.log(result.rows);

  return NextResponse.json({
    product: result.rows[0],
    relatedProducts: relatedProducts.rows,
  });
}
