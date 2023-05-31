"use client";
import React, { useState, useEffect } from "react";

export default function Confirmation() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading for 2 seconds
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  return (
    <div className="flex justify-center items-center h-screen">
      {loading ? (
        <div className="text-center animate-bounce">
          <p>Payment Processing...</p>
        </div>
      ) : (
        <div className="text-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-16 w-16 mx-auto mb-4 text-red-500"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M18.707 3.293a1 1 0 010 1.414l-9 9a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L9 11.586l8.293-8.293a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
          <h2 className="text-3xl font-bold mb-2">
            Thank you for your purchase!
          </h2>
          <p className="text-lg">
            Your order has been confirmed and will be shipped shortly.
          </p>
        </div>
      )}
    </div>
  );
}
