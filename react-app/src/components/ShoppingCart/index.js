import React, { useEffect, useState } from "react";
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


let grandTotal = 0 ;
  const checkoutMapper = () => {
    let result = getItems.map((product) => {
      console.log("products", product.quantity);
      let subtotal=product.quantity * product.price
      grandTotal += subtotal
      console.log("grandTotal", grandTotal)


      return (
        <>

          <div key={product.productId} className="checkoutItems" style={{display: "flex", justifyContent:"center", flexDirection: "column", alignItems: "center", border: "solid", borderColor: "black"}}>
            <div style={{fontSize: "175%", fontWeight:"bold"}}>{product.name}</div>
            <img src={product.photo} style={{borderRadius: "30%"}} />
            <div style={{fontSize: "125%"}}>price for each:{product.price}</div>
            <div>
            <div style={{fontSize: "125%"}}>quantity: {product.quantity}</div>
            </div>
            <br></br>
            <div style={{fontSize: "125%"}}>subtotal: {subtotal}</div>
            <button onClick={removeFromStore} value={product.productId}>
              remove from cart
            </button>
            <br></br>
            <br></br>
            
          </div>
        </>
      );
    });
    return result;
  };
  

  const goToCheckout = () => {
    history.push("/checkout");
  };

  // grandTotal = grandTotal.reduce(function(prev, curr){
  //   return prev + curr
  // })

  console.log("ffffffeefe", grandTotal)

  return (
    <>
      <div className="pages-container" style={{backgroundColor:"burlywood", minHeight: "100vh"}}>
        <div>{checkoutMapper()}</div>
        <br></br>
  
        <div style={{display: "flex", justifyContent:"center", flexDirection: "column", alignItems: "center", fontSize: "200%"}}>
          <div> grand total: ${grandTotal}</div>
          <button onClick={goToCheckout} style={{fontSize: "150%", borderRadius: "10%", color: "green"}}> checkout</button>
        </div>
      </div>
    </>
  );
};

export default ShoppingCart;
