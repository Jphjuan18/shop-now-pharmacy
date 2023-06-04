"use client";
import { createContext, useState, useEffect, useContext } from "react";

import {
  collection,
  onSnapshot,
  query,
  orderBy,
  where,
} from "firebase/firestore";
import { ref, getDownloadURL } from "firebase/storage";
import { db, storage } from "../../lib/firebase-config";

const ProductsContext = createContext({});

export const ProductsContextProvider = ({ children }) => {
  const [productList, setProductList] = useState([]);
  const [bestProductList, setBestProductList] = useState([]);
  const [imagesLoaded, setImagesLoaded] = useState(false);

  useEffect(() => {
    const q = query(collection(db, "products"), orderBy("Name"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const products = [];
      snapshot.forEach((doc) => {
        const data = doc.data();
        const product = { ...data, id: doc.id, imageUrl: "" };
        products.push(product); // push the products without the image urls
        const imageRef = ref(storage, `product_images/${data.Image}`);
        getDownloadURL(imageRef)
          .then((url) => {
            // find the index of the product in the array
            const index = products.findIndex((p) => p.id === doc.id);
            // update the imageUrl of the product at that index
            products[index].imageUrl = url;
            // check if all images have been loaded
            const allImagesLoaded = products.every((p) => p.imageUrl !== "");
            if (allImagesLoaded) {
              // console.log(products);
              setProductList(products);
              setImagesLoaded(true);
            }
          })
          .catch((error) => {
            console.log(error.message);
          });
      });
    });
  }, []);

  useEffect(() => {
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
              setBestProductList(products);
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

  const contextValue = {
    productList,
    bestProductList,
    imagesLoaded,
    setProductList,
  };

  return (
    <ProductsContext.Provider value={contextValue}>
      {children}
    </ProductsContext.Provider>
  );
};
export const useProductContext = () => useContext(ProductsContext);
