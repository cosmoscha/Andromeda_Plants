from .db import db
# from sqlalchemy.orm import relationship, backref
import datetime
class UserProduct(db.Model):
    __tablename__ = 'userProducts'
    users_id = db.Column(db.Integer, db.ForeignKey('users.id'), primary_key=True)
    products_id = db.Column(db.Integer, db.ForeignKey('products.id'), primary_key=True)
    reviews = db.Column(db.Text, nullable=True)
    ratings = db.Column(db.Integer, nullable=True)
    createdAt = db.Column(db.DateTime, default=datetime.datetime.utcnow)
    updatedAt = db.Column(db.DateTime, default=datetime.datetime.utcnow)
    user = db.relationship("User", back_populates="products")
    product = db.relationship("Product", back_populates="users")

    def to_dict_product(self):
        return {
            "reviews":self.reviews,
            "ratings":self.ratings,
            "products":self.product.to_dict()
        }
    def to_dict_user(self):
        return {
            "reviews":self.reviews,
            "ratings":self.ratings,
            "user":self.user.to_dict()
        }
