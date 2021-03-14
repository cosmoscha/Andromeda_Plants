from flask import Blueprint, jsonify
from app.forms import AddressForm
from app.models import UserProduct, db


userProduct_routes =Blueprint('userProducts', __name__)

@userProduct_routes.route('/<int:id>')
def getAll(id):
    userProduct = UserProduct.query.filter_by(products_id=id).all()
    return jsonify ([userproduct.to_dict_user() for userproduct in userProduct])

@userProduct_routes.route('/finish', methods=["POST"])
def getAddressForm():
    form = AddressForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    print("form.data", form.data)
    if form.validate_on_submit():
        return "hello"
    return "error: address incomplete"
