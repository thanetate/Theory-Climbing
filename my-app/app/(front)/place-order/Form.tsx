//client side rendering
"use client";
//imports from hooks and components
import CheckoutSteps from "@/components/CheckoutSteps";
import useCartService from "@/lib/hooks/useCartStore";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import useSWRMutation from "swr/mutation";
import Image from "next/image";

//for displaying the payment form
const Form = () => {
  //accessing the router for navigation
  const router = useRouter();
  //destructor
  const {
    paymentMethod,
    shippingAddress,
    items,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    clear,
  } = useCartService();

  //for placing the order
  const { trigger: placeOrder, isMutating: isPlacing } = useSWRMutation(
    `/api/orders/mine`,
    async (url) => {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          paymentMethod,
          shippingAddress,
          items,
          itemsPrice,
          taxPrice,
          shippingPrice,
          totalPrice,
        }),
      });
      //parsing json response
      const data = await res.json();
      if (res.ok) {
        clear();
        toast.success("Order placed successfully");
        return router.push(`/order/${data.order._id}`);
      } else {
        toast.error(data.message);
      }
    }
  );
  // useEffect hook to ensure a payment method is selected and there are items in the cart
  useEffect(() => {
    if (!paymentMethod) {
      return router.push("/payment");
    }
    if (items.length === 0) {
      return router.push("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paymentMethod, router]);

  //for setting the component to mounted after the initial rendering
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  //used to handle sever side rendering issues
  if (!mounted) return <></>;

  return (
    <div>
      <CheckoutSteps current={4} />
      <div className="page-container">
        <div className="place-order-container">
          <div className="">
            <div className="">
              <div className="pcard-body">
                <h2 className="p-title">Shipping Address</h2>
                <p className="p">{shippingAddress.fullName}</p>
                <p className="p">
                  {shippingAddress.address}, {shippingAddress.city},{" "}
                  {shippingAddress.postalCode}, {shippingAddress.country}{" "}
                </p>
                <div>
                  <Link className="p-btn" href="/shipping">
                    Edit
                  </Link>
                </div>
              </div>
            </div>

            <div className="payment-method-container">
              <div className="pmcard-body">
                <h2 className="pm-title">Payment Method</h2>
                <p className="p">{paymentMethod}</p>
                <div>
                  <Link className="p-btn" href="/payment">
                    Edit
                  </Link>
                </div>
              </div>
            </div>

            <div className="cartp-container">
              <div className="cart-body">
                <h2 className="cart-title">Items</h2>
                <table className="cart-table">
                  <tbody className="items-con">
                    {items.map((item) => (
                      <tr key={item.slug}>
                        <td className="items-con2">
                          <Link
                            href={`/product/${item.slug}`}
                            className="item-title-link"
                          >
                            <Image
                              src={item.image}
                              alt={item.name}
                              width={50}
                              height={50}
                            ></Image>
                            <span className="product-desc">
                              {item.name}({item.color} {item.size})
                            </span>
                          </Link>
                        </td>
                        <td>
                          <span className="ipq">{item.qty}</span>
                        </td>
                        <td className="ipp">${item.price}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div>
                  <Link className="p-btn" href="/cart">
                    Edit
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div>
            <div className="summary-container">
              <div className="summary-body">
                <h2 className="s-title">Order Summary</h2>
                <ul className="s-list">
                  <li>
                    <div className="s-items">
                      <div>Items:</div>
                      <div>${itemsPrice}</div>
                    </div>
                  </li>
                  <li>
                    <div className="s-tax">
                      <div>Tax:</div>
                      <div>${taxPrice}</div>
                    </div>
                  </li>
                  <li>
                    <div className="s-shipping">
                      <div>Shipping:</div>
                      <div>${shippingPrice}</div>
                    </div>
                  </li>
                  <li>
                    <div className="s-total">
                      <div>Total:</div>
                      <div>${totalPrice}</div>
                    </div>
                  </li>

                  <li>
                    <button
                      onClick={() => placeOrder()}
                      disabled={isPlacing}
                      className="p-btn"
                    >
                      {isPlacing && <span className="p-btn"></span>}
                      Place Order
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Form;
