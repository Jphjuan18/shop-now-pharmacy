"use client";
import React, { useState } from "react";
import { auth } from "../../lib/firebase-config";
import { sendPasswordResetEmail } from "firebase/auth";

function Forgot() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleReset = (e) => {
    e.preventDefault();

    sendPasswordResetEmail(auth, email)
      .then(() => {
        setMessage("Password reset email sent.");
      })
      .catch((error) => {
        setMessage(error.message);
      });
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <form onSubmit={handleReset}>
          <label className="block text-gray-700 font-bold mb-2">Email:</label>
          <input
            className="border rounded-lg py-2 px-3"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mb-6 flex flex-row my-5"
            type="submit"
          >
            Reset Password
          </button>
          <p>{message}</p>
        </form>
      </div>
    </div>
  );
}

export default Forgot;
