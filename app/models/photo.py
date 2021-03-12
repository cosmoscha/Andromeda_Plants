from .db import db
import datetime

class Photo(db.Model):
    __tablename__ = 'photos'

    id = db.Column(db.Integer, primary_key=True)
    productId = db.Column(db.Integer, db.ForeignKey("products.id"), nullable=False)
    photoKey = db.Column(db.String, nullable=False)
    createdAt = db.Column(db.DateTime,
                          default=datetime.datetime.utcnow)
    updatedAt = db.Column(db.DateTime,
                          default=datetime.datetime.utcnow)
    product = db.relationship("Product", back_populates="photos")



    def to_dict(self):
        return {
            "id": self.id,
            "productId": self.productId,
            "photoKey": self.photoKey
        }
