import Link from "next/link";
import Image from "next/image";
import Best from "../../components/best";
import { collection, query, where, getDocs } from "firebase/firestore";
import { ref, getDownloadURL } from "firebase/storage";
import { db, storage } from "../../../lib/firebase-config";

import AddToCartButton from "../../components/AddToCartButton";

async function getProductDetails(productId) {
  const q = query(collection(db, "products"), where("id", "==", productId));
  const querySnapshot = await getDocs(q);

  const products = [];
  const promises = [];

  querySnapshot.forEach((doc) => {
    const data = doc.data();
    const product = { ...data };
    const imageRef = ref(storage, `product_images/${data.Image}`);
    const promise = getDownloadURL(imageRef).then((url) => {
      product.imageUrl = url;
      return product;
    });
    promises.push(promise);
  });

  const resolvedPromises = await Promise.all(promises);
  products.push(...resolvedPromises);
  console.log(products[0]);

  return products[0];
}

export default async function Product({ params }) {
  console.log(params.id);

  const { id, Name, Price, Description, imageUrl } = await getProductDetails(
    params.id
  );

  if (!id) {
    return <div className="flex text-3xl">Loading...</div>;
  }

  return (
    <>
      <div className="py-5">
        <Link
          href="/products"
          className="py-2 px-4 mx-2 bg-blue-600 text-white justify-center rounded-md hover:bg-blue-700 transition-all ease-in-out duration-200"
        >
          Back to Products
        </Link>
      </div>{" "}
      <div className="py-12">
        <div
          className=" p-5 rounded-lg items-center text-center grid grid-cols-1 md:grid-cols-3"
          key={id}
        >
          <div>
            <Image
              className="mx-auto"
              width={300}
              height={300}
              src={imageUrl}
              alt={Name}
            />
          </div>
          <div className="bg-gray-300 md:col-span-2 rounded-lg p-5 mx-5 sm:mx-24 mt-5 md:mt-0">
            <h3 className="text-2xl font-medium text-gray-900 py-2">{Name}</h3>
            <p className="mt-2 text-gray-500 h-24 overflow-hidden">
              {Description}
            </p>
            <p className="mt-2 text-gray-500">${Price}</p>
            <AddToCartButton productId={id} />
          </div>
        </div>
      </div>
      <Best />
    </>
  );
}

