//compnent to subscribe to email notifications
"use client";
import React, { useState } from "react";
import { db } from "../../lib/firebase-config";
import { collection, addDoc } from "firebase/firestore";

export default function NewsletterSignUp() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const docRef = await addDoc(collection(db, "subscribers"), {
      Email: email,
    });
    setEmail("");
    setSubscribed(true);
  };

  return (
    <div className="max-w-lg mx-auto pt-10 pb-20 px-5">
      <h1 className="text-3xl font-semibold mb-8 text-center">
        Subscribe to our newsletter
      </h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col space-y-2">
          <label htmlFor="email" className="font-semibold">
            Email:
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="border border-gray-200 p-2 rounded"
          />
        </div>
        <div className="flex flex-col items-center justify-center">
          <button
            type="submit"
            className="bg-blue-600 text-white font-semibold p-2 rounded"
          >
            Subscribe
          </button>
          {subscribed && (
            <p className="text-slate-500 mt-2 px-5 font-bold">
              Subscribed successfully!
            </p>
          )}
        </div>
      </form>
    </div>
  );
}
