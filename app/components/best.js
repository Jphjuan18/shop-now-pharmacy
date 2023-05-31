"use client";

import React, { useState, useEffect } from "react";
import {
  collection,
  onSnapshot,
  query,
  where,
  orderBy,
} from "firebase/firestore";
import { ref, getDownloadURL } from "firebase/storage";
import { db, storage } from "../../lib/firebase-config";
import Image from "next/image";
import { useCartContext } from "../context/dataContext";

export default function Best() {
  const [productsList, setProductList] = useState([]);
  const [imagesLoaded, setImagesLoaded] = useState(false);

  const { items, addItem, isProductInCart, setCart } = useCartContext();

  const addToCart = (product) => {
    addItem(product);
  };

  useEffect(() => {
    const cartItems = JSON.parse(sessionStorage.getItem("cartItems")) || [];
    if (cartItems.length > 0) {
      setCart(cartItems);
    }

    const q = query(
      collection(db, "products"),
      where("isBestSeller", "==", true),
      orderBy("Name")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const products = [];
      let imagesToLoad = snapshot.docs.length;
      snapshot.forEach((doc) => {
        const data = doc.data();
        const product = { ...data, id: doc.id, imageUrl: "" };
        const imageRef = ref(storage, `product_images/${data.Image}`);
        getDownloadURL(imageRef)
          .then((url) => {
            product.imageUrl = url;
            products.push(product);
            imagesToLoad--;
            if (imagesToLoad === 0) {
              // sort the products array alphabetically by name
              products.sort((a, b) => a.Name.localeCompare(b.Name));
              setProductList(products);
              setImagesLoaded(true);
            }
          })
          .catch((error) => {
            console.log(error.message);
          });
      });
    });
    return unsubscribe;
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
              {productsList.map((product) => (
                <div
                  className="bg-gray-300 p-5 rounded-lg items-center text-center"
                  key={product.id}
                >
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
                  <button
                    onClick={() => addToCart(product.id)}
                    className={`mt-4 px-4 py-2 rounded-md text-white font-semibold ${
                      isProductInCart(product.id)
                        ? "bg-green-600"
                        : "bg-blue-600 hover:bg-blue-700"
                    } focus:outline-none focus:ring-2 ${
                      isProductInCart(product.id)
                        ? "focus:ring-green-600"
                        : "focus:ring-blue-600"
                    } focus:ring-offset-2`}
                    disabled={isProductInCart(product.id)}
                  >
                    {isProductInCart(product.id) ? "Added" : "Add to Cart"}
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </div>
    </>
  );
}