export async function generateStaticParams() {
  async function getProductParams() {
    const q = query(collection(db, "products"));
    const querySnapshot = await getDocs(q);

    const products = [];
    const promises = [];

    querySnapshot.forEach((doc) => {
      const data = doc.data();
      const product = { ...data };
      const imageRef = ref(storage, `product_images/${data.Image}`);
      const promise = getDownloadURL(imageRef).then((url) => {
        product.imageUrl = url;
        return product;
      });
      promises.push(promise);
    });

    const resolvedPromises = await Promise.all(promises);
    products.push(...resolvedPromises);

    return products;
  }

  const allParams = await getProductParams();
  return allParams.map((p) => ({ id: p.id }));

  //////////////////////////////// Working Version with google firebase
  // "use client";
  // import { useState, useEffect } from "react";
  // import Link from "next/link";
  // import Image from "next/image";
  // import { useCartContext } from "../../context/dataContext";
  // import Best from "../../components/best";
  // import { collection, query, where, getDocs } from "firebase/firestore";
  // import { ref, getDownloadURL } from "firebase/storage";
  // import { db, storage } from "../../../lib/firebase-config";

  // async function getProductDetails(productId) {
  //   const q = query(collection(db, "products"), where("id", "==", productId));
  //   const querySnapshot = await getDocs(q);

  //   const products = [];
  //   const promises = [];

  //   querySnapshot.forEach((doc) => {
  //     const data = doc.data();
  //     const product = { ...data };
  //     const imageRef = ref(storage, `product_images/${data.Image}`);
  //     const promise = getDownloadURL(imageRef).then((url) => {
  //       product.imageUrl = url;
  //       return product;
  //     });
  //     promises.push(promise);
  //   });

  //   const resolvedPromises = await Promise.all(promises);
  //   products.push(...resolvedPromises);
  //   // console.log(products[0]);

  //   return products[0];
  // }

  // export default function Product({ params }) {
  //   const [product, setProduct] = useState(null);

  //   useEffect(() => {
  //     async function fetchProductDetails(productId) {
  //       const data = await getProductDetails(productId);
  //       setProduct(data);
  //     }

  //     fetchProductDetails(params.id);
  //   }, [params.id]);

  //   const [isAdded, setIsAdded] = useState(false);

  //   const { items, addItem, isProductInCart, setCart } = useCartContext();

  //   const addToCart = (product) => {
  //     addItem(product);
  //   };

  //   useEffect(() => {
  //     const cartItems = JSON.parse(sessionStorage.getItem("cartItems")) || [];
  //     if (cartItems.length > 0) {
  //       setCart(cartItems);
  //     }
  //     // eslint-disable-next-line react-hooks/exhaustive-deps
  //   }, [product]);

  //   useEffect(() => {
  //     sessionStorage.setItem("cartItems", JSON.stringify(items));
  //   }, [items]);
  //   if (!product) {
  //     return <div className="flex text-3xl">Loading...</div>;
  //   }

  //   const { id, Name, Price, Description, imageUrl } = product;

  //   return (
  //     <>
  //       <div className="py-5">
  //         <Link
  //           href="/products"
  //           className="py-2 px-4 mx-2 bg-blue-600 text-white justify-center rounded-md hover:bg-blue-700 transition-all ease-in-out duration-200"
  //         >
  //           Back to Products
  //         </Link>
  //       </div>{" "}
  //       <div className="py-12">
  //         <div
  //           className=" p-5 rounded-lg items-center text-center grid grid-cols-1 md:grid-cols-3"
  //           key={id}
  //         >
  //           <div>
  //             <Image
  //               className="mx-auto"
  //               width={300}
  //               height={300}
  //               src={imageUrl}
  //               alt={Name}
  //             />
  //           </div>
  //           <div className="bg-gray-300 md:col-span-2 rounded-lg p-5 mx-5 sm:mx-24 mt-5 md:mt-0">
  //             <h3 className="text-2xl font-medium text-gray-900 py-2">{Name}</h3>
  //             <p className="mt-2 text-gray-500 h-24 overflow-hidden">
  //               {Description}
  //             </p>
  //             <p className="mt-2 text-gray-500">${Price}</p>
  //             <button
  //               onClick={() => addToCart(id)}
  //               className={`mt-4 px-4 py-2 rounded-md text-white font-semibold ${
  //                 isProductInCart(id)
  //                   ? "bg-green-600"
  //                   : "bg-blue-600 hover:bg-blue-700"
  //               } focus:outline-none focus:ring-2 ${
  //                 isProductInCart(id)
  //                   ? "focus:ring-green-600"
  //                   : "focus:ring-blue-600"
  //               } focus:ring-offset-2`}
  //               disabled={isProductInCart(id)}
  //             >
  //               {isProductInCart(id) ? "Added" : "Add to Cart"}
  //             </button>
  //           </div>
  //         </div>
  //       </div>
  //       <Best />
  //     </>
  //   );
  // }

  // export async function generateStaticParams() {
  //   async function getProductParams() {
  //     const q = query(collection(db, "products"));
  //     const querySnapshot = await getDocs(q);

  //     const products = [];
  //     const promises = [];

  //     querySnapshot.forEach((doc) => {
  //       const data = doc.data();
  //       const product = { ...data };
  //       const imageRef = ref(storage, `product_images/${data.Image}`);
  //       const promise = getDownloadURL(imageRef).then((url) => {
  //         product.imageUrl = url;
  //         return product;
  //       });
  //       promises.push(promise);
  //     });

  //     const resolvedPromises = await Promise.all(promises);
  //     products.push(...resolvedPromises);

  //     return products;
  //   }

  //   const allParams = await getProductParams();
  //   return allParams.results.map((p) => ({ id: p.id }));
}

