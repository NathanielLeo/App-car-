import React, { useState, useEffect } from "react";

export default function Deal() {
  const calculateTimeLeft = () => {
    const difference = +new Date("2024-12-31") - +new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60), 
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="padding-bottom">
      <div className="card card-deal">
        <div className="row no-gutters">
          <div className="col-md-3 col-6">
            <div className="col-heading content-body">
              <header className="section-heading">
                <h3 className="section-title">Deals and offers</h3>
                <p>Hygiene equipments</p>
              </header>
              <div className="timer">
                <div>
                  <span className="num">{String(timeLeft.days).padStart(2, "0")}</span> <small>Days</small>
                </div>
                <div>
                  <span className="num">{String(timeLeft.hours).padStart(2, "0")}</span> <small>Hours</small>
                </div>
                <div>
                  <span className="num">{String(timeLeft.minutes).padStart(2, "0")}</span> <small>Min</small>
                </div>
                <div>
                  <span className="num">{String(timeLeft.seconds).padStart(2, "0")}</span> <small>Sec</small>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-9 col-6">
            <div className="row no-gutters items-wrap">
              <div className="col-md col-6">
                <figure className="card-product-grid card-sm">
                  <a href="#" className="img-wrap">
                    <img src={require("../../assets/images/items/3.jpg")} alt="Summer clothes" />
                  </a>
                  <div className="text-wrap p-3">
                    <a href="#" className="title">
                      Summer clothes
                    </a>
                    <span className="badge badge-danger">-20%</span>
                  </div>
                </figure>
              </div>
              <div className="col-md col-6">
                <figure className="card-product-grid card-sm">
                  <a href="#" className="img-wrap">
                    <img src={require("../../assets/images/items/4.jpg")} alt="Some category" />
                  </a>
                  <div className="text-wrap p-3">
                    <a href="#" className="title">
                      Some category
                    </a>
                    <span className="badge badge-danger">-5%</span>
                  </div>
                </figure>
              </div>
              <div className="col-md col-6">
                <figure className="card-product-grid card-sm">
                  <a href="#" className="img-wrap">
                    <img src={require("../../assets/images/items/5.jpg")} alt="Another category" />
                  </a>
                  <div className="text-wrap p-3">
                    <a href="#" className="title">
                      Another category
                    </a>
                    <span className="badge badge-danger">-20%</span>
                  </div>
                </figure>
              </div>
              <div className="col-md col-6">
                <figure className="card-product-grid card-sm">
                  <a href="#" className="img-wrap">
                    <img src={require("../../assets/images/items/6.jpg")} alt="Home apparel" />
                  </a>
                  <div className="text-wrap p-3">
                    <a href="#" className="title">
                      Home apparel
                    </a>
                    <span className="badge badge-danger">-15%</span>
                  </div>
                </figure>
              </div>
              <div className="col-md col-6">
                <figure className="card-product-grid card-sm">
                  <a href="#" className="img-wrap">
                    <img src={require("../../assets/images/items/7.jpg")} alt="Smart watches" />
                  </a>
                  <div className="text-wrap p-3">
                    <a href="#" className="title text-truncate">
                      Smart watches
                    </a>
                    <span className="badge badge-danger">-10%</span>
                  </div>
                </figure>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
