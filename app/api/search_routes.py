from flask import Blueprint, jsonify, request
from flask_login import current_user
from app.models import db, Product
from sqlalchemy import or_, func

search_routes = Blueprint('search', __name__)

@search_routes.route('/<string:search>', methods=["GET"])
def findProduct(search):
    products = Product.query.filter(func.lower(Product.name).like(f'%{search}%')).all()
    return {'products': [product.to_dict() for product in products]}
