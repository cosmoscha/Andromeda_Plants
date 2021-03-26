from flask import Blueprint, jsonify, request
from app.models import Product, db, Photo, UserProduct
from flask_login import current_user
from app.forms import ReviewForm
import json
# from sqlalchemy import in_
product_routes = Blueprint('products', __name__)


@product_routes.route('/')
def getAll():
    products = Product.query.all()
    return {"products": [product.to_dict() for product in products]}


@product_routes.route('/<int:id>', methods=["GET"])
def getOne(id):
    products = Product.query.filter_by(id=id).first()
    return products.to_dict()


@product_routes.route('/<int:id>', methods=['POST'])
def makeReview(id):
    form = ReviewForm()
    print("successfulqwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww post", form.data)
    form['csrf_token'].data = request.cookies['csrf_token']
    print(",,,,,,,,,,,,,,,,,,,,,,,,,,,", form['csrf_token'].data)
    print("the return boy", form.data)
    print("the return boy", form.data['reviews'])
    print("the return boy", form.data['ratings'])
    reviewData = form.data['reviews']
    ratingData = form.data['ratings']

    existing_Product = UserProduct.query.filter_by(users_id=current_user.id, products_id=id).first()
    print("existddddddddddddddddddddddddddddddddddddddddddddddddddin product", existing_Product.reviews)
    if existing_Product:
        existing_Product.reviews = reviewData,
        existing_Product.ratings = ratingData
        db.session.add(existing_Product)
        db.session.commit()

    if form.validate_on_submit():
        review = UserProduct(
            users_id=current_user.id,
            products_id=int(id),
            reviews=reviewData,
            ratings=ratingData
        )
        db.session.add(review)
        db.session.commit()
        return UserProduct.to_dict_product(review)
    return "Bad Data"


@product_routes.route('/checkout', methods=['POST'])
def checkout():
    print("the response obssssssssssssssssssssssssssssject", request.json)

    def custom_dict(self, q):
        return {

        }
    req = request.json['getItems']
    # print("getItems obj", json.loads(req[0]))
    print("req.................", req)
    prodId = [json.loads(i)['productId'] for i in req]
    quantities = [json.loads(i)['quantity'] for i in req]
    print("qwhekjqwhekjqwhekjqw", prodId)
    print("22222222222222222", quantities)
    products = Product.query.filter(Product.id.in_(prodId)).all()
    return {"products": [product.to_dict() for product in products]}
