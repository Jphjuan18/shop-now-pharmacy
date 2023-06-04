"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { useCartContext } from "../context/dataContext";
import Link from "next/link";
import { useProductContext } from "../context/productsContext";
import AddToCartButton from "../components/AddToCartButton";

export default function Products() {
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [filter, setFilter] = useState({ cost: "all", name: "" });

  const { items, addItem, isProductInCart, setCart } = useCartContext();
  const { productList, setProductList, imagesLoaded } = useProductContext();

  const addToCart = (product) => {
    addItem(product);
  };

  const applyFilters = () => {
    let filtered = [...productList];

    // filter by price
    if (filter.cost !== "all") {
      filtered = filtered.filter(
        (product) => product.Price <= parseInt(filter.cost)
      );
    }

    // filter by name
    if (filter.name !== "") {
      const regex = new RegExp(filter.name, "i");
      filtered = filtered.filter((product) => regex.test(product.Name));
    }

    // sort by price
    if (filter.priceSort === "asc") {
      filtered.sort((a, b) => a.Price - b.Price);
    } else if (filter.priceSort === "desc") {
      filtered.sort((a, b) => b.Price - a.Price);
    }

    // update filtered products
    setFilteredProducts(filtered);
  };

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

  useEffect(() => {
    applyFilters();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productList, filter]); // reapply filters whenever productList or filter changes

  const handlePriceFilter = (e) => {
    setFilter({ ...filter, cost: e.target.value });
  };

  const handleNameFilter = (e) => {
    setFilter({ ...filter, name: e.target.value });
  };

  // handle sort by price
  const handleSortByPrice = (e) => {
    setFilter({ ...filter, priceSort: e.target.value });
  };

  return (
    <>
      <div className="py-12 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid py-3 grid-cols-2 sm:flex sm:flex-row">
            <div className="mr-5 flex-col sm:flex-row">
              <label htmlFor="priceSort" className="mr-2">
                Sort by price:
              </label>
              <select
                className="w-32"
                id="priceSort"
                value={filter.priceSort}
                onChange={handleSortByPrice}
              >
                <option value="">-</option>
                <option value="asc">Low to High</option>
                <option value="desc">High to Low</option>
              </select>
            </div>
            <div className="mr-5 flex-col sm:flex-row">
              <label htmlFor="priceFilter" className="mr-2">
                Filter by price:
              </label>
              <select
                className="w-16"
                id="priceFilter"
                value={filter.cost}
                onChange={handlePriceFilter}
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
            <p>Loading...</p>
          )}
        </div>
      </div>
    </>
  );
}
