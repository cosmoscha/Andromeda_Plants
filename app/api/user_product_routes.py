from flask import Blueprint, jsonify, request
from app.forms import AddressForm
from app.models import UserProduct, db, Address
from flask_login import current_user
import json
userProduct_routes =Blueprint('userProducts', __name__)

@userProduct_routes.route('/<int:id>')
def getAll(id):
    userProduct = UserProduct.query.filter_by(products_id=id).all()
    return jsonify ([userproduct.to_dict_user() for userproduct in userProduct])


@userProduct_routes.route('/history', methods=["POST"])
def makeHistory():
    broughtHistory = json.loads(request.data)["userProductInfo"]["checkoutHistory"]
    for history in broughtHistory:
        newHistory = UserProduct(
            users_id=current_user.id, 
            products_id=history,
            )
        print("newHistory", newHistory)
        db.session.add(newHistory)


    db.session.commit()
    return "submissions successful"



@userProduct_routes.route('/finish', methods=["POST"])
def getAddressForm():
    form = AddressForm()
    print("form.data", form.data)
    form['csrf_token'].data = request.cookies['csrf_token']
    print(",,,,,,,,,,,,,,,,,,,,,,,,,,,", form['csrf_token'].data)
    

    if form.validate_on_submit():
        streetData = form.data['street_address']
        cityData = form.data['city']
        stateData = form.data['state']
        zipData = form.data['zip_code']
        address = Address(
            userId=current_user.id,
            street_address=streetData,
            city=cityData,
            state=stateData,
            zip_code=zipData
        )
        db.session.add(address)
        db.session.commit()
        return "hello"
    print("did not work")
    return "error: address incomplete"
