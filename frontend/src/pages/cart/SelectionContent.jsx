import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function SectionContent() {
  const email = localStorage.getItem("email");
  const cartId = localStorage.getItem("cartId");
  const token = localStorage.getItem("authToken");
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchCart() {
      try {
        const response = await axios.get(
          `http://localhost:8081/api/public/users/${email}/carts/${cartId}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setCart(response.data); // Update: setCart(response.data)
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    }

    fetchCart();
  }, [email, cartId]);
  
const handleDelete = async (productId) => {
    try {
      await axios.delete(
        `http://localhost:8081/api/public/carts/${cartId}/product/${productId}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Remove the product from the local state after successful deletion
      setCart((prevCart) => ({
        ...prevCart,
        products: prevCart.products.filter(
          (product) => product.productId !== productId
        ),
      }));
    } catch (error) {
      console.error("Error deleting product:", error);
      setError(error);
    }
  };
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading cart data.</div>;

  return (
    <section className="section-content padding-y">
      {/* Your cart content here */}
      <table className="table table-borderless table-shopping-cart">
        <thead className="text-muted">
          <tr className="small text-uppercase">
            <th scope="col">Product</th>
            <th scope="col" width={120}>
              Quantity
            </th>
            <th scope="col" width={120}>
              Price
            </th>
            <th scope="col" className="text-right" width={200}>
              {" "}
            </th>
          </tr>
        </thead>
        <tbody>
          {cart && cart.products ? ( // Add conditional statement
            cart.products.map((product) => (
              <tr key={product.productId}>
                <td>
                  <Link to={`/detail/${product.productId}`}>
                  <figure className="itemside">
                    <div className="aside">
                      <a href={`/product/${product.productId}`} className="img-link">
                        <img
                          src={`http://localhost:8081/api/public/products/image/${product.image}`}
                          className="img-sm"
                          alt={product.productName}
                        />
                      </a>
                    </div>
                    <figcaption className="info">
                      <a href={`/product/${product.productId}`} className="title text-dark">
                        {product.productName}
                      </a>
                      <p className="text-muted small">
                        Size: XL, Color: blue, <br /> Brand: {product.brandName}
                      </p>
                    </figcaption>
                  </figure>
                  </Link>
                </td>
                <td>
                  <select className="form-control">
                    <option>1</option>
                    <option>2</option>
                    <option>10</option>
                    <option>99</option>
                  </select>
                </td>
                <td>
                  <div className="price-wrap">
                   <var className="price">${product.price}</var>
                    <small className="text-muted">
                      {" "}
                      ${product.specialPrice} each{" "}
                    </small>
                  </div>{" "}
                  {/* price-wrap .// */}
                </td>
                <td className="text-right">
                  <a
                    data-original-title="Save to Wishlist"
                    title
                    href
                    className="btn btn-light"
                    data-toggle="tooltip"
                  >
                    {" "}
                    <i className="fa fa-heart" />
                  </a>
                  <a href className="btn btn-light btn-round"
                  onClick={() => handleDelete(product.productId)}>
                    {" "}
                    Remove
                  </a>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={4}>No products in cart</td>
            </tr>
          )}
        </tbody>
      </table>
      {/* Your cart content here */}
    </section>
  );
}