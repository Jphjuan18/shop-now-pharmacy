"use client";
import { createContext, useContext, useState } from "react";

const CartContext = createContext({});

export const CartContextProvider = ({ children }) => {
  const [items, setItems] = useState([]);

  const addItem = (item) => {
    const cartItemIndex = items.findIndex((i) => i.id === item);
    if (cartItemIndex >= 0) {
      const updatedItems = [...items];
      updatedItems[cartItemIndex].quantity += 1; // increment quantity if item already exists
      setItems(updatedItems);
    } else {
      const newItem = { id: item, quantity: 1 };
      setItems([...items, newItem]); // add new item with quantity 1
    }
  };

  const removeItem = (itemId) => {
    setItems(items.filter((item) => item.id !== itemId));
  };

  const isProductInCart = (productId) => {
    const cartItemIndex = items.findIndex((item) => item.id === productId);
    return cartItemIndex >= 0;
  };

  const incrementQuantity = (itemId) => {
    const cartItemIndex = items.findIndex((item) => item.id === itemId);
    const updatedItems = [...items];
    updatedItems[cartItemIndex].quantity += 1;
    setItems(updatedItems);
  };

  const decrementQuantity = (itemId) => {
    const cartItemIndex = items.findIndex((item) => item.id === itemId);
    const updatedItems = [...items];
    if (updatedItems[cartItemIndex].quantity > 1) {
      updatedItems[cartItemIndex].quantity -= 1;
      setItems(updatedItems);
    } else {
      removeItem(itemId);
    }
  };

  const setCart = (cartData) => {
    setItems(cartData);
  };

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        incrementQuantity,
        decrementQuantity,
        isProductInCart,
        setCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
export const useCartContext = () => useContext(CartContext);
