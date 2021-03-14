import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Redirect, useHistory } from "react-router-dom";
import { getForm } from "../../store/shoppingCart";
import "./Checkout.css";
const Checkout = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector((state) => state.session.user);
  const loaded = useSelector((state) => state.session.loaded);
  const addy = useSelector((state) => state.checkout.addy);
  const [streetAddress, setStreetAddress] = useState("");
  const [city, setCity] = useState("");
  const [zipCode, setZipCode] = useState("");

  console.log("addddddy", addy);

  useEffect(() => {
    dispatch(getForm());
    console.log("dispatching to get form");
  }, [dispatch]);

  const updateStreetAddress = (e) => {
    setStreetAddress(e.target.value);
  };

  const updateCity = (e) => {
    setCity(e.target.value);
  };

  const updateZipCode = (e) => {
    setZipCode(e.target.value);
  };

  const completeOrder = (e) => {
    dispatch(
      completeOrder({
        streetAddress: streetAddress,
        city: city,
        zipCode: zipCode,
      })
    );
  };
  return (
    <>
      <div className="checkout-container">
        <div>hello world</div>
        <div>goodbye</div>
        <div>hello again</div>
        <div>farewell</div>
        <div>hello there</div>
        <div>{addy}</div>
        <div></div>
        <input onClick={updateStreetAddress} placeholder="street"></input>
        <input onClick={updateCity} placeholder="city"></input>
        <input onClick={updateZipCode} placeholder="zip"></input>
        <button onclick={completeOrder}>ss</button>
      </div>
    </>
  );
};
export default Checkout;
