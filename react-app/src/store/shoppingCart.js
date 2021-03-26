const CHECKOUT = "shoppingCart/checkout";
const CHECKED_OUT = "shoppingCart/checkedout";
const REMOVE = "shoppingCart/removeItem";
const checkout = (products) => {
  return {
    type: CHECKOUT,
    payload: products,
  };
};

const checked_out = (products) => {
  return {
    type: CHECKED_OUT,
    payload: products,
  };
};


export const buyProducts = (getItems) => async (dispatch) => {
  dispatch(checkout(getItems));
  return getItems;
};



export const completeOrder = (address) => async (dispatch) => {
  const formData = new FormData();
  formData.append("street_address", address.streetAddress);
  formData.append("city", address.city);
  formData.append("state", address.state)
  formData.append("zip_code", address.zipCode);
  console.log("new form data", formData);

  console.log("whatyou send to server", address);
  let addressInfo = await fetch(`api/userProducts/finish`, {
    method: "POST",
    body: formData,
  });
  console.log("addressInfo", addressInfo);
  addressInfo = await addressInfo.json();
  console.log("addressInfo", addressInfo);
  dispatch(checked_out(addressInfo));
  return addressInfo;
};

export const makeHistory = (userProductInfo) => async (dispatch) => {
  let sentHistory = await fetch(`/api/userProducts/history`,{
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
     body: JSON.stringify({
       userProductInfo,
    }),
  })

  const parsedHistory = await sentHistory.json()
  dispatch(checked_out(parsedHistory))
  return parsedHistory
}
const initialState = [];

const checkoutReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case CHECKOUT:
      newState = action.payload;
      return newState;
    case CHECKED_OUT:
      newState = null;
      return newState;
    default:
      return state;
  }
};

export default checkoutReducer;
