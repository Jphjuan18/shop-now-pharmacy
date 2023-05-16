"use client";
import React, { useState } from "react";
import Link from "next/link";

export default function Navbar(props) {
  const [navbarOpen, setNavbarOpen] = useState(false);
  return (
    <nav className="flex py-3 bg-red-500 border-2 border-red-500 text-white">
      <div className="w-full mx-1 flex place-content-between">
        <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
          <Link href="/">
            <h1 className="pl-5 pt-1 text-2xl">Peptide Connect</h1>
          </Link>
          <button
            className="text-secondary cursor-pointer text-2xl leading-none px-3 pr-5 rounded bg-transparent block lg:hidden outline-none focus:outline-none"
            type="button"
            onClick={() => setNavbarOpen(!navbarOpen)}
          >
            <span className="flex justify-end border-2 p-2 rounded">℞</span>
          </button>
        </div>
        <div
          className={
            "lg:flex flex-grow items-center" +
            (navbarOpen ? " flex" : " hidden")
          }
        >
          <ul className="flex flex-col lg:flex-row list-none lg:ml-auto">
            <li className="nav-item">
              <Link href={"/"}>
                <span className="px-3 py-2 flex items-center text-xs uppercase leading-snug hover:opacity-75">
                  Home
                </span>
              </Link>
            </li>
            <li className="nav-item">
              <Link href={"/products"}>
                <span className="px-3 py-2 flex items-center text-xs uppercase leading-snug hover:opacity-75">
                  Products
                </span>
              </Link>
            </li>
            <li className="nav-item hidden lg:flex">
              <Link href={"/cart"}>
                <span className="px-3 py-2 mx-1 items-center text-xs uppercase leading-snug hover:opacity-75 bg-slate-100 rounded-lg">
                  🛒
                </span>
              </Link>
            </li>
            <li className="nav-item flex flex-row">
              <Link href={"/account"}>
                <span className="px-3 py-2 mx-1 items-center text-center text-xs uppercase leading-snug hover:opacity-75 bg-slate-100 rounded-lg">
                  👤
                </span>
              </Link>
              <Link href={"/cart"}>
                <span className="lg:hidden px-3 py-2 mx-1 items-center text-xs uppercase leading-snug hover:opacity-75 bg-slate-100 rounded-lg">
                  🛒
                </span>
              </Link>
            </li>
            <li className="nav-item">
              <Link href={"/admin"}>
                <span className="px-3 py-2 flex items-center text-xs uppercase leading-snug hover:opacity-75">
                  Admin
                </span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