////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////// Working Version with productContext call
// "use client";
// import { useState, useEffect } from "react";
// import Link from "next/link";
// import Image from "next/image";
// import { useProductContext } from "../../context/productsContext";
// import { useCartContext } from "../../context/dataContext";
// import Best from "../../components/best";

// export default function Product({ params }) {
//   console.log(params);
//   //   console.log(searchParams);
//   const { productList, imagesLoaded } = useProductContext();

//   const [product, ...filteredList] = productList.filter(
//     (item) => item.id === params.id
//   );
//   const [isAdded, setIsAdded] = useState(false);

//   const { items, addItem, isProductInCart, setCart } = useCartContext();

//   const addToCart = (product) => {
//     addItem(product);
//   };

//   useEffect(() => {
//     const cartItems = JSON.parse(sessionStorage.getItem("cartItems")) || [];
//     if (cartItems.length > 0) {
//       setCart(cartItems);
//     }
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [product]);

//   useEffect(() => {
//     sessionStorage.setItem("cartItems", JSON.stringify(items));
//   }, [items]);

//   return (
//     <>
//       <div className="py-5">
//         <Link
//           href="/products"
//           className="py-2 px-4 mx-2 bg-blue-600 text-white justify-center rounded-md hover:bg-blue-700 transition-all ease-in-out duration-200"
//         >
//           Back to Products
//         </Link>
//       </div>{" "}
//       {imagesLoaded ? (
//         <div className="py-12">
//           <div
//             className=" p-5 rounded-lg items-center text-center grid grid-cols-1 md:grid-cols-3"
//             key={product.id}
//           >
//             <div>
//               <Image
//                 className="mx-auto"
//                 width={300}
//                 height={300}
//                 src={product.imageUrl}
//                 alt={product.Name}
//               />
//             </div>
//             <div className="bg-gray-300 md:col-span-2 rounded-lg p-5 mx-5 sm:mx-24 mt-5 md:mt-0">
//               <h3 className="text-2xl font-medium text-gray-900 py-2">
//                 {product.Name}
//               </h3>
//               <p className="mt-2 text-gray-500 h-24 overflow-hidden">
//                 {product.Description}
//               </p>
//               <p className="mt-2 text-gray-500">${product.Price}</p>
//               <button
//                 onClick={() => addToCart(product.id)}
//                 className={`mt-4 px-4 py-2 rounded-md text-white font-semibold ${
//                   isProductInCart(product.id)
//                     ? "bg-green-600"
//                     : "bg-blue-600 hover:bg-blue-700"
//                 } focus:outline-none focus:ring-2 ${
//                   isProductInCart(product.id)
//                     ? "focus:ring-green-600"
//                     : "focus:ring-blue-600"
//                 } focus:ring-offset-2`}
//                 disabled={isProductInCart(product.id)}
//               >
//                 {isProductInCart(product.id) ? "Added" : "Add to Cart"}
//               </button>
//             </div>
//           </div>
//         </div>
//       ) : (
//         <p>Loading...</p>
//       )}
//       <Best />
//     </>
//   );
// }

// export function generateStaticParams() {
//   return [
//     { id: "ZeC52YSNzSjDsV5PLlsX" },
//     { id: "pytTcjSen5QysBed4A6V" },
//     { id: "dYGjYwK8x468EIpnxcCs" },
//     { id: "HGN9tMsxurb4ztPEyakq" },
//     { id: "4YDXsd4Pbu9ByWKiRMOm" },
//     { id: "6KEthFj949yW1ydOVQdx" },
//     { id: "wJOZmYnWvsrMzFgpSh3J" },
//     { id: "fs1C4IDEUMQcaBqlqODg" },
//     { id: "X3K5tp9IiyIFNCfbWsRf" },
//     { id: "4hPlyZ6nwWI64uRiILQl" },
//     { id: "dtufK7tnlUNOxwzqt4OF" },
//     { id: "Sn3V7UeXlaKq0FlRuYHi" },
//   ];
// }
