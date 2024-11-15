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

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  createdat: string;
  image_path: string;
  categoryid: number;
  material: string;
  subcategoryid: number;
}

export async function POST(req: NextRequest) {
  // check for the product data in the request body
  const body = await req.json();
  const {
    id,
    name,
    description,
    price,
    stock,
    createdat,
    image_path,
    categoryid,
    material,
    subcategoryid,
  } = body;

  if (name === null || name === undefined) {
    return NextResponse.json(
      { error: "Invalid product name" },
      { status: 400 }
    );
  }

  if (description === null || description === undefined) {
    return NextResponse.json(
      { error: "Invalid product description" },
      { status: 400 }
    );
  }

  if (price === null || price === undefined) {
    return NextResponse.json(
      { error: "Invalid product price" },
      { status: 400 }
    );
  }

  if (stock === null || stock === undefined) {
    return NextResponse.json(
      { error: "Invalid product stock" },
      { status: 400 }
    );
  }

  if (image_path === null || image_path === undefined) {
    return NextResponse.json(
      { error: "Invalid product image_path" },
      { status: 400 }
    );
  }

  if (categoryid === null || categoryid === undefined) {
    return NextResponse.json(
      { error: "Invalid product categoryid" },
      { status: 400 }
    );
  }

  if (material === null || material === undefined) {
    return NextResponse.json(
      { error: "Invalid product material" },
      { status: 400 }
    );
  }
  if (subcategoryid === null || subcategoryid === undefined) {
    return NextResponse.json(
      {
        error: "Invalid product subcategoryid",
      },
      { status: 400 }
    );
  }

  // insert the product data into the database
  const result =
    await sql`INSERT INTO products (name, description, price, stock, createdat, image_path, categoryid, material, subcategoryid) VALUES (${name}, ${description}, ${price}, ${stock}, NOW(), ${image_path}, ${categoryid}, ${material}, ${subcategoryid}) RETURNING id;`;
  if (result.rows.length === 0) {
    return NextResponse.json({ Error: "something wentwrong" });
  }
  return NextResponse.json({ id: result.rows[0].id });
}
