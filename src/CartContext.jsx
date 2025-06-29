import React, { createContext, useState, useContext, useEffect } from 'react';

// 1. Membuat Context
export const CartContext = createContext();

// 2. Membuat Provider untuk Context
export const CartProvider = ({ children }) => {
  // Mengambil data keranjang dari localStorage saat inisialisasi
  // Jika tidak ada di localStorage, inisialisasi dengan array kosong
  const [cartItems, setCartItems] = useState(() => {
    try {
      const storedCartItems = localStorage.getItem('cartItems');
      return storedCartItems ? JSON.parse(storedCartItems) : [];
    } catch (error) {
      console.error("Failed to parse cart items from localStorage:", error);
      return [];
    }
  });

  // Menyimpan data keranjang ke localStorage setiap kali cartItems berubah
  useEffect(() => {
    try {
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
    } catch (error) {
      console.error("Failed to save cart items to localStorage:", error);
    }
  }, [cartItems]);

  // Fungsi untuk menambahkan item ke keranjang
  const addToCart = (product) => {
    setCartItems((prevItems) => {
      // Cek apakah produk sudah ada di keranjang
      const existingItem = prevItems.find((item) => item.id_product === product.id_product);

      if (existingItem) {
        // Jika sudah ada, tambahkan kuantitasnya
        return prevItems.map((item) =>
          item.id_product === product.id_product ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        // Jika belum ada, tambahkan produk baru dengan kuantitas 1
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });
  };

  // Fungsi untuk menghapus item dari keranjang
  const removeFromCart = (productId) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id_product !== productId));
  };

  // Fungsi untuk menambah kuantitas item
  const increaseQuantity = (productId) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id_product === productId ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  // Fungsi untuk mengurangi kuantitas item
  const decreaseQuantity = (productId) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id_product === productId
          ? { ...item, quantity: item.quantity > 1 ? item.quantity - 1 : 1 } // Pastikan kuantitas tidak kurang dari 1
          : item
      ).filter((item) => item.quantity > 0) // Hapus item jika kuantitasnya menjadi 0 (opsional, tergantung UX)
    );
  };

  // Menghitung total harga di keranjang
  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.price_product * item.quantity, 0);
  };

  // 3. Membuat Custom Hook untuk memudahkan penggunaan Context
  // Ini lebih disarankan daripada menggunakan useContext(CartContext) secara langsung di setiap komponen
  const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
      throw new Error('useCart must be used within a CartProvider');
    }
    return context;
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        getTotalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Export custom hook
export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
      throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};