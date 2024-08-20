//client side rendering
"use client";

//imports from hooks and components
import { Order } from "@/lib/models/OrderModel";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import useSWR from "swr";

//for displaying the order history
export default function MyOrders() {
  //router for navigation
  const router = useRouter();
  //fetching the orders using API endpoints
  const { data: orders, error } = useSWR(`/api/orders/mine`);

  //for checking if the component is mounted
  const [mounted, setMounted] = useState(false);
  //for setting the component to mounted after the initial rendering
  useEffect(() => {
    setMounted(true);
  }, []);

  //error handling
  if (!mounted) return <></>;
  if (error) return "An error has occurred.";
  if (!orders) return "Loading...";

  return (
    <div className="overflow-x-auto">
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>DATE</th>
            <th>TOTAL</th>
            <th>PAID</th>
            <th>DELIVERED</th>
            <th>ACTION</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order: Order) => (
            <tr key={order._id}>
              <td>{order._id.substring(20, 24)}</td>
              <td>{order.createdAt.substring(0, 10)}</td>
              <td>${order.totalPrice}</td>
              <td>
                {order.isPaid && order.paidAt
                  ? `${order.paidAt.substring(0, 10)}`
                  : "not paid"}
              </td>
              <td>
                {order.isDelivered && order.deliveredAt
                  ? `${order.deliveredAt.substring(0, 10)}`
                  : "not delivered"}
              </td>
              <td>
                <Link href={`/order/${order._id}`} passHref>
                  Details
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
