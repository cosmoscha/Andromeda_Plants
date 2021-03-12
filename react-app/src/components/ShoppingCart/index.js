import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { buyProducts } from "../../store/shoppingCart";
import "./cart.css";
const ShoppingCart = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  const loaded = useSelector((state) => state.session.loaded);
  const checkout = useSelector((state) => state.checkout.products);
  const getItems = Object.values(sessionStorage);
  console.log("getItem", getItems);
  useEffect(() => {
    dispatch(buyProducts(getItems));
  }, [dispatch]);
  console.log(".................", checkout);

  const checkoutMapper = (arr) => {
    if (checkout) {
      if (checkout.length) {
        arr = arr.map((product) => {
          console.log("2e2dsdwd", product.name);
          const imgSrc = product.photos[0].photoKey;
          return (
            <>
              <div key={product.id} className="product-container">
                <img src={imgSrc} className="productImages2" />
                <div>{product.name}</div>
                <div>quantity: {product.quantity}</div>
              </div>
            </>
          );
        });
      }
    }
    return arr;
  };
  console.log("qqqqqqqqqqqqqqqqqq", checkoutMapper(checkout));
  return loaded && user ? (
    <>
      <div className="pages-container">
        <div>{checkoutMapper(checkout)}</div>
        <div> hullo world</div>
      </div>
    </>
  ) : loaded ? (
    <Redirect to="/login" />
  ) : null;
};

export default ShoppingCart;
