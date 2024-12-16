import React from "react";
import Slider from "../pages/home/Slider";
import Deal from "../pages/home/Deal";
import Apparel from "../pages/home/Brand";
import Electronics from "../pages/home/Electronics";
import Request from "../pages/home/Request";
import Item from "../pages/home/Items";
import Region from "../pages/home/Region";
import Service from "../pages/home/Service";
import Subscribe from "../pages/home/Subscribe";
function Home(props) {
  return (
    <div class="container">
      <Slider />
      <Deal/>
      <Apparel/>
      <Electronics/>
      <Request/>
      <Item/>
      <Region/>
      <Service/>
      <Subscribe/>
    </div>
  );
}
export default Home;