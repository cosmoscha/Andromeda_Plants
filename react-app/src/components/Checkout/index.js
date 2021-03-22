import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Redirect, useHistory } from "react-router-dom";
import { completeOrder, getForm } from "../../store/shoppingCart";
import { usePlacesAutocomplete } from "./AutoCompleteHook";

import "./Checkout.css";
const Checkout = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector((state) => state.session.user);
  const loaded = useSelector((state) => state.session.loaded);
  const [streetAddress, setStreetAddress] = useState("");
  const [city, setCity] = useState("");
  const [zipCode, setZipCode] = useState("");

  const [selectedPrediction, setSelectedPrediction] = useState(null)
  const [searchValue, setSearchValue] = useState("")
  const predictions = usePlacesAutocomplete(searchValue)

  const handlePredictionSelection = (e, prediction) => {
    e.preventDefault()
    setSelectedPrediction(prediction)
  }

  const completeOrders = (e) => {
    e.preventDefault();
    const address = {
      streetAddress: streetAddress,
      city: city,
      zipCode: zipCode,
    };
    console.log("addddddy", address);

    dispatch(completeOrder(address));
  };
  return loaded && user ? (
    <>
      <div className="checkout-container">
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

      {/* <form  className="checkout-container">
        <input
          name="predictionSearch"
          value={searchValue}
          onChange={e => setSearchValue(e.target.value)}
        />
        <img
          src="https://developers.google.com/maps/documentation/images/powered_by_google_on_white.png"
          alt="Powered by Google"
        />
        <ul>
          {predictions?.map(prediction => (
            <li key={prediction?.place_id}>
              <button
                onClick={e => handlePredictionSelection(e, prediction)}
                onKeyDown={e => handlePredictionSelection(e, prediction)}
              >
                {prediction?.structured_formatting?.main_text || "Not found"}
              </button>
            </li>
          ))}
        </ul>
        <h3>You searched for: {searchValue}</h3>
        <h3>
          You selected:{" "}
          {selectedPrediction?.structured_formatting?.main_text || "None"}
        </h3>
      </form> */}
    </>
  ) : loaded ? (
    <Redirect to="/login" />
  ) : null;
};
export default Checkout;
