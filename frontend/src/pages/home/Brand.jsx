import React, { useEffect, useState } from "react";
import { GET_ALL, GET_IMG, GET_LOGO } from "../../api/apiService"; // Import the necessary functions

export default function Brand() {
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state to handle API request

  useEffect(() => {
    const params = {
      pageNumber: 0,
      pageSize: 8,
      sortBy: "brandId",
      sortOrder: "asc",
    };
    GET_ALL("brands", params)
      .then((response) => {
        setBrands(response.content);
        console.log("Fetched brands:", response.content);
        setLoading(false); // Set loading to false after data is fetched
      })
      .catch((error) => {
        console.error("Failed to fetch brands:", error);
        setLoading(false); // Set loading to false in case of an error
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Display a loading message while data is being fetched
  }

  return (
    <section className="padding-bottom">
      <header className="section-heading heading-line">
        <h4 className="title-section text-uppercase">Brand</h4>
      </header>
      <div className="card card-home-category">
        <div className="row no-gutters">
          {/* Static banner */}
          <div className="col-md-3">
            <div className="home-category-banner bg-light-orange">
              <h5 className="title">Best trending clothes only for summer</h5>
              <p>
                Consectetur adipisicing elit, sed do eiusmod tempor incididunt
                ut labore et dolore magna aliqua.{" "}
              </p>
              <a href="#" className="btn btn-outline-primary rounded-pill">
                Source now
              </a>
              <img
                src={require("../../assets/images/items/2.jpg")}
                className="img-bg"
                alt="Trending Summer Clothes"
              />
            </div>
          </div>
          {/* Dynamic brand list */}
          <div className="col-md-9">
            <ul className="row no-gutters bordered-cols">
              {brands.map((brand) => (
                <li key={brand.brandId} className="col-6 col-lg-3 col-md-4">
                  <a href={`/Brand?brandId=${brand.brandId}`} className="item">
                    <div className="card-body">
                      <h5 className="title font-weight-bold text-uppercase">
                        {brand.brandName}
                      </h5>
                      <img
                        className="img-md float-right img-fluid"
                        src={`http://localhost:8081/api/public/brands/logo/${brand.logo}`}
                        alt={brand.brandName}
                      />
                      <p className="text-muted">
                        <i className="fa fa-map-marker-alt" /> {brand.location}
                      </p>
                    </div>
                  </a>
                </li>
                ))}
            </ul>
          </div>{" "}
          {/* col.// */}
        </div>{" "}
        {/* row.// */}
      </div>{" "}
      {/* card.// */}
    </section>
  );
}