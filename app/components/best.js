"use client";
import React, { useEffect } from "react";
import Image from "next/image";
import { useCartContext } from "../context/cartContext";
import Link from "next/link";
import { useProductContext } from "../context/productsContext";
import AddToCartButton from "../components/AddToCartButton";
import Loading from "./loading";

export default function Best() {
  const { items, setCart } = useCartContext();
  const { bestProductList, imagesLoaded } = useProductContext();

  useEffect(() => {
    const cartItems = JSON.parse(sessionStorage.getItem("cartItems")) || [];
    if (cartItems.length > 0) {
      setCart(cartItems);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    sessionStorage.setItem("cartItems", JSON.stringify(items));
  }, [items]);

  return (
    <>
      {" "}
      <div className="py-6 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-center text-4xl py-5">Best Sellers</h1>
          {imagesLoaded ? (
            <div className="grid grid-cols-2 gap-5 md:grid-cols-2 lg:grid-cols-3">
              {bestProductList.map((product) => (
                <div
                  className="bg-gray-300 p-5 rounded-lg items-center text-center"
                  key={product.id}
                >
                  <Link href={`/products/${product.id}`}>
                    <Image
                      className="mx-auto"
                      width={300}
                      height={300}
                      src={product.imageUrl}
                      alt={product.Name}
                    />
                    <h3 className="text-lg font-medium text-gray-900 py-2">
                      {product.Name}
                    </h3>
                    <p className="mt-2 text-gray-500 h-24 overflow-hidden">
                      {product.Description}
                    </p>
                    <p className="mt-2 text-gray-500">${product.Price}</p>
                  </Link>
                  <AddToCartButton productId={product.id} />
                </div>
              ))}
            </div>
          ) : (
            <Loading />
          )}
        </div>
      </div>
    </>
  );
}
