import { collection, query, where, getDocs } from "firebase/firestore";
import { ref, getDownloadURL } from "firebase/storage";
import { db, storage } from "../../lib/firebase-config";

interface Product {
  id: string;
  Name: string;
  Description: string;
  Price: string;
  imageUrl: string;
  quantity: number;
  [key: string]: any;
}

export const getCartProducts = async (cartItems: { id: string, quantity: number }[]) => {
  const products: Product[] = [];
  
  const ids = cartItems.map(item => item.id); // get array of ids

  // Create a query that filters by the ids
  const q = query(collection(db, "products"), where("id", "in", ids));

  const snapshot = await getDocs(q);
  // Loop over the filtered documents and create product objects
  for (const doc of snapshot.docs) {
    const data = doc.data() as Product;
    const product = { ...data, id: doc.id, imageUrl: "" };
    const imageRef = ref(storage, `product_images/${data.Image}`);
    const url = await getDownloadURL(imageRef); // fetch the product image URL
    product.imageUrl = url;

    // Find the corresponding cart item and add its quantity to the product object
    const cartItem = cartItems.find(item => item.id === doc.id);
    
    if (cartItem) {
      product.quantity = cartItem.quantity;
    }

    products.push(product);
  }

  return products;
}