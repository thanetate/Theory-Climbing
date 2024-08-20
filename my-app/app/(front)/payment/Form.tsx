//client side rendering
"use client";
//imports from hooks and components
import CheckoutSteps from "@/components/CheckoutSteps";
import useCartService from "@/lib/hooks/useCartStore";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

//for displaying the payment form
const Form = () => {
  //accessing the router for navigation
  const router = useRouter();
  //accessing the savePaymentMethod, paymentMethod and shippingAddress from the useCartService
  const { savePaymentMethod, paymentMethod, shippingAddress } =
    useCartService();
  //for setting the selected payment method
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");
  //handling the form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    savePaymentMethod(selectedPaymentMethod);
    router.push("/place-order");
  };

  //for checking if the component is mounted
  useEffect(() => {
    if (!shippingAddress.address) {
      //redirects to the shipping page if address is not provided
      return router.push("/shipping");
    }
    //sets the selected payment method to PayPal
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
