from flask_wtf import FlaskForm
from wtforms import StringField, SelectField
from app.models import Address
from wtforms.validators import DataRequired

verify = [DataRequired()]
City = {
    "AL": {"Alabama"},
    "AK": {"Alaska"},
    "AS": {"American Samoa"},
    "AZ": {"Arizona"},
    "AR": {"Arkansas"},
    "CA": {"California"},
    "CO": {"Colorado"},
    "CT": {"Connecticut"},
    "DE": {"Delaware"},
    "DC": {"District Of Columbia"},
    "FM": {"Federated States Of Micronesia"},
    "FL": {"Florida"},
    "GA": {"Georgia"},
    "GU": {"Guam"},
    "HI": {"Hawaii"},
    "ID": {"Idaho"},
    "IL": {"Illinois"},
    "IN": {"Indiana"},
    "IA": {"Iowa"},
    "KS": {"Kansas"},
    "KY": {"Kentucky"},
    "LA": {"Louisiana"},
    "ME": {"Maine"},
    "MH": {"Marshall Islands"},
    "MD": {"Maryland"},
    "MA": {"Massachusetts"},
    "MI": {"Michigan"},
    "MN": {"Minnesota"},
    "MS": {"Mississippi"},
    "MO": {"Missouri"},
    "MT": {"Montana"},
    "NE": {"Nebraska"},
    "NV": {"Nevada"},
    "NH": {"New Hampshire"},
    "NJ": {"New Jersey"},
    "NM": {"New Mexico"},
    "NY": {"New York"},
    "NC": {"North Carolina"},
    "ND": {"North Dakota"},
    "MP": {"Northern Mariana Islands"},
    "OH": {"Ohio"},
    "OK": {"Oklahoma"},
    "OR": {"Oregon"},
    "PW": {"Palau"},
    "PA": {"Pennsylvania"},
    "PR": {"Puerto Rico"},
    "RI": {"Rhode Island"},
    "SC": {"South Carolina"},
    "SD": {"South Dakota"},
    "TN": {"Tennessee"},
    "TX": {"Texas"},
    "UT": {"Utah"},
    "VT": {"Vermont"},
    "VI": {"Virgin Islands"},
    "VA": {"Virginia"},
    "WA": {"Washington"},
    "WV": {"West Virginia"},
    "WI": {"Wisconsin"},
    "WY": {"Wyoming"}
}
options = [(city) for city in City.keys()]

class AddressForm(FlaskForm):
    street_address = StringField('Street Address', verify)
    city = SelectField('Street Address', verify,  choices=options)
    zip_code = StringField('Zip Code', verify)
