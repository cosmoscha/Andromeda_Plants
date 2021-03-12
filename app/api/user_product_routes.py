from flask import Blueprint, jsonify
from app.forms import AddressForm
from app.models import UserProduct, db


userProduct_routes =Blueprint('userProducts', __name__)

@userProduct_routes.route('/<int:id>')
def getAll(id):
    userProduct = UserProduct.query.filter_by(products_id=id).all()
    return jsonify ([userproduct.to_dict_user() for userproduct in userProduct])

# @userProduct_routes.route('/<int:id>', methods=["POST"])
# def makeReviewRating(id):
#     userProduct = UserProduct.query.filter_by(products_id=id).first()
#     return userProduct.to_dict()
