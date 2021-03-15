import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Redirect, useHistory } from "react-router-dom";

const SearchResult = () => {
  const prodResults = useSelector((state) => state.search.products);
  console.log("these are the plant results", prodResults);

  const prodMapper = () => {
    let results;
    if (prodResults) {
      if (prodResults.length) {
        results = prodResults.map((product) => {
          return (
            <>
              <NavLink to={`/products/${product.id}`}>{product.name}</NavLink>
              <img src={product.photos[0].photoKey} className="productImages" />
            </>
          );
        });
      }
    }
    return results;
  };

  return (
    <>
      <div>Gandalf the blood red</div>
      <div>{prodMapper()}</div>
    </>
  );
};

export default SearchResult;
