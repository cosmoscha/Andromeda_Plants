from flask_wtf import FlaskForm
from wtforms import StringField, SelectField, TextAreaField
from app.models import Address
from wtforms.validators import DataRequired
verify = [DataRequired()]

ratings = [(rating) for rating in range(1,6)]

class ReviewForm(FlaskForm):
    reviews = TextAreaField('Review', verify)
    ratings = SelectField('Rating', verify, choices=ratings)
