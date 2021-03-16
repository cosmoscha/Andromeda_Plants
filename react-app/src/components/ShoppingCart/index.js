import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import { buyProducts, removeProduct } from "../../store/shoppingCart";
import "./cart.css";
const ShoppingCart = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const user = useSelector((state) => state.session.user);
  const loaded = useSelector((state) => state.session.loaded);
  const checkout = useSelector((state) => state.checkout);
  let getItems = Object.values(sessionStorage);

  getItems = getItems.map((item) => {
    return JSON.parse(item);
  });

  useEffect(() => {
    dispatch(buyProducts(getItems));
  }, [dispatch]);

  console.log("getitems", checkout);
  const checkoutMapper = (arr) => {
    console.log("arr", arr);
    if (checkout) {
      if (checkout.length) {
        arr = arr.map((product) => {
          console.log("arrindex", product.productId);
          console.log("product within the map", product);
          return (
            <>
              <div key={product.productId} className="checkoutItems">
                <div>{product.name}</div>
                <img src={product.photo} />
                <div>{product.price}</div>
                <div>{product.quantity}</div>
                <button
                  onClick={() => dispatch(removeProduct(product.productId))}
                >
                  remove from cart
                </button>
              </div>
            </>
          );
        });
      }
    }
    return arr;
  };

  const goToCheckout = () => {
    history.push("/checkout");
  };

  return loaded && user ? (
    <>
      <div className="pages-container">
        <div>{checkoutMapper(checkout, getItems)}</div>
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
