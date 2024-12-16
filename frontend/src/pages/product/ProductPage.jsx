// import React, { useEffect, useState } from "react";
// import { GET_ID } from "../../api/apiService"; // Adjust the import path based on your project structure
// import axios from "axios";
// import { useParams } from 'react-router-dom';

// export default function DetailProduct() {
//   const [product, setProduct] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [quantity, setQuantity] = useState(1); // State for managing quantity
//   const { productId } = useParams(); // Extract productId from URL parameters
//   const token = localStorage.getItem("authToken");

//   useEffect(() => {
//     async function fetchProduct() {
//       try {
//         const response = await GET_ID(
//           "http://localhost:8080/api/public/products",
//           productId
//         );
//         setProduct(response);
//       } catch (error) {
//         setError(error);
//       } finally {
//         setLoading(false);
//       }
//     }

//     fetchProduct();
//   }, [productId]);

//   const handleIncrease = () => {
//     setQuantity((prevQuantity) => prevQuantity + 1);
//   };

//   const handleDecrease = () => {
//     setQuantity((prevQuantity) => (prevQuantity > 1 ? prevQuantity - 1 : 1));
//   };

// const handleAddToCart = async () => {
//   try {
//     // Retrieve necessary values from localStorage
//     const email = localStorage.getItem("email");
//     const cartId = localStorage.getItem("cartId");
//     const token = localStorage.getItem("authToken"); // Ensure correct token retrieval

//     // Check if the token exists
//     if (!token) {
//       alert("Authentication token is missing. Please log in again.");
//       return;
//     }

//     // Ensure cartId and productId are properly retrieved
//     if (!cartId || !product?.productId) {
//       alert("Cart ID or product ID is missing.");
//       return;
//     }

//     // Debugging output
//     console.log("Adding to cart with token:", token);
//     console.log("Cart ID:", cartId, "Product ID:", product.productId, "Quantity:", quantity);

//     // Make the API call to add the product to the cart
//     const response = await axios.post(
//       `http://localhost:8080/api/public/carts/${cartId}/products/${product.productId}/quantity/${quantity}`,
//       {},
//       {
//         headers: {
//           Authorization: `Bearer ${token}`, // Ensure correct Authorization header
//         },
//       }
//     );

//     // Notify the user of success
//     alert("Product add to cart!");
//   } catch (error) {
//     // Log detailed error information
//     console.error("Error adding to cart:", error.message || error);

//     // Check if the error response exists and handle specific cases
//     if (error.response) {
//       console.error("Response error data:", error.response.data);
//       console.error("Response error status:", error.response.status);

//       // Handle specific error cases
//       if (error.response.status === 401) {
//         alert("Your session has expired. Please log in again.");
//         // Optionally redirect to the login page
//         // window.location.href = '/login';
//         } else {
//         alert("Failed to add product to cart.");
//       }
//     } else {
//       alert("Network or server error. Please try again later.");
//     }
//   }
// };



//   if (loading) return <div>Loading...</div>;
//   if (error) return <div>Error loading product details.</div>;

//   return (
//     <section className="section-content bg-white padding-y">
//       <div className="container">
//         <div className="row">
//           <aside className="col-md-6">
//             <div className="card">
//               <article className="gallery-wrap">
//                 <div className="img-big-wrap">
//                   <div>
//                     <a href="#">
//                       <img
//                         src={`http://localhost:8080/api/public/products/image/${product.image}`}
//                         alt={product.productName}
//                       />
//                     </a>
//                   </div>
//                 </div>
//               </article>
//             </div>
//           </aside>
//           <main className="col-md-6">
//             <article className="product-info-aside">
//               <h2 className="title mt-3">{product.productName}</h2>
//               <div className="rating-wrap my-3">
//                 {/* Display static rating as example */}
//                 <ul className="rating-stars">
//                   <li style={{ width: "80%" }} className="stars-active">
//                     <i className="fa fa-star" /> <i className="fa fa-star" />
//                     <i className="fa fa-star" /> <i className="fa fa-star" />
//                     <i className="fa fa-star" />
//                   </li>
//                   <li>
//                     <i className="fa fa-star" /> <i className="fa fa-star" />
//                     <i className="fa fa-star" /> <i className="fa fa-star" />
//                     <i className="fa fa-star" />
//                   </li>
//                 </ul>
//                 <small className="label-rating text-muted">132 reviews</small>
//                 <small className="label-rating text-success">
//                   {" "}
//                   <i className="fa fa-clipboard-check" /> 154 orders{" "}
//                 </small>
//               </div>
//               <div className="mb-3">
//                 <var className="price h4">USD {product.price}</var>
//                 <span className="text-muted">
//                   USD {product.specialPrice} incl. VAT
//                 </span>
//               </div>
//               <p>{product.description}</p>
//               <dl className="row">
//                 <dt className="col-sm-3">Category</dt>
//                 <dd className="col-sm-9">{product.categoryName}</dd>
//                 <dt className="col-sm-3">Brand</dt>
//                 <dd className="col-sm-9">{product.brandName}</dd>
//                 <dt className="col-sm-3">Quantity</dt>
//                 <dd className="col-sm-9">{product.quantity}</dd>
//               </dl>
//               <div className="form-row mt-4 align-items-center">
//                 <div className="form-group col-md-4 d-flex">
//                   <button
//                     className="btn btn-light"
//                     type="button"
//                     onClick={handleDecrease}
//                   >
//                     {" "}
//                     −{" "}
//                   </button>
//                   <input
//                     type="text"
//                     className="form-control text-center"
//                     value={quantity}
//                     readOnly
//                   />
//                   <button
//                     className="btn btn-light"
//                     type="button"
//                     onClick={handleIncrease}
//                   >
//                     {" "}
//                     +{" "}
//                   </button>
//                 </div>
//                 <div className="form-group col-md">
//                   <button
//                     className="btn btn-primary"
//                     onClick={handleAddToCart}
//                   >
//                     <i className="fas fa-shopping-cart" />{" "}
//                     <span className="text">Add to cart</span>
//                   </button>
//                   <a href="#" className="btn btn-light">
//                     <i className="fas fa-envelope" />{" "}
//                     <span className="text">Contact supplier</span>
//                   </a>
//                 </div>
//               </div>
//             </article>
//           </main>
//         </div>
//       </div>
//     </section>
//   );
// }