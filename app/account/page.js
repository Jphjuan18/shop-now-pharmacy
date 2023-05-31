"use client";
import React, { useState, useEffect } from "react";
import { auth } from "../../lib/firebase-config";

export default function Account() {
  const [userData, setUserData] = useState({});

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUserData(user);
      } else {
        setUserData({});
      }
    });
    return unsubscribe;
  }, []);

  if (!userData.uid) {
    // Authentication data hasn't finished loading, show a spinner or loading screen
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-gray-100 py-6">
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-xl font-medium mb-4">Account Information</h2>
        <div className="flex justify-between mb-4">
          <span className="font-medium">Name:</span>
          <span>{userData.displayName}</span>
        </div>
        <div className="flex justify-between mb-4">
          <span className="font-medium">Email:</span>
          <span>{userData.email}</span>
        </div>
        <div className="border-t border-gray-200 mt-6 pt-6">
          <h2 className="text-xl font-medium mb-4">Order History</h2>
          <p>You haven't placed any orders yet.</p> {/* sample order history */}
        </div>
      </div>
    </div>
  );
}
