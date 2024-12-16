import React from 'react';
import { useLocation } from 'react-router-dom'; // Import useLocation to access the state
import axios from 'axios';
import { useNavigate } from "react-router-dom";
export default function SearchResult() {
    const location = useLocation(); // Access the state passed from Header
    const searchResults = location.state?.searchResults || {}; // Retrieve searchResults from state
    const products = searchResults.content || []; // Extract the array of products

    console.log("search results:", products);
    const navigate = useNavigate();

    const handleAddToCart = async () => {
        try {
            const email = localStorage.getItem("email");
            const cartId = localStorage.getItem("cartId");
            const token = localStorage.getItem("authToken");

            if (!token) {
                alert("Authentication token is missing. Please log in again.");
                return;
            }

            if (!cartId) {
                alert("Cart ID is missing.");
                return;
            }

            for (const product of products) {
                await axios.post(
                    `http://localhost:8081/api/public/carts/${cartId}/products/${product.productId}/quantity/${product.quantity}`,
                    {},
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
            }

            // Notify the user of success
            alert("Products added to cart!");
            navigate("/cart");

        } catch (error) {
            console.error("Error adding to cart:", error.message || error);

            if (error.response) {
                console.error("Response error data:", error.response.data);
                console.error("Response error status:", error.response.status);

                if (error.response.status === 401) {
                    alert("Your session has expired. Please log in again.");
                    // Optionally redirect to the login page
                    // window.location.href = '/login';
                } else {
                    alert("Failed to add product to cart.");
                }
            } else {
                alert("Network or server error. Please try again later.");
            }
        }
    };

    return (
        <section className="section-content padding-y">
            <div className="container">
                <div className="row">
                    <main className="col-md-10">
                        <header className="mb-3">
                            <div className="form-inline">
                                <strong className="mr-md-auto">{products.length} Items found </strong>
                                <select className="mr-2 form-control">
                                    <option>Latest items</option>
                                    <option>Trending</option>
                                    <option>Most Popular</option>
                                    <option>Cheapest</option>
                                </select>
                                <div className="btn-group">
                                    <a href="page-listing-grid.html" className="btn btn-light" data-toggle="tooltip" title="List view">
                                        <i className="fa fa-bars" /></a>
                                    <a href="page-listing-large.html" className="btn btn-light active" data-toggle="tooltip" title="Grid view">
                                        <i className="fa fa-th" /></a>
                                </div>
                            </div>
                        </header>

                        {/* Render search results */}
                        {products.map((product) => (
                            <article className="card card-product-list" key={product.productId}>
                                <div className="row no-gutters">
                                    <aside className="col-md-3">
                                        <a href="#" className="img-wrap">
                                            <img
                                                src={`http://localhost:8081/api/public/products/image/${product.image}`}
                                                alt={product.productName} />
                                        </a>

                                    </aside>
                                    <div className="col-md-6">
                                        <div className="info-main">
                                            <a href="#" className="h5 title">{product.productName}</a>
                                            <div className="rating-wrap mb-2">
                                                <ul className="rating-stars">
                                                    <li style={{ width: '100%' }} className="stars-active">
                                                        <i className="fa fa-star" /> <i className="fa fa-star" />
                                                        <i className="fa fa-star" /> <i className="fa fa-star" />
                                                        <i className="fa fa-star" />
                                                    </li>
                                                    <li>
                                                        <i className="fa fa-star" /> <i className="fa fa-star" />
                                                        <i className="fa fa-star" /> <i className="fa fa-star" />
                                                        <i className="fa fa-star" />
                                                    </li>
                                                </ul>
                                                <div className="label-rating">9/10</div>
                                            </div>
                                            <p class="mb-3">
                                                <span class="tag"> <i class="fa fa-check"></i> Verified</span>
                                                <span class="tag"> 5 Years </span>
                                                <span class="tag"> 80 reviews </span>
                                                <span class="tag"> Russia </span>
                                            </p>
                                            <p>{product.description}</p>
                                        </div>
                                    </div>
                                    <aside className="col-sm-3">
                                        <div className="info-aside">
                                            <div className="price-wrap">
                                                <span className="h5 price">${product.price}</span>
                                                <small className="text-muted">/per item</small>
                                            </div> {/* price-wrap.// */}
                                            <small className="text-warning">Paid shipping</small>
                                            <p className="text-muted mt-3">Grand textile Co</p>
                                            <p className="mt-3">
                                                <a href="#" className="btn btn-outline-primary" onClick={handleAddToCart}> <i className="fas fa-shopping-cart" /> Add to cart </a>
                                                <a href="#" className="btn btn-light"><i className="fa fa-heart" /> Save </a>
                                            </p>
                                            <label className="custom-control mt-3 custom-checkbox">
                                                <input type="checkbox" className="custom-control-input" />
                                                <div className="custom-control-label">Add to compare
                                                </div>
                                            </label>
                                        </div> {/* info-aside.// */}
                                    </aside>

                                </div>
                            </article>
                        ))}

                        {/* Pagination */}
                        {/* ... */}
                    </main>
                </div>
            </div>
        </section>
    );
}
