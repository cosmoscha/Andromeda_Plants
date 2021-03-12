from .db import db
import datetime

class Tag(db.Model):
    __tablename__ = 'tags'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)
    createdAt = db.Column(db.DateTime, default=datetime.datetime.utcnow)
    updatedAt = db.Column(db.DateTime, default=datetime.datetime.utcnow)
    products = db.relationship("ProductTag", back_populates="tag")


    def to_dict(self):
        return {
            "name": self.name,
            "products": [product.to_dict_product() for product in self.products]
        }
