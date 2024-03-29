"use client";
import Image from "next/image";
import Link from "next/link";
import { useProductContext } from "../context/productsContext";
import AddToCartButton from "../components/AddToCartButton";

export default function Products() {
  const { productList, imagesLoaded } = useProductContext();

  return (
    <>
      <div className="py-12 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {imagesLoaded && (
            <h1 className="text-center text-4xl py-5">Products</h1>
          )}
          {imagesLoaded ? (
            <div className="grid grid-cols-2 gap-5 md:grid-cols-2 lg:grid-cols-3">
              {productList.map((product) => (
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
            <p className="h-screen"></p>
          )}
        </div>
      </div>
    </>
  );
}
