"use client";
import CheckoutSteps from "@/components/CheckoutSteps";
import useCartService from "@/lib/hooks/useCartStore";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Form = () => {
  const router = useRouter();
  const { savePaymentMethod, paymentMethod, shippingAddress } =
    useCartService();
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    savePaymentMethod(selectedPaymentMethod);
    router.push("/place-order");
  };

  useEffect(() => {
    if (!shippingAddress.address) {
      return router.push("/shipping");
    }
    setSelectedPaymentMethod(paymentMethod || "PayPal");
  }, [paymentMethod, router, shippingAddress.address]);

  return (
    <div className="f-container">
      <CheckoutSteps current={2} />
      <div className="payment">
        <div className="fform-card">
          <h1 className="sform-title">Payment Method</h1>
          <form onSubmit={handleSubmit}>
            {["PayPal", "Stripe", "CashOnDelivery"].map((payment) => (
              <div className="p1" key={payment}>
                <label className="p1-label">
                  <input
                    type="radio"
                    name="paymentMethod"
                    className=""
                    value={payment}
                    checked={selectedPaymentMethod === payment}
                    onChange={() => setSelectedPaymentMethod(payment)}
                  />
                  <span className="p1">{payment}</span>
                </label>
              </div>
            ))}
            <div className="pbutton-container">
              <button
                type="button"
                className="p-btn"
                onClick={() => router.back()}
              >
                Back
              </button>
              <button type="submit" className="p-btn">
                Next
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default Form;
