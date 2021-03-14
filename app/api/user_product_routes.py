from flask import Blueprint, jsonify
from app.forms import AddressForm
from app.models import UserProduct, db
from flask_login import current_user
import json
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
        streetData = form.data['street_address']
        cityData = form.data['city']
        zipData = form.data['zip_code']
        print("data........................................................", streetData, cityData,  zipData)
        address = Address(
            userId = current_user.id,
            street_address = streetData,
            city = cityData,
            zip_code = zipData
        )
        db.session.add(address)
        db.session.commit()
        return "hello"
    print("did not work")
    return "error: address incomplete"
