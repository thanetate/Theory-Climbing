//excecuted on the client side rather than server side
"use client";

//imports from hooks and components
import useCartService from "@/lib/hooks/useCartStore";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

//for displaying the cart details
export default function CartDetails() {
  //accessing the router for navigation
  const router = useRouter();
  //accessing the items, itemsPrice, decrease and increase from the useCartService
  const { items, itemsPrice, decrease, increase } = useCartService();

  //for checking if the component is mounted
  const [mounted, setMounted] = useState(false);

  //for setting the component to mounted after the initial rendering
  useEffect(() => {
    setMounted(true);
  }, []);

  //used to handle sever side rendering issues
  if (!mounted) return <></>;

  return (
    <div className="cart-">
      <h1 className="page-title">cart</h1>

      {items.length === 0 ? (
        <div className="empty-cart-message">
          Cart is empty.{" "}
          <Link href="/#products" className="shop-link">
            Go shopping
          </Link>
        </div>
      ) : (
        <div className="cart-container">
          <div className="cart-items">
            <table className="cart-table">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Quantity</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item) => (
                  <tr key={item.slug}>
                    <td>
                      <Link
                        href={`/product/${item.slug}`}
                        className="item-link"
                      >
                        <Image
                          src={item.image}
                          alt={item.name}
                          width={50}
                          height={50}
                          className="item-image"
                        />
                        <span className="item-name">{item.name}</span>
                      </Link>
                    </td>
                    <td className="quantity-controls">
                      <button
                        className="quantity-btn"
                        type="button"
                        onClick={() => decrease(item)}
                      >
                        -
                      </button>
                      <span className="quantity-text">{item.qty}</span>
                      <button
                        className="quantity-btn"
                        type="button"
                        onClick={() => increase(item)}
                      >
                        +
                      </button>
                    </td>
                    <td className="item-price">${item.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="cart-summary">
            <div className="summary-card">
              <div className="summary-content">
                <ul className="summary-list">
                  <li className="summary-item">
                    <div className="summary-text">
                      Subtotal ({items.reduce((a, c) => a + c.qty, 0)}) : $
                      {itemsPrice}
                    </div>
                  </li>
                  <li className="summary-item">
                    <button
                      onClick={() => router.push("/shipping")}
                      className="checkout-btn"
                    >
                      Proceed to Checkout
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
