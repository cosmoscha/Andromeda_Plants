import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import { buyProducts } from "../../store/shoppingCart";
import "./cart.css";
const ShoppingCart = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const user = useSelector((state) => state.session.user);
  const loaded = useSelector((state) => state.session.loaded);
  const checkout = useSelector((state) => state.checkout);
  let getItems = Object.values(sessionStorage);
  console.log("getItems initial values", getItems);

  getItems = getItems.map((item) => {
    return JSON.parse(item);
  });

  useEffect(() => {
    dispatch(buyProducts(getItems));
  }, [dispatch]);

  const removeFromStore = (e) => {
    sessionStorage.removeItem(`productId ${e.target.value}`);
    dispatch(buyProducts(getItems));
  };

  const checkoutMapper = () => {
    let result = getItems.map((product) => {
      console.log("products", product);
      return (
        <>
          <div key={product.productId} className="checkoutItems">
            <div>{product.name}</div>
            <img src={product.photo} />
            <div>{product.price}</div>
            <div>{product.quantity}</div>
            <button onClick={removeFromStore} value={product.productId}>
              remove from cart
            </button>
          </div>
        </>
      );
    });
    return result;
  };

  const goToCheckout = () => {
    history.push("/checkout");
  };

  return loaded && user ? (
    <>
      <div className="pages-container">
        <div>{checkoutMapper()}</div>
        <div> hullo world</div>
        <div>
          <button onClick={goToCheckout}> checkout</button>
        </div>
      </div>
    </>
  ) : loaded ? (
    <Redirect to="/login" />
  ) : null;
};

export default ShoppingCart;
