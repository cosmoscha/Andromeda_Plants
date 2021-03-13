import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Redirect, useHistory } from "react-router-dom";
import { buyProducts } from "../../store/shoppingCart";
import "./cart.css";
const ShoppingCart = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  const loaded = useSelector((state) => state.session.loaded);
  const checkout = useSelector((state) => state.checkout.products);
  const history = useHistory();
  let getItems = Object.values(sessionStorage);
  console.log("getItem", getItems);
  useEffect(() => {
    dispatch(buyProducts(getItems));
  }, [dispatch]);

  const goToCheckout = (e) => {
    history.push("/checkout");
  };

  const checkoutMapper = (arr1, arr2) => {
    let newArr;
    if (checkout) {
      if (checkout.length) {
        newArr = arr1.map((product, i) => {
          return [product, arr2[i]];
        });
        newArr = newArr.map((i) => {
          const quant = JSON.parse(i[1]).quantity;
          const photo = i[0].photos;
          console.log("photo", photo);
          return (
            <>
              <div key={i.id}>
                <div>{i[0].name}</div>
                <img src={photo[0].photoKey} className="productImages2" />
                <div>{i[0].price * quant}</div>
                <div>{quant}</div>
              </div>
            </>
          );
        });
      }
    }
    return newArr;
  };

  return loaded && user ? (
    <>
      <div className="pages-container">
        <div>
          <div>{checkoutMapper(checkout, getItems)}</div>
          <div></div>
        </div>
        <div> hullo world</div>
        <div>
          <button onclick={goToCheckout}>checkout</button>
        </div>
      </div>
    </>
  ) : loaded ? (
    <Redirect to="/login" />
  ) : null;
};

export default ShoppingCart;
