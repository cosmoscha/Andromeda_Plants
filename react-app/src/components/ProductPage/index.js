import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { NavLink, Redirect } from "react-router-dom";
import { getProductTag } from "../../store/tags";
import "./ProductPage.css";

const ProductPage = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.tags.products);
  const user = useSelector((state) => state.session.user);
  const loaded = useSelector((state) => state.session.loaded);
  console.log("qweqweqweqwe", products);
  const tagId = parseInt(useParams().id);

  useEffect(() => {
    dispatch(getProductTag(tagId));
  }, [dispatch]);

  const productMapper = (arr) => {
    if (products) {
      if (products.length) {
        arr = arr.map((product) => {
          const secondArr = product.photos[0];
          return (
            <>
              <div key={product.id} className="product-container">
                <img src={secondArr.photoKey} className="productImages2" />
                <div>{product.name}</div>
                <div>quantity: {product.quantity}</div>
                <NavLink to={`/products/${product.id}`}> buy now </NavLink>
              </div>
            </>
          );
        });
      }
    }
    return arr;
  };

  console.log("ssssssssssssswwwwsssss", productMapper(products));

  return loaded && user ? (
    <>
      {products && (
        <div className="image-grid-container">
          <div>
            <NavLink to="/">back to home</NavLink>
          </div>
          <div className="image-grid">{productMapper(products)}</div>
        </div>
      )}
    </>
  ) : loaded ? (
    <Redirect to="/login" />
  ) : null;
};
export default ProductPage;
