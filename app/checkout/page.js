"use client";
import React, { useState, useEffect } from "react";
import InputField from "../helpers/inputField.js";
import { getCartProducts } from "../helpers/getCartProducts"; // import the new function
import { useCartContext } from "../context/cartContext.js";
import Image from "next/image";
import Link from "next/link";

export default function Checkout() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    cardName: "",
    cardNumber: "",
    expires: "",
    cvv: "",
  });

  const handleFormChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const [cartEmpty, setCartEmpty] = useState(false);
  const [productsList, setProductList] = useState([]); // initialize an empty state
  const [imagesLoaded, setImagesLoaded] = useState(false); // initialize to false
  const { items, setCart } = useCartContext();

  useEffect(() => {
    const cartItems = JSON.parse(sessionStorage.getItem("cartItems")) || [];

    // console.log(cartItems.length);
    if (cartItems.length > 0) {
      // console.log(cartItems);
      setCart(cartItems);
    } else {
      setCartEmpty(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const cartItems = JSON.parse(sessionStorage.getItem("cartItems")) || [];
    if (items.length === 0 && cartItems.length === 0) {
      setCartEmpty(true);
    }
    getCartProducts(items)
      .then((products) => {
        setProductList(products);
        setImagesLoaded(true);
        sessionStorage.setItem("cartItems", JSON.stringify(items));
      })
      .catch((error) => {
        // console.log(error);
      });
  }, [items]);

  // Calculate total quantity and cost of products
  const totalQuantity = productsList.reduce(
    (total, product) => total + product.quantity,
    0
  );

  const totalPrice = productsList.reduce(
    (total, product) => total + parseFloat(product.Price) * product.quantity,
    0
  );

  return (
    <div className="bg-gray-100 py-8">
      <div className="max-w-screen-lg mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-medium mb-2">Checkout</h1>
        <h2 className="text-xl font-medium mb-4">Contact information</h2>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
            <InputField
              label="Full Name"
              name="fullName"
              value={formData.fullName}
              onChange={handleFormChange}
              required
            />
            <InputField
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleFormChange}
              required
            />
          </div>
          <h2 className="text-xl font-medium mb-4">Shipping address</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
            <InputField
              label="Address"
              name="address"
              value={formData.address}
              onChange={handleFormChange}
              required
            />
            <InputField
              label="City"
              name="city"
              value={formData.city}
              onChange={handleFormChange}
              required
            />
            <InputField
              label="State/Province"
              name="state"
              value={formData.state}
              onChange={handleFormChange}
              required
            />
            <InputField
              label="ZIP/Postal Code"
              name="zip"
              value={formData.zip}
              onChange={handleFormChange}
              required
            />
          </div>
          <h2 className="text-xl font-medium mb-4">Payment information</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
            <InputField
              label="Cardholder Name"
              name="cardName"
              value={formData.cardName}
              onChange={handleFormChange}
              required
            />
            <InputField
              label="Card Number"
              name="cardNumber"
              value={formData.cardNumber}
              onChange={handleFormChange}
              required
            />
            <InputField
              label="Expiration"
              name="expires"
              value={formData.expires}
              onChange={handleFormChange}
              placeholder="MM/YY"
              pattern="\d{2}/\d{2}"
              required
            />
            <InputField
              label="CVV"
              name="cvv"
              value={formData.cvv}
              onChange={handleFormChange}
              required
            />
          </div>

          <div className="flex flex-col gap-5 justify-around">
            {imagesLoaded ? (
              // Display products in a condensed format
              productsList.map((product) => (
                <div className="flex items-center mx-5 py-5" key={product.id}>
                  <Image
                    className="mr-5"
                    width={100}
                    height={100}
                    src={product.imageUrl}
                    alt={product.Name}
                  />
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">
                      {product.Name}
                    </h3>
                    <p className="mt-2 text-gray-500">
                      ${product.Price} x {product.quantity}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              // Display a loading indicator while images are being fetched
              <div className="py-5">Loading...</div>
            )}
          </div>
          {imagesLoaded && (
            <>
              {!cartEmpty && (
                <>
                  <p className="flex justify-end px-5 py-2">
                    Total Price: ${totalPrice}
                  </p>
                  <p className="flex justify-end px-5 py-2">
                    Total Quantity: {totalQuantity}
                  </p>
                </>
              )}
            </>
          )}

          <Link
            href={`/confirmation?cartData=${JSON.stringify(items)}`}
            className="flex py-3 px-4 bg-blue-600 text-white justify-center rounded-md hover:bg-blue-700 transition-all ease-in-out duration-200"
          >
            Place order
          </Link>
        </form>
      </div>
    </div>
  );
}
