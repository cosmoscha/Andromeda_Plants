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
import Rating from 'material-ui-rating'
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
              <div>rating: {entry.ratings}</div>
              <br></br>
              <div> review: {entry.reviews} </div>
              <br></br>
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

  console.log("reviews arr", typeof reviewsArr)
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
              <div className="description" style={{border: "solid"}}>
              <div className="productPrice" style={{fontSize:"200%", height: "120px"}}>price for each: ${productInfo.price}  </div>
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
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia,
molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum
numquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentium
optio, eaque rerum! Provident similique accusantium nemo autem. Veritatis
obcaecati tenetur iure eius earum ut molestias architecto voluptate aliquam
nihil, eveniet aliquid culpa officia aut! Impedit sit sunt quaerat, odit,
tenetur error, harum nesciunt ipsum debitis quas aliquid. Reprehenderit,
quia. Quo neque error repudiandae fuga? Ipsa laudantium molestias eos 
sapiente officiis modi at sunt excepturi expedita sint? Sed quibusdam
recusandae alias error harum maxime adipisci amet laborum. Perspiciatis 
minima nesciunt dolorem! Officiis iure rerum voluptates a cumque velit 
quibusdam sed amet tempora. Sit laborum ab, eius fugit doloribus tenetur 
fugiat, temporibus enim commodi iusto libero magni deleniti quod quam 
consequuntur! Commodi minima excepturi repudiandae velit hic maxime
doloremque. Quaerat provident commodi consectetur veniam similique ad 
earum omnis ipsum saepe, voluptas, hic voluptates pariatur est explicabo 
fugiat, dolorum eligendi quam cupiditate excepturi mollitia maiores labore 
suscipit quas? Nulla, placeat. Voluptatem quaerat non architecto ab laudantium
modi minima sunt esse temporibus sint culpa, recusandae aliquam numquam 
totam ratione voluptas quod exercitationem fuga. Possimus quis earum veniam 
quasi aliquam eligendi, placeat qui corporis!
                  </div>
              </div>
            </div>
            <div style={{display: "flex", justifyContent: "center", paddingTop: "20px"}}>
            <form onSubmit={submitReview} className="submitReview">
              <Rating
                value={rating}
                max={5}
                onChange={(value) => setRating(value)}
              />
              <input
                onChange={(e) => setReview(e.target.value)}
                value={review}
                placeholder="add your review"
                type="text"
                className="reviewInput"
              ></input>
              <button id={review.id} type="submit" className="button">
                submit review
              </button>
            </form>
            </div>
            

            

            {!reviewsArr && (
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
