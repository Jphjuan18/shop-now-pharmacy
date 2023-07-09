import React from "react";
import Best from "./components/best";
import ProductsALL from "./components/productsAll";
import NewsletterSignUp from "./components/newsletterSignUp";
import Link from "next/link";
// import Banner from "./components/home/banner.js";

export default function Home() {
  return (
    <main className="bg-gray-100">
      <section className="bg-gray-100 flex flex-col justify-center items-center py-10 px-5">
        <h1 className="text-5xl font-bold mb-8 text-center lg:text-start">
          Unlock the Power of Medicine
        </h1>

        <Link href="/products">
          <button className="px-6 py-3 bg-red-500 text-white rounded-md hover:bg-red-600">
            Shop Now
          </button>
        </Link>
      </section>
      <section>{/* <Banner /> */}</section>
      <section>
        <Best />
        <ProductsALL />
      </section>
      <section>
        <NewsletterSignUp />
      </section>
    </main>
  );
}
