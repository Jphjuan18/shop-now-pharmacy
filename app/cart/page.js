"use client";
import React, { useState, useEffect } from "react";

import { getCartProducts } from "../helpers/getCartProducts"; // import the new function
import Image from "next/image";
import Link from "next/link";
import { useCartContext } from "../context/dataContext";

export default function Cart() {
  const [cartEmpty, setCartEmpty] = useState(false);
  const [productsList, setProductList] = useState([]); // initialize an empty state
  const [imagesLoaded, setImagesLoaded] = useState(false); // initialize to false
  const { items, removeItem, incrementQuantity, decrementQuantity, setCart } =
    useCartContext();

  useEffect(() => {
    const cartItems = JSON.parse(sessionStorage.getItem("cartItems")) || [];
    // console.log(cartItems);
    // console.log(cartItems.length);
    if (cartItems.length > 0) {
      // console.log(cartItems);
      setCart(cartItems);
    } else {
      setCartEmpty(true);
    }
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

  const removeFromCart = (productId) => {
    const currentItems = JSON.parse(sessionStorage.getItem("cartItems")) || [];
    const updatedItems = currentItems.filter((item) => item.id !== productId);
    sessionStorage.setItem("cartItems", JSON.stringify(updatedItems));
    removeItem(productId);
  };

  const increaseQuantity = (productId) => {
    incrementQuantity(productId);
  };

  const decreaseQuantity = (productId) => {
    decrementQuantity(productId);
  };

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
    <div className="container mx-auto my-10">
      <h1 className="text-2xl text-gray-600 font-semibold mb-4 px-2 justify-center">
        Shopping Cart
      </h1>
      {imagesLoaded && (
        <>
          {!cartEmpty && (
            <>
              <p className="flex justify-center lg:justify-end px-5 py-2">
                Total Price: ${totalPrice}
              </p>
              <p className="flex justify-center lg:justify-end px-5 py-2">
                Total Quantity: {totalQuantity}
              </p>
            </>
          )}
        </>
      )}
      {cartEmpty ? (
        <div className="text-center h-60">
          <p className="py-5">Your cart is empty.</p>
          <Link
            href="/products"
            className="my-4 px-4 py-2 rounded-md text-white font-semibold bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2"
          >
            Browse Products
          </Link>
        </div>
      ) : (
        <div className="flex flex-col gap-5 justify-around">
          {imagesLoaded ? (
            // Map over the fetched products and display them
            productsList.map((product) => (
              <div
                className="bg-gray-300 p-5 rounded-lg flex flex-col lg:flex-row justify-between items-center mx-5"
                key={product.id}
              >
                <Image
                  className=""
                  width={100}
                  height={100}
                  src={product.imageUrl}
                  alt={product.Name}
                />
                <h3 className="text-lg font-medium text-gray-900">
                  {product.Name}
                </h3>
                <p className="mt-2 text-gray-500">${product.Price}</p>
                <div className="flex flex-col justify-between h-full ml-4"></div>
                <div className="flex flex-col my-4 text-center">
                  <p className="py-2">Quantity: {product.quantity}</p>
                  <div>
                    <button
                      onClick={() => decreaseQuantity(product.id)}
                      className="px-4 py-2 rounded-md text-white font-semibold bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2"
                    >
                      -
                    </button>
                    <span className="mx-2 py-2 text-center"></span>
                    <button
                      onClick={() => increaseQuantity(product.id)}
                      className="px-4 py-2 rounded-md text-white font-semibold bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2"
                    >
                      +
                    </button>
                  </div>
                </div>
                <button
                  onClick={() => removeFromCart(product.id)}
                  className="mt-2 px-4 mx-4 py-2 rounded-md text-white font-semibold bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2"
                >
                  Remove from Cart
                </button>
              </div>
            ))
          ) : (
            // Display a loading indicator while images are being fetched
            <div>Loading...</div>
          )}
        </div>
      )}
      <>
        <div className="w-full flex justify-center sm:justify-end px-5 mr-5 pt-5">
          <Link
            href="/checkout"
            className="my-4 px-4 py-2 rounded-md text-white font-semibold bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2"
          >
            Proceed to Checkout
          </Link>
        </div>
      </>
    </div>
  );
}
