"use client";

// import { db, storage } from "../../lib/firebase-config";
import React from "react";
// import { collection, onSnapshot, query } from "firebase/firestore";
// import { ref, getDownloadURL } from "firebase/storage";

export default function Best() {
  //   const [productsList, setProductList] = useState([]);

  //   useEffect(() => {
  //     const q = query(collection(db, "products"));

  //     const unsubscribe = onSnapshot(q, (snapshot) => {
  //       const products = [];

  //       snapshot.forEach((doc) => {
  //         const data = doc.data();
  //         const product = {
  //           id: doc.id,
  //           ...data,
  //         };

  //         const imageRef = ref(storage, `product_images/${data.Image}`);

  //         getDownloadURL(imageRef)
  //           .then((url) => {
  //             product.imageUrl = url;
  //             products.push(product);
  //             setProductList(products);
  //           })
  //           .catch((error) => {
  //             console.log(error);
  //           });
  //       });
  //     });

  //     return () => unsubscribe();
  //   }, []);

  return (
    <div className="py-12 bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-center text-4xl py-5">Best Sellers</h1>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          <div className="bg-gray-300 p-5 rounded-lg items-center text-center">
            <img
              className="mx-auto"
              src="https://firebasestorage.googleapis.com/v0/b/shop-now-e0870.appspot.com/o/product_images%2F4hPlyZ6nwWI64uRiILQl?alt=media&token=a43ce90e-7765-4273-8157-a78bac39d056"
              alt="Semaglutide"
            />
            <h3 className="text-lg font-medium text-gray-900 py-2">
              Semaglutide
            </h3>
            <p className="mt-2 text-gray-500 h-24 overflow-hidden">
              Description
            </p>
            <p className="mt-2 text-gray-500">$20</p>
            <button className="mt-4 px-4 py-2 rounded-md text-white font-semibold bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2">
              Add to cart
            </button>
          </div>
          <div className="bg-gray-300 p-5 rounded-lg items-center text-center">
            <img
              className="mx-auto"
              src="https://firebasestorage.googleapis.com/v0/b/shop-now-e0870.appspot.com/o/product_images%2F4hPlyZ6nwWI64uRiILQl?alt=media&token=a43ce90e-7765-4273-8157-a78bac39d056"
              alt="IGF-1"
            />
            <h3 className="text-lg font-medium text-gray-900 py-2">IGF-1</h3>
            <p className="mt-2 text-gray-500 h-24 overflow-hidden">
              Description
            </p>
            <p className="mt-2 text-gray-500">$20</p>
            <button className="mt-4 px-4 py-2 rounded-md text-white font-semibold bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2">
              Add to cart
            </button>
          </div>
          <div className="bg-gray-300 p-5 rounded-lg items-center text-center">
            <img
              className="mx-auto"
              src="https://firebasestorage.googleapis.com/v0/b/shop-now-e0870.appspot.com/o/product_images%2F4hPlyZ6nwWI64uRiILQl?alt=media&token=a43ce90e-7765-4273-8157-a78bac39d056"
              alt="Semaglutide"
            />
            <h3 className="text-lg font-medium text-gray-900 py-2">BPC-157</h3>
            <p className="mt-2 text-gray-500 h-24 overflow-hidden">
              Description
            </p>
            <p className="mt-2 text-gray-500">$20</p>
            <button className="mt-4 px-4 py-2 rounded-md text-white font-semibold bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2">
              Add to cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
