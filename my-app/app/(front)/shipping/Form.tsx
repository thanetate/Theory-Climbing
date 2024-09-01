//client side rendering
"use client";
//imports from hooks and components
import CheckoutSteps from "@/components/CheckoutSteps";
import useCartService from "@/lib/hooks/useCartStore";
import { ShippingAddress } from "@/lib/models/OrderModel";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { SubmitHandler, ValidationRule, useForm } from "react-hook-form";

//for displaying the shipping form
const Form = () => {
  //accessing the router for navigation
  const router = useRouter();
  //accessing the saveShippingAddress and shippingAddress from the useCartService
  const { saveShippingAddrress, shippingAddress } = useCartService();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<ShippingAddress>({
    defaultValues: {
      fullName: "",
      address: "",
      city: "",
      postalCode: "",
      country: "",
    },
  });

  //populate the form with the shipping address
  useEffect(() => {
    setValue("fullName", shippingAddress.fullName);
    setValue("address", shippingAddress.address);
    setValue("city", shippingAddress.city);
    setValue("postalCode", shippingAddress.postalCode);
    setValue("country", shippingAddress.country);
  }, [setValue, shippingAddress]);

  //handling the form submission
  const formSubmit: SubmitHandler<ShippingAddress> = async (form) => {
    saveShippingAddrress(form);
    router.push("/payment");
  };

  //reusabel form input component
  const FormInput = ({
    id,
    name,
    required,
    pattern,
  }: {
    id: keyof ShippingAddress;
    name: string;
    required?: boolean;
    pattern?: ValidationRule<RegExp>;
  }) => (
    <div className="sform-group">
      <label className="sform-label" htmlFor={id}>
        {name}
      </label>
      <input
        type="text"
        id={id}
        {...register(id, {
          required: required && `${name} is required`,
          pattern,
        })}
        className="sform-input"
      />
      {errors[id]?.message && (
        <div className="sform-error">{errors[id]?.message}</div>
      )}
    </div>
  );

  return (
    <>
      <CheckoutSteps current={1} />
      <div className="scontainer">
        <div className="sform-card">
          <h1 className="sform-title">Shipping Address</h1>
          <form onSubmit={handleSubmit(formSubmit)}>
            <FormInput name="Full Name" id="fullName" required />
            <FormInput name="Address" id="address" required />
            <FormInput name="City" id="city" required />
            <FormInput name="Postal Code" id="postalCode" required />
            <FormInput name="Country" id="country" required />
            <button
              type="submit"
              disabled={isSubmitting}
              className="sform-button"
            >
              {isSubmitting && <span className="spinner"></span>}
              Next
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Form;
