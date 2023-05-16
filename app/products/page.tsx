"use client";
import { useState, useEffect } from "react";
import { collection, onSnapshot, query } from "firebase/firestore";
import { ref, getDownloadURL } from "firebase/storage";
import { db, storage } from "../../lib/firebase-config";
import Image from "next/image"

interface Product {
  id: string;
  Name: string;
  Description: string;
  Price: string;
  imageUrl: string;
  [key: string]: any;
}

export default function Products() {
  const [productsList, setProductList] = useState<Product[]>([]);
  const [imagesLoaded, setImagesLoaded] = useState<boolean>(false);

  useEffect(() => {
    const q = query(collection(db, "products"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const products: Product[] = [];
      let imagesToLoad = snapshot.docs.length;
      snapshot.forEach((doc) => {
        const data = doc.data() as Product;
        const product = { ...data, id: doc.id, imageUrl: "" };
        const imageRef = ref(storage, `product_images/${data.Image}`);
        getDownloadURL(imageRef)
          .then((url) => {
            product.imageUrl = url;
            products.push(product);
            imagesToLoad--;
            if (imagesToLoad === 0) {
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

  return (
    <div className="py-12 bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-center text-4xl py-5">Products</h1>
        {imagesLoaded ? (
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
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
                <p className="mt-2 text-gray-500">{product.Price}</p>
                <button className="mt-4 px-4 py-2 rounded-md text-white font-semibold bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2">
                  Add to cart
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
}