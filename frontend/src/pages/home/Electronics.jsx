import React from 'react'

export default function Electronics() {
  return (
<section className="padding-bottom">
  <header className="section-heading heading-line">
    <h4 className="title-section text-uppercase">Electronics</h4>
  </header>
  <div className="card card-home-category">
    <div className="row no-gutters">
      <div className="col-md-3">
        <div className="home-category-banner bg-light-orange">
          <h5 className="title">Machinery items for manufacturers</h5>
          <p>Consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </p>
          <a href="#" className="btn btn-outline-primary rounded-pill">Source now</a>
          <img src={require("../../assets/images/items/14.jpg")} className="img-bg" />
        </div>
      </div> {/* col.// */}
      <div className="col-md-9">
        <ul className="row no-gutters bordered-cols">
          <li className="col-6 col-lg-3 col-md-4">
            <a href="#" className="item"> 
              <div className="card-body">
                <h6 className="title">Well made electronic  stuff collection</h6>
                <img className="img-sm float-right" src={require("../../assets/images/items/7.jpg")} /> 
                <p className="text-muted"><i className="fa fa-map-marker-alt" /> Tokyo, Japan</p>
              </div>
            </a>
          </li>
          <li className="col-6 col-lg-3 col-md-4">
            <a href="#" className="item"> 
              <div className="card-body">
                <h6 className="title">Another demo text for item stuff goes here</h6>
                <img className="img-sm float-right" src={require("../../assets/images/items/8.jpg")} /> 
                <p className="text-muted"><i className="fa fa-map-marker-alt" /> Hong Kong, China</p>
              </div>
            </a>
          </li>
          <li className="col-6 col-lg-3 col-md-4">
            <a href="#" className="item"> 
              <div className="card-body">
                <h6 className="title">Home and kitchen electronic  stuff collection</h6>
                <img className="img-sm float-right" src={require("../../assets/images/items/9.jpg")}/> 
                <p className="text-muted"><i className="fa fa-map-marker-alt" /> Tashkent, Uzb</p>
              </div>
            </a>
          </li>
          <li className="col-6 col-lg-3 col-md-4">
            <a href="#" className="item"> 
              <div className="card-body">
                <h6 className="title">Group of electronic  stuff collection</h6>
                <img className="img-sm float-right" src={require("../../assets/images/items/10.jpg")} /> 
                <p className="text-muted"><i className="fa fa-map-marker-alt" /> Guanjou, China</p>
              </div>
            </a>	
          </li>
          <li className="col-6 col-lg-3 col-md-4">
            <a href="#" className="item"> 
              <div className="card-body">
                <h6 className="title">Home and kitchen electronic  stuff collection</h6>
                <img className="img-sm float-right" src={require("../../assets/images/items/11.jpg")} /> 
                <p className="text-muted"><i className="fa fa-map-marker-alt" /> Guanjou, China</p>
              </div>
            </a>
          </li>
          <li className="col-6 col-lg-3 col-md-4">
            <a href="#" className="item"> 
              <div className="card-body">
                <h6 className="title">Home and kitchen electronic  stuff collection</h6>
                <img className="img-sm float-right" src={require("../../assets/images/items/12.jpg")} /> 
                <p className="text-muted"><i className="fa fa-map-marker-alt" /> Guanjou, China</p>
              </div>
            </a>
          </li>
          <li className="col-6 col-lg-3 col-md-4">
            <a href="#" className="item"> 
              <div className="card-body">
                <h6 className="title">Home and kitchen electronic  stuff collection</h6>
                <img className="img-sm float-right" src={require("../../assets/images/items/1.jpg")} /> 
                <p className="text-muted"><i className="fa fa-map-marker-alt" /> Guanjou, China</p>
              </div>
            </a>
          </li>
          <li className="col-6 col-lg-3 col-md-4">
            <a href="#" className="item"> 
              <div className="card-body">
                <h6 className="title">Home and kitchen electronic  stuff collection</h6>
                <img className="img-sm float-right" src={require("../../assets/images/items/2.jpg")} /> 
                <p className="text-muted"><i className="fa fa-map-marker-alt" /> Guanjou, China</p>
              </div>
            </a>
          </li>
        </ul>
      </div> {/* col.// */}
    </div> {/* row.// */}
  </div> {/* card.// */}
</section>
    
  )
}
