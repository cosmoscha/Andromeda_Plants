import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, NavLink, useHistory } from "react-router-dom";
import PlantMenu from "./PlantMenu";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import "./home.css";
import { getAllProduct } from "../../store/products";

const HomePage = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllProduct());
  }, [dispatch]);

  const products = useSelector((state) => state.products.products);
  console.log("product store", products);
  // const [test, setTest] = useState("hidden");
  // const tester = () => {
  //   if (test === "") {
  //     setTest("hidden");
  //   } else {
  //     setTest("");
  //   }
  // };

  // const handleDragStart = (e) => e.preventDefault();
  // const productMapper = (arr) => {
  //   if (products) {
  //     arr = arr.map((product) => {
  //       return (
  //         <div onDragStart={handleDragStart}>
  //           <img src={product.photos[0]} className="productImages" />
  //           <div>{product.name}</div>
  //         </div>
  //       );
  //     });
  //   }
  //   return <AliceCarousel mouseTracking items={arr} />;
  // };

  const getRandInt = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };
  const getRandomProduct = () => {
    if (products) {
      let sampleProduct = products[getRandInt(1, products.length - 1)];
      console.log("sampleproduct", sampleProduct);
      return (
        <div className="sample-product-container">
          <img
            src={sampleProduct.photos[0].photoKey}
            className="productImages"
          />
          <div className="sample-link-container">
            <NavLink to={`/products/${sampleProduct.id}`}>
              {sampleProduct.name}
            </NavLink>
          </div>
        </div>
      );
    }
  };

  return (
    <>
      <div className="splash-container"></div>
      <div className="product-preview-container">
        <div>{getRandomProduct()}</div>
        <div>{getRandomProduct()}</div>
        <div>{getRandomProduct()}</div>
      </div>
    </>
  );
};

export default HomePage;
