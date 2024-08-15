"use client";

import useCartService from "@/lib/hooks/useCartStore";
import { OrderItem } from "@/lib/models/OrderModel";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function AddToCart({ item }: { item: OrderItem }) {
    const router = useRouter();
    const { items, increase, decrease } = useCartService();
    const [existItem, setExistItem] = useState<OrderItem | undefined>();

    useEffect(() => {
        setExistItem(items.find((x) => x.slug === item.slug));
    }, [item, items]);

    const addToCartHandler = () => {
        increase(item);
    };

    return existItem ? (
        <div>
            <button
                type="button"
                onClick={() => decrease(existItem)}
            >
                -
            </button>
            <span className="prospan">{existItem.qty}</span>
            <button
                type="button"
                onClick={() => increase(existItem)}
            >
                +
            </button>
        </div>
    ) : (
        <button
            onClick={addToCartHandler}
            className="cart-btn"
        >
            Add to Cart
        </button>
    );
}
