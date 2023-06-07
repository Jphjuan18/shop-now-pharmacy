import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";
export default function Loading() {
  return (
    <div className="flex justify-center items-center max-w-xl mx-auto h-80">
      <FontAwesomeIcon
        icon={faCircleNotch}
        className="text-gray-600 animate-spin-steady w-1/6"
      />
    </div>
  );
}
