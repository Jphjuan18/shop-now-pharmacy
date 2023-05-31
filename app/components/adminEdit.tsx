"use client";
import { useState, useEffect } from "react";
import {
  collection,
  onSnapshot,
  query,
  deleteDoc,
  doc,
  updateDoc,
  orderBy,
} from "firebase/firestore";
import { ref, getDownloadURL, deleteObject } from "firebase/storage";
import { db, storage } from "../../lib/firebase-config";
import Image from "next/image";

interface Product {
  id: string;
  Name: string;
  Description: string;
  Price: number;
  imageUrl: string;
  isBestSeller: boolean;
  [key: string]: any;
}

export default function AdminEdit() {
  const [productsList, setProductList] = useState<Product[]>([]);
  const [imagesLoaded, setImagesLoaded] = useState<boolean>(false);
  const [editProduct, setEditProduct] = useState<Product | null>(null);

  useEffect(() => {
    const q = query(collection(db, "products"), orderBy("Name"));
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
              const sortedProducts = products.sort((a, b) => {
                // sort products alphabetically by name
                if (a.Name.toLowerCase() > b.Name.toLowerCase()) return 1;
                if (a.Name.toLowerCase() < b.Name.toLowerCase()) return -1;
                return 0;
              });
              // set the state with sorted products
              setProductList(sortedProducts);
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

  const handleDeleteProduct = async (id: string) => {
    const productDoc = doc(db, "products", id);
    await deleteDoc(productDoc);
    const imageRef = ref(storage, `product_images/${id}`);
    await deleteObject(imageRef);
  };

  const handleEditProduct = (product: Product) => {
    setEditProduct(product);
  };

  const handleUpdateProduct = async (id: string, product: Product) => {
    const { imageUrl, ...data } = product;
    const productDoc = doc(db, "products", id);
    await updateDoc(productDoc, data);
    setEditProduct(null);
  };

  return (
    <div className="py-12 bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-center text-4xl py-5">Products</h1>
        {imagesLoaded ? (
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {productsList.map((product) => (
              <div
                className={`bg-gray-300 p-5 rounded-lg items-center text-center ${
                  product.isBestSeller ? "border-2 border-yellow-500" : ""
                }`}
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
                <div className="mt-4 space-x-4">
                  <button
                    className="px-4 py-2 rounded-md text-white font-semibold bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2"
                    onClick={() => handleDeleteProduct(product.id)}
                  >
                    Delete Product
                  </button>
                  <button
                    className="px-4 py-2 rounded-md text-white font-semibold bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2"
                    onClick={() => handleEditProduct(product)}
                  >
                    Edit Product
                  </button>
                </div>
                {editProduct?.id === product.id && (
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      handleUpdateProduct(editProduct.id, editProduct);
                    }}
                  >
                    <div className="mt-4 space-y-4">
                      <div>
                        <label
                          className="block text-gray-700 font-semibold"
                          htmlFor={`${product.id}-name`}
                        >
                          Name
                        </label>
                        <input
                          className="block w-full border border-gray-400 rounded py-2 px-3 mt-2 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                          id={`${product.id}-name`}
                          type="text"
                          value={editProduct.Name}
                          onChange={(e) =>
                            setEditProduct({
                              ...editProduct,
                              Name: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div>
                        <label
                          className="block text-gray-700 font-semibold"
                          htmlFor={`${product.id}-description`}
                        >
                          Description
                        </label>
                        <textarea
                          className="block w-full border border-gray-400 rounded py-2 px-3 mt-2 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                          id={`${product.id}-description`}
                          value={editProduct.Description}
                          onChange={(e) =>
                            setEditProduct({
                              ...editProduct,
                              Description: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div>
                        <label
                          className="block text-gray-700 font-semibold"
                          htmlFor={`${product.id}-price`}
                        >
                          Price
                        </label>
                        <input
                          className="block w-full border border-gray-400 rounded py-2 px-3 mt-2 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                          id={`${product.id}-price`}
                          type="number"
                          value={editProduct.Price}
                          onChange={(e) =>
                            setEditProduct({
                              ...editProduct,
                              Price: parseInt(e.target.value),
                            })
                          }
                        />
                      </div>

                      <div className="flex flex-row">
                        <label
                          className="block text-gray-700 font-semibold"
                          htmlFor={`${product.id}-bestseller`}
                        >
                          Best Seller
                        </label>
                        <input
                          className="block mx-5"
                          id={`${product.id}-bestseller`}
                          type="checkbox"
                          checked={editProduct.isBestSeller}
                          onChange={(e) =>
                            setEditProduct({
                              ...editProduct,
                              isBestSeller: e.target.checked,
                            })
                          }
                        />
                      </div>

                      <button
                        type="submit"
                        className="px-4 py-2 rounded-md text-white font-semibold bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2"
                      >
                        Save Changes
                      </button>
                      <button
                        type="button"
                        className="px-4 py-2 rounded-md text-white font-semibold bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2"
                        onClick={() => setEditProduct(null)}
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                )}
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
