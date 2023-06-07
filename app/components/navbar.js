"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { signOut } from "firebase/auth";
import { auth } from "../../lib/firebase-config";
import { useUserContext } from "../context/userContext";

export default function Navbar() {
  const [navbarOpen, setNavbarOpen] = useState(false);
  const [isUid, setIsUid] = useState("");
  const [isAuth, setIsAuth] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  const { user, setUser, authContext, setAuthContext } = useUserContext();

  useEffect(() => {
    setIsAuth(authContext === true ? true : false);
    setIsUid(user);
    const adminTokens = process.env.NEXT_PUBLIC_ADMIN_VARIABLES_TOKENS
      ? process.env.NEXT_PUBLIC_ADMIN_VARIABLES_TOKENS.split(",")
      : [];
    if (adminTokens.includes(user)) {
      setIsAdmin(true);
    }
  }, [user]);

  const signUserOut = () => {
    signOut(auth).then(() => {
      sessionStorage.setItem("userContext", null);
      sessionStorage.setItem("authContext", false);
      setUser(null);
      setAuthContext(false);

      window.location.pathname = "/";
    });
  };

  return (
    <nav className="flex py-3 bg-red-500 border-2 border-red-500 text-white">
      <div className="w-full mx-1 flex place-content-between">
        <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
          <Link href="/">
            <h1 className="pl-5 pt-1 text-2xl">Shop Now Pharmacy</h1>
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
            {isAuth && (
              <li className="nav-item flex flex-row">
                <Link href={"/account"}>
                  <span className="px-3 py-2 flex items-center text-xs uppercase leading-snug hover:opacity-75">
                    Account
                  </span>
                </Link>
              </li>
            )}
            <li className="nav-item">
              <Link href={"/cart"}>
                <span className="px-3 py-2 flex items-center text-xs uppercase leading-snug hover:opacity-75">
                  Cart&nbsp;
                </span>
              </Link>
            </li>

            {isAdmin && (
              <li className="nav-item">
                <Link href="/admin">
                  <span className="px-3 py-2 flex items-center text-xs uppercase leading-snug hover:opacity-75">
                    Admin
                  </span>
                </Link>
              </li>
            )}
            {isAuth ? (
              <li>
                <button onClick={signUserOut}>
                  <span className="px-3 py-2 flex items-center text-xs uppercase leading-snug hover:opacity-75">
                    Logout
                  </span>
                </button>
              </li>
            ) : (
              <li>
                <Link href="/login">
                  <span className="px-3 py-2 flex items-center text-xs uppercase leading-snug hover:opacity-75">
                    Login
                  </span>
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
