import React from "react";
import Link from "next/link";

export default function Footer() {
  return (
    <div className="bg-gray-800 text-gray-400 py-4 text-center lg:text-start">
      <div className="flex flex-col md:flex-row justify-around items-center px-20 py-5">
        <div className="flex space-x-4 text-sm">
          <Link href="/" className="text-gray-400 hover:text-gray-300">
            Home
          </Link>
          <Link href="/products" className="text-gray-400 hover:text-gray-300">
            Products
          </Link>
          <Link href="/cart" className="text-gray-400 hover:text-gray-300">
            Cart
          </Link>
          <Link href="/terms" className="text-gray-400 hover:text-gray-300">
            Terms
          </Link>
        </div>
        <div className="text-sm">
          &copy; 2023 Shop Now Pharmacy. All rights reserved.
        </div>
      </div>
    </div>
  );
}
