import Header from "../../components/header/Menu";
import Footer from "@/components/footer/footer";
import NewsletterForm from "@/components/newsletter/Newsletter";
import data from "@/lib/data";
import ProductItem from "../../components/products/ProductItem";
import { Metadata } from "next";
import productService from "@/lib/services/productService";
import { convertDocToObj } from "@/lib/utils";

export const metadata: Metadata = {
  title: process.env.NEXT_PUBLIC_APP_NAME || "Theory",
  description:
    process.env.NEXT_PUBLIC_APP_DESC ||
    "Nextjs, Server components, Next auth, zustand",
};

export default function Home() {
  return (
    <>
      <section className="announcments">
        <div className="news">
          <p>PRODUCTS COMING SOON</p>
        </div>
      </section>

      <section className="picture-container">
        <img src="./Images/main.jpeg" alt="main picture" />
      </section>

      <section className="message" id="products">
        <h3>theory</h3>
        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Iusto, amet
          necessitatibus. Natus eos aspernatur earum dolorum suscipit dolorem,
          exercitationem excepturi temporibus assumenda? Nisi delectus
          repudiandae sapiente aspernatur. Deleniti, iste nesciunt.
        </p>
      </section>

      <div className="product-section">
        <div className="product-container">
          <div className="product-list">
            {data.products.map((product) => (
              <ProductItem
                key={product.slug}
                product={convertDocToObj(product)}
              />
            ))}
          </div>
        </div>
      </div>

      <NewsletterForm />
      <Footer />
    </>
  );
}
