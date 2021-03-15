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
  const checkout = useSelector((state) => state.checkout.products);
  let getItems = Object.values(sessionStorage);

  useEffect(() => {
    dispatch(buyProducts(getItems));
  }, [dispatch]);

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

          return (
            <>
              <div key={i.id}>
                <div>{i[0].name}</div>
                <img src={photo[0].photoKey} className="productImages2" />
                <div>{i[0].price * quant}</div>
                <div>{quant}</div>
                <button onClick={() => dispatch(removeProduct(arr1[i]))}>
                  remove from cart
                </button>
              </div>
            </>
          );
        });
      }
    }
    return newArr;
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
