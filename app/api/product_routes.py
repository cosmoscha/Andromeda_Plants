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
    response = {}
    products_data = []
    for product in products:
        photo_paths = []
        for photo in product.photos:
            photo_paths.append(photo.photoKey)
        product_datum = {
            "name" : product.name,
            "photos" : photo_paths
        }
        products_data.append(product_datum)
    response["products"] = products_data
    return response

@product_routes.route('/<int:id>', methods=["GET"])
def getOne(id):
    products = Product.query.filter_by(id=id).first()
    return products.to_dict()

@product_routes.route('/<int:id>', methods=['POST'])
def makeReview(id):
    form = ReviewForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    print("successful post")
    print("the return boy", form.data)
    if form.validate_on_submit():
        reviewData = form.data['reviews']
        ratingData = form.data['ratings']
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
    req = request.json['getItems']
    print("getItems obj", json.loads(req[0]))
    lst = [json.loads(i)['productId'] for i in req]
    print("qwhekjqwhekjqwhekjqw",lst)
    products = Product.query.filter(Product.id.in_(lst)).all()
    print("all products", {"products": [product.to_dict() for product in products]})
    return {"products": [product.to_dict() for product in products]}
