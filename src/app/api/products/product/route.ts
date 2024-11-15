import { NextResponse, NextRequest } from "next/server";
import { sql } from "@vercel/postgres";
import { storage } from "@/app/Dashboard/firebase";
import { deleteObject, ref } from "firebase/storage";

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
    method,
    name,
    description,
    price,
    stock,
    image_path,
    categoryid,
    material,
    subcategoryid,
  } = body;
  if (method === "add") {
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
  } else if (method === "delete") {
    const { id } = body;
    if (id === null || id === undefined) {
      return NextResponse.json(
        { error: "Invalid product id" },
        { status: 400 }
      );
    }
    const productQuery = await sql`SELECT * FROM products WHERE id = ${id}`;
    if (productQuery.rows.length === 0) {
      return NextResponse.json({
        error: "Product not found",
      });
    }

    const product: Product = productQuery.rows[0] as Product;

    //delete the product image from the firebase storage
    const imageRef = ref(storage, product.image_path);
    deleteObject(imageRef)
      .then(() => {
        console.log("Image deleted successfully");
      })
      .catch((error) => {
        return NextResponse.json({ Error: "deleting image error" });
      });

    // delete the product from the database
    await sql`DELETE FROM orderitems WHERE productid = ${id}`;
    await sql`DELETE FROM productcolor WHERE productid = ${id}`;
    await sql`DELETE FROM productsize WHERE productid = ${id}`;

    const result = await sql`DELETE FROM products WHERE id = ${id}`;
    if (result.rowCount === 0) {
      return NextResponse.json({ Error: "something went wrong" });
    }
    return NextResponse.json({ message: "Product deleted successfully" });
  } else {
    return NextResponse.json({ error: "Invalid method" }, { status: 400 });
  }
}

export async function PUT(req: NextRequest) {
  // check for the product data in the request body
  const body = await req.json();
  const {
    id,
    name,
    description,
    price,
    stock,
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

  // update the product data in the database
  const result =
    await sql`UPDATE products SET name = ${name}, description = ${description}, price = ${price}, stock = ${stock}, image_path = ${image_path}, categoryid = ${categoryid}, material = ${material}, subcategoryid = ${subcategoryid} WHERE id = ${id};`;
  if (result.rowCount === 0) {
    return NextResponse.json(
      { Error: "something went wrong" },
      { status: 400 }
    );
  }
  return NextResponse.json(
    { message: "Product updated successfully" },
    { status: 200 }
  );
}
