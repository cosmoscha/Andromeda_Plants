const SET_PRODUCT_TAG = "tags/setProductTag";

const setProductTag = (tag) => {
  return {
    type: SET_PRODUCT_TAG,
    payload: tag,
  };
};

export const getProductTag = (id) => async (dispatch) => {
  let tag = await fetch(`/api/tags/${id}`);
  tag = await tag.json();
  console.log("hitting the tags dispatch", tag);
  dispatch(setProductTag(tag));
  return tag;
};

const initialState = [];

const tagsReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case SET_PRODUCT_TAG:
      newState = action.payload;
      return newState;

    default:
      return state;
  }
};

export default tagsReducer;
