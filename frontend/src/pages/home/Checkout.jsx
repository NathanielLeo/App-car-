import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

export default function Checkout() {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchCartItems() {
      try {
        const response = await axios.get('http://localhost:8081/api/cart');
        setCartItems(response.data);
      } catch (error) {
        console.error('Error fetching cart items:', error);
        alert("Failed to fetch cart items. Please try again.");
      }
    }

    fetchCartItems();
  }, []);

  const handleCheckout = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8081/api/checkout",
        { cartItems },
        {
          headers: {
            Authorization: `Bearer ${'your_token_here'}`, // Thay thế bằng token thực tế
          },
        }
      );
      // Kiểm tra phản hồi từ API
      if (response.status === 200) {
        navigate("/confirmation");
      } else {
        console.error("Checkout failed:", response.statusText);
        alert("Failed to complete checkout. Please try again.");
      }
    } catch (error) {
      console.error("Error during checkout:", error.response ? error.response.data : error.message);
      alert("Failed to complete checkout. Please try again.");
    }
  };

  return (
    <div>
      <h2>Checkout</h2>
      {/* Hiển thị thông tin giỏ hàng và nút thanh toán */}
      <button onClick={handleCheckout}>Complete Checkout</button>
    </div>
  );
}
