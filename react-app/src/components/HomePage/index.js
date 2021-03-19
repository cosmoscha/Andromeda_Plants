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

  const getRandomProduct = () => {
    let productsMap;
    if (products) {
      if (products.length) {
        productsMap = products
          .splice(-products.length, 9)
          .reverse()
          .map((product) => {
            const secondArr = product.photos[0];
            return (
              <>
                <div key={product.id} className="product-container">
                  <img src={secondArr.photoKey} className="productImages2" />
                  <div>{product.name}</div>
                  <div>quantity: {product.quantity}</div>
                  <div> added on {product.created.slice(0, 16)}</div>
                  <NavLink to={`/products/${product.id}`}> buy now </NavLink>
                </div>
              </>
            );
          });
      }
    }
    return productsMap;
  };

  return (
    <>
      <div className="splash-container"></div>
      <div className="product-preview-container">
        <hl>recently added</hl>
        <div className="image-grid">{getRandomProduct()}</div>
      </div>
    </>
  );
};

export default HomePage;
