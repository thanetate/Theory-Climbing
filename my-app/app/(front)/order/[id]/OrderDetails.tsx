"use client";
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import { OrderItem } from "@/lib/models/OrderModel";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import toast from "react-hot-toast";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";

export default function OrderDetails({
  orderId,
  paypalClientId,
}: {
  orderId: string;
  paypalClientId: string;
}) {
  const { trigger: deliverOrder, isMutating: isDelivering } = useSWRMutation(
    `/api/orders/${orderId}`,
    async (url) => {
      const res = await fetch(`/api/admin/orders/${orderId}/deliver`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      res.ok
        ? toast.success("Order delivered successfully")
        : toast.error(data.message);
    }
  );

  const { data: session } = useSession();
  console.log(session);
  function createPayPalOrder() {
    return fetch(`/api/orders/${orderId}/create-paypal-order`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((order) => order.id);
  }

  function onApprovePayPalOrder(data: any) {
    return fetch(`/api/orders/${orderId}/capture-paypal-order`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((orderData) => {
        toast.success("Order paid successfully");
      });
  }

  const { data, error } = useSWR(`/api/orders/${orderId}`);

  if (error) return error.message;
  if (!data) return "Loading...";

  const {
    paymentMethod,
    shippingAddress,
    items,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    isDelivered,
    deliveredAt,
    isPaid,
    paidAt,
  } = data;

  return (
    <div>
      <div className="page-container">
        <div className="place-order-container">
          <h1 className="order-title">Order #{orderId}</h1>
          <div className="">
            <div className="">
              <div className="">
                <div className="pcard-body">
                  <h2 className="p-title">Shipping Address</h2>
                  <p className="p">{shippingAddress.fullName}</p>
                  <p className="p">
                    {shippingAddress.address}, {shippingAddress.city},{" "}
                    {shippingAddress.postalCode}, {shippingAddress.country}{" "}
                  </p>
                  {isDelivered ? (
                    <div className="p">Status: Delivered at {deliveredAt}</div>
                  ) : (
                    <div className="p">Status: Not Delivered</div>
                  )}
                </div>
              </div>

              <div className="payment-method-container">
                <div className="pmcard-body">
                  <h2 className="pm-title">Payment Method</h2>
                  <p className="p">{paymentMethod}</p>
                  {isPaid ? (
                    <div className="p">Status: Paid at {paidAt}</div>
                  ) : (
                    <div className="p">Status: Not Paid</div>
                  )}
                </div>
              </div>

              <div className="cartp-container">
                <div className="cart-body">
                  <h2 className="cart-title">Items</h2>
                  <table className="table">
                    <thead>
                      <tr>
                        <th className="cartp-i">Item</th>
                        <th className="cartp-q">Quantity</th>
                        <th className="cartp-p">Price</th>
                      </tr>
                    </thead>
                    <tbody>
                      {items.map((item: OrderItem) => (
                        <tr key={item.slug}>
                          <td>
                            <Link
                              href={`/product/${item.slug}`}
                              className="flex items-center"
                            >
                              <Image
                                src={item.image}
                                alt={item.name}
                                width={50}
                                height={50}
                              ></Image>
                              <span className="item-det">
                                {item.name} ({item.color} {item.size})
                              </span>
                            </Link>
                          </td>
                          <td className="i-q">{item.qty}</td>
                          <td className="i-p">${item.price}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
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

                    {!isPaid && paymentMethod === "PayPal" && (
                      <li>
                        <PayPalScriptProvider
                          options={{ clientId: paypalClientId }}
                        >
                          <PayPalButtons
                            createOrder={createPayPalOrder}
                            onApprove={onApprovePayPalOrder}
                          />
                        </PayPalScriptProvider>
                      </li>
                    )}
                    {session?.user.isAdmin && (
                      <li>
                        <button
                          className="btn w-full my-2"
                          onClick={() => deliverOrder()}
                          disabled={isDelivering}
                        >
                          {isDelivering && <span className="spinner"></span>}
                          Mark as delivered
                        </button>
                      </li>
                    )}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
