"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useProductContext } from "../context/productsContext";
import AddToCartButton from "../components/AddToCartButton";
import Loading from "../components/loading";

export default function Products() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFilter, setIsFilter] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [filter, setFilter] = useState({ cost: "all", name: "" });

  const { productList, imagesLoaded } = useProductContext();

  const applyFilters = () => {
    let filtered = [...productList];

    // filter by price
    if (filter.cost !== "all") {
      filtered = filtered.filter(
        (product) => product.Price <= parseInt(filter.cost)
      );
      setIsFilter(true);
    }

    // filter by name
    if (filter.name !== "") {
      const regex = new RegExp(filter.name, "i");
      filtered = filtered.filter((product) => regex.test(product.Name));
    }

    // sort by price
    if (filter.priceSort === "asc") {
      filtered.sort((a, b) => a.Price - b.Price);
      setIsFilter(true);
    } else if (filter.priceSort === "desc") {
      filtered.sort((a, b) => b.Price - a.Price);
      setIsFilter(true);
    }

    // update filtered products
    setFilteredProducts(filtered);
  };

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

  const resetFilters = () => {
    // reset filter to initial state
    filter.priceSort = "";
    filter.cost = "all";
    setIsFilter(false);
    setFilteredProducts([...productList]);
    // setFilter({ ...filter, cost: "all" });
  };

  return (
    <>
      <div className="py-12 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col py-3 sm:flex sm:flex-row justify-between">
            <div className="mb-3 sm:mb-0">
              <label htmlFor="nameFilter" className="mr-2 text-xl">
                Search by name:
              </label>
              <input
                className="w-40 sm:w-48 py-2 px-2 rounded-full"
                id="nameFilter"
                type="text"
                value={filter.name}
                onChange={handleNameFilter}
                placeholder="Search Products..."
              />
            </div>

            <button
              className="sm:ml-auto text-xl text-blue-600 focus:outline-none flex justify-start py-2"
              onClick={() => setIsModalOpen(!isModalOpen)}
            >
              Filter
            </button>
          </div>

          {isModalOpen && (
            <div className="fixed w-full h-full z-20 top-0 left-0 bg-black bg-opacity-75 flex items-center justify-center">
              <div className="bg-white rounded-md mx-3 sm:mx-auto shadow-lg pb-4 overflow-auto max-h-full max-w-full sm:max-w-xl">
                <div className="flex flex-row justify-between items-center px-4 py-3 border-b border-gray-300">
                  <h2 className="text-lg font-medium">Filter By Price</h2>
                  <button
                    className="bg-slate-200 text-xs focus:outline-none p-1 m-2 rounded-md"
                    onClick={() => setIsModalOpen(!isModalOpen)}
                  >
                    X
                  </button>
                </div>

                <div className="px-4 mt-4">
                  <div className="flex flex-col sm:flex-row">
                    <label
                      htmlFor="priceSort"
                      className="mr-2 text-base sm:text-lg"
                    >
                      Sort By Price:
                    </label>
                    <select
                      className="w-32 mt-2 sm:mt-0 sm:ml-2"
                      id="priceSort"
                      value={filter.priceSort}
                      onChange={handleSortByPrice}
                    >
                      <option value="">-</option>
                      <option value="asc">Low to High</option>
                      <option value="desc">High to Low</option>
                    </select>
                  </div>

                  <div className="flex flex-col sm:flex-row mt-4">
                    <label
                      htmlFor="priceFilter"
                      className="mr-2 text-base sm:text-lg"
                    >
                      Filter By Price:
                    </label>
                    <select
                      className="w-32 mt-2 sm:mt-0 sm:ml-2"
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
                  {isFilter && (
                    <button
                      className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center focus:outline-none my-2"
                      onClick={resetFilters}
                    >
                      Reset Filters
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}

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
            <Loading />
          )}
        </div>
      </div>
    </>
  );
}
