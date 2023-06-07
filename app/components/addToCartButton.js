"use client";
import { useCartContext } from "../context/cartContext";

function AddToCartButton(props) {
  const { addItem, isProductInCart } = useCartContext();

  const addToCart = (productId) => {
    addItem(productId);
  };

  const { productId } = props;

  return (
    <button
      onClick={() => addToCart(productId)}
      className={`mt-4 px-4 py-2 rounded-md text-white font-semibold ${
        isProductInCart(productId)
          ? "bg-green-600"
          : "bg-blue-600 hover:bg-blue-700"
      } focus:outline-none focus:ring-2 ${
        isProductInCart(productId)
          ? "focus:ring-green-600"
          : "focus:ring-blue-600"
      } focus:ring-offset-2`}
      disabled={isProductInCart(productId)}
    >
      {isProductInCart(productId) ? "Added" : "Add to Cart"}
    </button>
  );
}

export default AddToCartButton;
