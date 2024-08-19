import React from "react";
import { Product } from "@/lib/models/ProductModel";
import Link from "next/link";
import Image from "next/image";

export default function ProductItem({ product }: { product: Product }) {
  return (
    <div className="">
      <figure>
        <Link href={`/product/${product.slug}`}>
          <Image
            src={product.image}
            alt={product.name}
            width={300}
            height={300}
          />
        </Link>
      </figure>
      <div className="product-desc">
        <Link href={`/product/${product.slug}`}>
          <h2 className="product-name">Coming Soon</h2>
        </Link>
        <p className="product-brand">{product.brand}</p>
        <div className="product-price">$1</div>
      </div>
    </div>
  );
}
