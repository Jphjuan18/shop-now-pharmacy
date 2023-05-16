"use client"
import { useState } from "react";
import { db, storage } from "../../lib/firebase-config";
import { collection, setDoc, doc } from "firebase/firestore";
import { ref, uploadBytes } from "firebase/storage";
import Image from "next/image"

export default function Admin() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
const [imageFile, setImageFile] = useState<File | null>(null);
const [imageUrl, setImageUrl] = useState("");

const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]; // Use optional chaining to handle null values
    if (file) {
      setImageFile(file);
      setImageUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  
    // Generate a unique document ID
    const docRef = doc(collection(db, "products"));
  
    if (imageFile) { // Add a check for null values
        // Upload the image to Firebase Storage with the document ID as the file name
        const imageRef = ref(storage, `product_images/${docRef.id}`);
        await uploadBytes(imageRef, imageFile);
    }
  
    // Add the product information to Firebase Firestore with the document ID as the ID field
    await setDoc(docRef, {
      Name: name,
      Description: description,
      Price: "$" + price,
      Image: docRef.id, // store the unique ID instead of the file name
    });
  
    // Reset the form
    setName("");
    setDescription("");
    setPrice("");
    setImageFile(null);
    setImageUrl("");
  };

  return (
    <div className="max-w-lg mx-auto py-5">
      <h1 className="text-3xl font-semibold mb-8 text-center">Add a Product</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col space-y-2">
          <label htmlFor="name" className="font-semibold">
            Name:
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            className="border border-gray-200 p-2 rounded"
          />
        </div>
        <div className="flex flex-col space-y-2">
          <label htmlFor="description" className="font-semibold">
            Description:
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            className="border border-gray-200 p-2 rounded"
          />
        </div>
        <div className="flex flex-col space-y-2">
          <label htmlFor="price" className="font-semibold">
            Price:
          </label>
          <input
            type="number"
            id="price"
            value={price}
            onChange={(event) => setPrice(event.target.value)}
            className="border border-gray-200 p-2 rounded"
          />
        </div>
        <div className="flex flex-col space-y-2">
          <label htmlFor="image" className="font-semibold">
            Image:
          </label>
          <input
            type="file"
            id="image"
            accept="image/*"
            onChange={handleFileUpload}
            className="border border-gray-200 p-2 rounded"
          />
          {imageUrl && <Image src={imageUrl} alt="" className="max-w-full h-auto mt-2" width={300} height={300}/>}
        </div>
        <button type="submit" className="bg-blue-500 text-white rounded py-2 px-4 hover:bg-blue-600 transition duration-200">
          Add
        </button>
      </form>
    </div>
  );
}