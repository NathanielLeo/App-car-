import React from "react";

export default function Service() {
  return (
    <section className="padding-bottom">
      <header className="section-heading heading-line">
        <h4 className="title-section text-uppercase">Trade services</h4>
      </header>
      <div className="row">
        <div className="col-md-3 col-sm-6">
          <article className="card card-post">
            <img
              src={require("../../assets/images/posts/1.jpg")}
              className="card-img-top"
            />
            <div className="card-body">
              <h6 className="title">Trade Assurance</h6>
              <p className="small text-uppercase text-muted">
                Order protection
              </p>
            </div>
          </article>{" "}
          {/* card.// */}
        </div>{" "}
        {/* col.// */}
        <div className="col-md-3 col-sm-6">
          <article className="card card-post">
            <img
              src={require("../../assets/images/posts/2.jpg")}
              className="card-img-top"
            />
            <div className="card-body">
              <h6 className="title">Pay anytime</h6>
              <p className="small text-uppercase text-muted">
                Finance solution
              </p>
            </div>
          </article>{" "}
          {/* card.// */}
        </div>{" "}
        {/* col.// */}
        <div className="col-md-3 col-sm-6">
          <article className="card card-post">
            <img
              src={require("../../assets/images/posts/3.jpg")}
              className="card-img-top"
            />
            <div className="card-body">
              <h6 className="title">Inspection solution</h6>
              <p className="small text-uppercase text-muted">Easy Inspection</p>
            </div>
          </article>{" "}
          {/* card.// */}
        </div>{" "}
        {/* col.// */}
        <div className="col-md-3 col-sm-6">
          <article className="card card-post">
            <img
              src={require("../../assets/images/posts/4.jpg")}
              className="card-img-top"
            />
            <div className="card-body">
              <h6 className="title">Ocean and Air Shipping</h6>
              <p className="small text-uppercase text-muted">
                Logistic services
              </p>
            </div>
          </article>{" "}
          {/* card.// */}
        </div>{" "}
        {/* col.// */}
      </div>{" "}
      {/* row.// */}
    </section>
  );
}
