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
  let evenNewerArr;
  if (checkout) {
    if (checkout.length) {
      newArr = checkout.map((product, i) => {
        return [product, getItems[i]];
      });

      evenNewerArr = newArr.map((i) => {
        console.log("information on the product", i[0]);
        console.log("information on the quanitity", JSON.parse(i[1]).quantity);
      });
    }
  }

  console.log("1111111111111111111111", newArr);

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
                {/* <div>{photo[0]}</div> */}
                <img src={photo[0].photoKey} />
                <div>{i[0].price}</div>
                <div>{quant}</div>
              </div>
            </>
          );
        });
      }
    }
    return newArr;
  };
  console.log("qqqqqqqqqqqqqqqqqq", checkoutMapper(checkout, getItems));
  return loaded && user ? (
    <>
      <div className="pages-container">
        <div>
          <div>{checkoutMapper(checkout, getItems)}</div>
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
