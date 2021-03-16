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
            <div key={entry.id}>
              <div>{entry.reviews}</div>
              <div>{entry.ratings}</div>
              <div>{entry.user.username}</div>
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

    return <AliceCarousel mouseTracking items={arr} />;
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
  const submitReview = (e) => {
    if (user) {
      const formValues = {
        id: productId,
        review: review,
        rating: rating,
      };

      dispatch(makeReview(formValues));
    } else {
      e.preventDefault();
      alert("you must login to add a review");
    }
  };
  return (
    <>
      {userProducts && productInfo && (
        <div className="page-container">
          <div className="imageContainer">
            <div className="product-information">
              <div>{productInfo.name}</div>
              <div className="image-grid-product">
                {photoArrMapper(photosArr)}
              </div>
              <div>price for each: ${productInfo.price}</div>
              <div>
                description:Lorem ipsum dolor sit amet consectetur adipisicing
                elit. Maxime mollitia, molestiae quas vel sint commodi
                repudiandae consequuntur voluptatum laborum numquam blanditiis
                harum quisquam eius sed odit fugiat iusto fuga praesentium
                optio, eaque rerum! Provident similique accusantium nemo autem.
                Veritatis obcaecati tenetur iure eius earum ut molestias
                architecto voluptate aliquam nihil, eveniet aliquid culpa
                officia aut! Impedit sit sunt quaerat, odit, tenetur error,
                harum nesciunt ipsum debitis quas aliquid. Reprehenderit, quia.
                Quo neque error repudiandae fuga? Ipsa laudantium molestias eos
                sapiente officiis modi at sunt excepturi expedita sint? Sed
                quibusdam recusandae alias error harum maxime adipisci amet
                laborum. Perspiciatis minima nesciunt dolorem! Officiis iure
                rerum voluptates a cumque velit quibusdam sed amet tempora. Sit
                laborum ab, eius fugit doloribus tenetur fugiat, temporibus enim
                commodi iusto libero magni deleniti quod quam consequuntur!
                Commodi minima excepturi repudiandae velit hic maxime
                doloremque. Quaerat provident commodi consectetur veniam
                similique ad earum omnis ipsum saepe, voluptas, hic voluptates
                pariatur est explicabo fugiat, dolorum eligendi quam cupiditate
                excepturi mollitia maiores labore suscipit quas? Nulla, placeat.
                Voluptatem quaerat non architecto ab laudantium modi minima sunt
                esse temporibus sint culpa, recusandae aliquam numquam totam
                ratione voluptas quod exercitationem fuga. Possimus quis earum
                veniam quasi aliquam eligendi, placeat qui corporis!
                {productInfo.description}
              </div>
            </div>
            <div></div>
            <div className="addRemove">
              <button onClick={quantityToCart} className="button">
                add
              </button>
              <div>{count} available</div>
              <button onClick={quantityOutCart} className="button">
                remove
              </button>
              <div>
                <button className="button" onClick={addProduct}>
                  add {test} to cart
                </button>
                subtotal: ${subTotal}
              </div>
            </div>

            <div className="reviews-grid">{reviewsArrMapper(reviewsArr)}</div>
            <form onSubmit={submitReview} className="submitReview">
              <input
                onChange={(e) => setReview(e.target.value)}
                value={review}
                placeholder="add your review"
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
        </div>
      )}
    </>
  );
};

export default IndividualProduct;
