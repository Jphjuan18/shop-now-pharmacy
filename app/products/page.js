"use client";
import { useState, useEffect } from "react";
import {
  collection,
  onSnapshot,
  query,
  orderBy,
  where,
} from "firebase/firestore";
import { ref, getDownloadURL } from "firebase/storage";
import { db, storage } from "../../lib/firebase-config";
import Image from "next/image";
import { useCartContext } from "../context/dataContext";

export default function Products() {
  const [productsList, setProductList] = useState([]);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [filter, setFilter] = useState({ cost: "all", name: "" });

  const { items, addItem, isProductInCart, setCart } = useCartContext();

  const addToCart = (product) => {
    addItem(product);
  };

  const applyFilters = () => {
    let filtered = productsList;
    if (filter.cost !== "all") {
      filtered = filtered.filter(
        (product) => product.Price <= parseInt(filter.cost)
      );
      // filtered.sort((a, b) => a.Price - b.Price); // sort by price cost
    }
    if (filter.name !== "") {
      const regex = new RegExp(filter.name, "i");
      filtered = filtered.filter((product) => regex.test(product.Name));
    }
    setFilteredProducts(filtered);
  };

  useEffect(() => {
    const cartItems = JSON.parse(sessionStorage.getItem("cartItems")) || [];
    if (cartItems.length > 0) {
      setCart(cartItems);
    }

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
              setProductList(products);
              setFilteredProducts(products);
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

  useEffect(() => {
    applyFilters();
  }, [productsList, filter]); // reapply filters whenever productsList or filter changes

  const handleCostFilter = (e) => {
    setFilter({ ...filter, cost: e.target.value });
  };

  const handleNameFilter = (e) => {
    setFilter({ ...filter, name: e.target.value });
  };

  return (
    <>
      <div className="py-12 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid py-3 grid-cols-2 sm:flex sm:flex-row">
            <div className="mr-5 flex-col sm:flex-row">
              <label htmlFor="costFilter" className="mr-2">
                Filter by cost:
              </label>
              <select
                className="w-16"
                id="costFilter"
                value={filter.cost}
                onChange={handleCostFilter}
              >
                <option value="all">All</option>
                <option value="10">Less than $10</option>
                <option value="20">Less than $20</option>
                <option value="30">Less than $30</option>
                <option value="40">Less than $40</option>
                <option value="50">Less than $50</option>
                <option value="60">Less than $60</option>
                <option value="70">Less than $70</option>
                <option value="80">Less than $80</option>
                <option value="90">Less than $90</option>
                <option value="100">Less than $100</option>
              </select>
            </div>
            <div className="mr-5 flex-col sm:flex-row">
              <label htmlFor="nameFilter" className="mr-2">
                Search by name:
              </label>
              <input
                className="w-32 sm:w-48"
                id="nameFilter"
                type="text"
                value={filter.name}
                onChange={handleNameFilter}
              />
            </div>
          </div>
          {imagesLoaded ? (
            <div className="grid grid-cols-2 gap-5 md:grid-cols-2 lg:grid-cols-3">
              {filteredProducts.map((product) => (
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
