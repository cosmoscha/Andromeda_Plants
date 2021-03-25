import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOneProduct, makeReview } from "../../store/products";
import { useParams, Redirect, useHistory } from "react-router-dom";
import "./IndividualProduct.css";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import userProductsReducer, {
  getReviewsRatings,
} from "../../store/userProducts";
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
const IndividualProduct = () => {
  const dispatch = useDispatch();
  const product = useParams();
  const history = useHistory();
  const productInfo = useSelector((state) => state.products);
  const quantity = useSelector((state) => state.products.quantity);
  const userProducts = useSelector((state) => state.userProducts);
  const user = useSelector((state) => state.session.user);
  const loaded = useSelector((state) => state.session.loaded);
  const photos = productInfo.photos;
  const productId = parseInt(product.id);
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(1);
  const [count, setCount] = useState(1);

  useEffect(() => {
    dispatch(getReviewsRatings(productId));
    dispatch(getOneProduct(productId));
  }, [dispatch]);

  useEffect(() => {
    if (quantity) {
      setCount(quantity);
    }
  }, [setCount, quantity]);

  const addProduct = (e) => {
    if (test === 0) {
      console.log("add something you idiot");
      return;
    }
    e.preventDefault();
    const val = {
      productId: productInfo.id,
      quantity: test,
      photo: photos[0].photoKey,
      price: productInfo.price,
      name: productInfo.name,
    };

    sessionStorage.setItem(`productId ${productId}`, JSON.stringify(val));
  };

  const reviewsArr = [];
  const photosArr = [];
  const reviewsArrMapper = (arr) => {
    if (userProducts) {
      userProducts.map((entry) => {
        arr.push(entry);
      });
      return arr.map((entry) => {
        return (
          <>
            <div key={entry.id} className="reviewEntry">
              <div> review by: {entry.user.username}</div>
              <div>{entry.reviews}</div>
              <div>{entry.ratings}</div>
              
            </div>
          </>
        );
      });
    }
  };
  const handleDragStart = (e) => e.preventDefault();
  const photoArrMapper = (arr) => {
    if (photos) {
      photos.map((product) => {
        arr.push(product.photoKey);
      });
    }
    arr = arr.map((photo) => {
      return (
        <>
          <img
            src={photo}
            className="productImages"
            key={photo.id}
            onDragStart={handleDragStart}
          />
        </>
      );
    });
    
    return <AliceCarousel mouseTracking items={arr} infinite={true} isNextSlideDisabled={false} />;
  };
  let test = quantity - count;
  let subTotal = productInfo.price * test;

  const ratings = [1, 2, 3, 4, 5];
  const quantityToCart = () => {
    if (count === 0) {
      return;
    }
    setCount(count - 1);
  };
  const quantityOutCart = () => {
    if (count === 5) {
      return;
    }
    setCount(count + 1);
  };



let purchHistory;
  if (user) {
  purchHistory = user.products.map((product)=> {
    return product.products.id
   })
}
console.log(purchHistory)
   



  const submitReview = (e) => {
    if (user && purchHistory.includes(productInfo.id)) {
      const formValues = {
        id: productId,
        review: review,
        rating: rating,
      };

      dispatch(makeReview(formValues));
    } else if (user && !purchHistory.includes(productInfo.id)){
      e.preventDefault();
      alert("you must purchase this product before you can review it");
    } else {
      e.preventDefault();
      alert("please login to add a review")
    }
  };
  return (
    <>
      {userProducts && productInfo && (
        <div className="page-container">
          <div className="imageContainer">
            <div className="product-information">
              <div className="image-grid-product">
              <div className="product-name">{productInfo.name}</div>
                {photoArrMapper(photosArr)}
              </div>
              <div className="description">
              <div className="productPrice" >price for each: ${productInfo.price}  </div>
              {sessionStorage && (
              <div className="addRemove">
                  <div>available: {count}</div>
                <div>
                  <button onClick={quantityOutCart} className="button" style={{width: "30px", height: "30px"}}>
                     <RemoveIcon fontSize="medium"  />
                  </button>
                  <div  style={{padding: "15px"}} >quantity: {test}</div>
                  <button onClick={quantityToCart} className="button" style={{width: "30px", height: "30px"}}>
                     <AddIcon fontSize="medium" />
                  </button>
                </div>
                  <button className="button" onClick={addProduct}>
                    add to cart
                  </button>
                <div>
                  subtotal: ${subTotal}
                </div>
              </div>
            )}
              <div>{productInfo.description} 
                  </div>
              </div>
            </div>
            <div style={{display: "flex", justifyContent: "center", paddingTop: "20px"}}>
            <form onSubmit={submitReview} className="submitReview">
              <input
                onChange={(e) => setReview(e.target.value)}
                value={review}
                placeholder="add your review"
                type="text"
                className="reviewInput"
              ></input>
              <select
                onChange={(e) => setRating(e.target.value)}
                value={rating}
              >
                {ratings.map((rating) => (
                  <option value={rating} key={rating}>
                    {rating}
                  </option>
                ))}
              </select>
              <button id={review.id} type="submit" className="button">
                submit review
              </button>
            </form>
            </div>
            

            

            {!reviewsArr.length && (
              <div style={{display: "flex", justifyContent: "center"}}>
                <div> no reviews yet for this product</div>
                </div>
            )}

            <div className="reviews-grid">{reviewsArrMapper(reviewsArr)}</div>
          </div>
        </div>
      )}
    </>
  );
};

export default IndividualProduct;
