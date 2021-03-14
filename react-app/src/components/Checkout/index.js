import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Redirect, useHistory } from "react-router-dom";
import { completeOrder, getForm } from "../../store/shoppingCart";
import "./Checkout.css";
const Checkout = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector((state) => state.session.user);
  const loaded = useSelector((state) => state.session.loaded);
  const [streetAddress, setStreetAddress] = useState("");
  const [city, setCity] = useState("");
  const [zipCode, setZipCode] = useState("");

  const completeOrders = (e) => {
    e.preventDefault();

    dispatch(completeOrder(streetAddress, city, zipCode));
  };
  console.log("the form info sent", streetAddress, city, zipCode);
  return loaded && user ? (
    <>
      <div className="checkout-container">
        <div>hello world</div>
        <div>goodbye</div>
        <div>hello again</div>
        <div>farewell</div>
        <div>hello there</div>
        <div>general Kenobi!</div>
        <div></div>
        <div>
          <form onSubmit={completeOrders}>
            <input
              onChange={(e) => setStreetAddress(e.target.value)}
              placeholder="street"
              value={streetAddress}
            ></input>
            <input
              onChange={(e) => setCity(e.target.value)}
              placeholder="city"
              value={city}
            ></input>
            <input
              onChange={(e) => setZipCode(e.target.value)}
              placeholder="zip"
              value={zipCode}
            ></input>
            <button id={streetAddress.id} type="submit">
              complete your order
            </button>
          </form>
        </div>
      </div>
    </>
  ) : loaded ? (
    <Redirect to="/login" />
  ) : null;
};
export default Checkout;
