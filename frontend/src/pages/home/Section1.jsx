import React, { useEffect, useState } from "react";
import { GET_ALL } from "../../api/apiService";

import startsActive from "../../assets/images/icons/stars-active.svg";
import startsDisable from "../../assets/images/icons/starts-disable.svg";
import { Link } from "react-router-dom";

const cardTextStyle = {
  maxWidth: "80%",
};

const Section1 = ({ categoryName, categoryId }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const params = {
      pageNumber: 0,
      pageSize: 5,
      sortBy: 'productId',
      sortOrder: 'asc',
    };

    GET_ALL(`categories/${categoryId}/products`, params)
      .then(response => {
        console.log("response", response.content);
        setProducts(response.content); // Set the products state
      })
      .catch(error => {
        console.error('Failed to fetch products:', error); // Handle errors
      });
  }, [categoryId]);

  return (
    <section className="padding-bottom">
      <header className="section-heading mb-4">
        <h3 className="title-section">{categoryName}</h3>
      </header>
      <div className="row">
        {products.length > 0 &&
          products.map((row) => (
            <div className="col-xl-3 col-lg-3 col-md-4 col-6" key={row.id}>
              <div className="card card-product-grid">
                <Link to={`/Detail?productId=${row.id}`} className="img-wrap">
                  <img src={`http://localhost:8081/api/public/products/image/${row.image}`} alt={row.productName} />
                </Link>
                <figcaption className="info-wrap">
                  <ul className="rating-stars mb-1">
                    <li style={cardTextStyle} className="stars-active">
                      <img src={startsActive} alt="Active Stars" />
                    </li>
                    <li>
                      <img src={startsDisable} alt="Disabled Stars" />
                    </li>
                  </ul>
                  <div>
                    <Link to={`/Detail?productId=${row.id}`} className="title">
                      {row.productName}
                    </Link>
                  </div>
                  <div className="price h5 mt-2">${row.price}</div>
                </figcaption>
              </div>
            </div>
          ))}
      </div>
    </section>
  );
};

export default Section1;
