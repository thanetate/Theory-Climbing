//server side rendering
//imports from hooks and components
import Header from "../../components/header/Menu";
import Footer from "@/components/footer/footer";
import NewsletterForm from "@/components/newsletter/Newsletter";
import data from "@/lib/data";
import ProductItem from "../../components/products/ProductItem";
import { Metadata } from "next";
import productService from "@/lib/services/productService";
import { convertDocToObj } from "@/lib/utils";
import { Montserrat } from "next/font/google";
import Image from "next/image"; // Import Image component

const bungee = Montserrat({
  subsets: ["latin"],
  weight: ["400"],
});

export const metadata: Metadata = {
  title: process.env.NEXT_PUBLIC_APP_NAME || "Theory",
  description:
    process.env.NEXT_PUBLIC_APP_DESC ||
    "Nextjs, Server components, Next auth, zustand",
};

export default function Home() {
  return (
    <main className={bungee.className}>
      <section className="announcments">
        <div className="news">
          <p>PRODUCTS COMING SOON</p>
        </div>
      </section>

      <ul className="list">
        <li className="item">
          <div className="content">
            <Image
              src="/Images/main.jpeg"
              alt="main picture"
              layout="responsive"
              width={1200}
              height={800}
            />
          </div>
        </li>
        <li className="item">
          <div className="content">
            <Image
              src="/Images/main2.jpeg"
              layout="responsive"
              alt="main picture"
              width={1200}
              height={800}
            />
          </div>
        </li>
      </ul>

      <section className="message" id="about">
        <h3>theory</h3>
        <p>
          Theory Climbing merges premium quality with modern style for the
          discerning climber. Our collection is crafted from high grade
          materials, ensuring every piece is as durable as it is comfortable.
          Designed with a keen eye for detail, our clothing not only performs on
          the rock but also looks great wherever your adventures take you.
        </p>
      </section>

      <section>
        <div className="product-section" id="products">
          <div className="product-container">
            <div className="product-list">
              <div className="product-card">
                <h1>Products Coming Soon</h1>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/*}
      <div className="product-section" id="products">
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
    */}
      {/*<NewsletterForm />*/}
      <Footer />
    </main>
  );
}
