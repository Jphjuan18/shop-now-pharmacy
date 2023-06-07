"use client";
import React, { useState, useEffect } from "react";
import {
  collection,
  addDoc,
  query,
  where,
  orderBy,
  onSnapshot,
} from "firebase/firestore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { db } from "../../lib/firebase-config";

import { faStar } from "@fortawesome/free-solid-svg-icons";

export default function Reviews(props) {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  useEffect(() => {
    // console.log("Starting query...");

    const q = query(
      collection(db, "reviews"),
      where("productId", "==", props.productId),
      orderBy("createdAt", "desc")
    );

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        // console.log("Received snapshot:", snapshot.docs.length);

        const reviews = [];
        snapshot.forEach((doc) => {
          const data = doc.data();
          const review = { ...data, id: doc.id };
          reviews.push(review);
        });
        setReviews(reviews);
        setLoading(false);
      },
      (error) => {
        // console.log("Error fetching reviews:", error.message);
        setLoading(false);
      }
    );

    return () => {
      unsubscribe();
    };
  }, [props.productId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(comment);
    addDoc(collection(db, "reviews"), {
      productId: props.productId,
      rating,
      comment,
      createdAt: new Date().toISOString(),
    });
    setComment("");
  };

  const starRating = (ratingValue) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= ratingValue) {
        stars.push(
          <FontAwesomeIcon
            icon={faStar}
            className="text-yellow-400 mx-1 cursor-pointer"
            onClick={() => setRating(i)}
            key={i}
          />
        );
      } else {
        stars.push(
          <FontAwesomeIcon
            icon={faStar}
            className="text-gray-400 mx-1 cursor-pointer"
            onClick={() => setRating(i)}
            key={i}
          />
        );
      }
    }
    return stars;
  };

  return (
    <div className="bg-white shadow-md rounded-md px-6 py-4">
      <h3 className="text-lg font-semibold mb-4">Customer Reviews</h3>
      {loading ? (
        <p></p>
      ) : reviews.length > 0 ? (
        <ul>
          {reviews.map((review) => (
            <li key={review.id} className="border-b border-gray-200 mb-4 pb-4">
              <div className="flex items-center space-x-2">
                <div>{starRating(review.rating)}</div>
                <span className="text-gray-600 text-sm">
                  {new Date(review.createdAt).toDateString()}
                </span>
              </div>
              <p className="text-gray-800 mt-2">{review.comment}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-600 mt-4">No reviews yet.</p>
      )}
      <h3 className="text-lg font-semibold mt-6 mb-4">Write a Review</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="rating"
            className="block text-gray-700 font-semibold mb-2"
          >
            Rating:
          </label>
          <div>{starRating(rating)}</div>
        </div>
        <div>
          <label
            htmlFor="comment"
            className="block text-gray-700 font-semibold mb-2"
          >
            Comment:
          </label>
          <textarea
            id="comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="shadow-sm border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
