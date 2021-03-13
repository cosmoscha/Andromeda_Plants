import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Redirect } from "react-router-dom";
import { buyProducts } from "../../store/shoppingCart";
import "./cart.css";
const ShoppingCart = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  const loaded = useSelector((state) => state.session.loaded);
  const checkout = useSelector((state) => state.checkout.products);
  let getItems = Object.values(sessionStorage);
  console.log("getItem", getItems);
  useEffect(() => {
    dispatch(buyProducts(getItems));
  }, [dispatch]);

  let newArr;
  if (checkout) {
    if (checkout.length) {
      newArr = checkout.map((product, i) => {
        return [product, getItems[i]];
      });
    }
  }

  console.log("1111111111111111111111", newArr);

  // const checkoutMapper = (arr) => {
  //   arr = arr.map((product) => {
  //     console.log("product", product);
  //   });
  //   return arr;
  // };
  // console.log("qqqqqqqqqqqqqqqqqq", checkoutMapper(newArr));
  return loaded && user ? (
    <>
      <div className="pages-container">
        <div>
          {/* <div>{checkoutMapper(checkout)}</div> */}
          <div></div>
        </div>
        <div> hullo world</div>
        <div>
          <button>checkout</button>
        </div>
      </div>
    </>
  ) : loaded ? (
    <Redirect to="/login" />
  ) : null;
};

export default ShoppingCart;
