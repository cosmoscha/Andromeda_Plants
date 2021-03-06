from .db import db
from sqlalchemy.orm import relationship, backref
import datetime

class Address(db.Model):
    __tablename__ = "addresses"

    id = db.Column(db.Integer, primary_key=True)
    userId = db.Column(db.Integer, db.ForeignKey("users.id"))
    street_address = db.Column(db.String, nullable=False)
    city = db.Column(db.String, nullable=False)
    state = db.Column(db.String, nullable=False)
    zip_code = db.Column(db.Integer, nullable=False)
    user = db.relationship("User", back_populates="addresses")

    def to_dict(self):
        return {
            "id": self.id,
            "userId": self.userId,
            "street_address": self.street_address,
            "city": self.city,
            "state": self.state,
            "zip_code": self.zip_code
        }
