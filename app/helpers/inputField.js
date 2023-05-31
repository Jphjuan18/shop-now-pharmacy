"use client";
import React from "react";

export default function InputField({ label, ...props }) {
  return (
    <div>
      <label className="block text-gray-700 font-medium mb-2">{label}</label>
      <input className="border rounded-md py-2 px-3 w-full" {...props} />
    </div>
  );
}
