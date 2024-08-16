import data from "@/lib/data";
import Link from "next/link";
import Image from "next/image";
import AddToCart from "@/components/products/AddToCart";
import productService from "@/lib/services/productService";
import { convertDocToObj } from "@/lib/utils";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  const product = await productService.getBySlug(params.slug);
  if (!product) {
    return { title: "Product Not Found" };
  }
  return {
    title: product.name,
    description: product.description,
  };
}

export default async function ProductDetails({
  params,
}: {
  params: { slug: string };
}) {
  const product = await productService.getBySlug(params.slug);
  if (!product) {
    return { title: "Product Not Found" };
  }
  return (
    <>
      <div className="product-page">
        <div className="product-img">
          <Image
            src={product.image}
            alt={product.name}
            width={640}
            height={640}
            sizes="100vw"
            style={{ width: "100%", height: "auto%" }}
          ></Image>
        </div>
        <div>
          <ul>
            <li>
              <h1 className="name">{product.name}</h1>
            </li>
            <li>
              <div className="description">
                Description: {product.description}
              </div>
            </li>
            <li>
              <div className="price">Price: ${product.price}</div>
            </li>
            <li>
              <div className="status">
                Status: {product.countInStock > 0 ? "In Stock" : "Out of Stock"}
              </div>
            </li>
            <div>
              {/*Add to Cart Button*/}
              {product.countInStock !== 0 && (
                <div className="addtocart">
                  <AddToCart
                    item={{
                      ...convertDocToObj(product),
                      qty: 0,
                      color: "",
                      size: "",
                    }}
                  />
                </div>
              )}
            </div>
          </ul>
          <div className="backtoproduct">
            <Link href="/">Back to products</Link>
          </div>
        </div>
      </div>
    </>
  );
}
