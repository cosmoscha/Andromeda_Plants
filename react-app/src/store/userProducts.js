const SET_REVIEWS_RATINGS = "userProducts/setReviewsRatings";
const setReviewsRatings = (payload) => {
  return {
    type: SET_REVIEWS_RATINGS,
    payload,
  };
};

export const getReviewsRatings = (id) => async (dispatch) => {
  let ReviewsRatings = await fetch(`/api/userProducts/${id}`);
  ReviewsRatings = await ReviewsRatings.json();
  dispatch(setReviewsRatings(ReviewsRatings));
  return ReviewsRatings;
};

const initialState = [];

const userProductsReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case SET_REVIEWS_RATINGS:
      newState = action.payload;
      return newState;
    default:
      return state;
  }
};
export default userProductsReducer;
