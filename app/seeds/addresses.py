from app.models import db, Address

def seed_addresses():
    demo_address=Address(userId=1, street_address="1111 One Drive", city = "Onevile", zip_code=11111)
    db.session.add(demo_address)
    db.session.commit()
def undo_addresses():
    db.session.execute('TRUNCATE addresses CASCADE;')
    db.session.execute("ALTER SEQUENCE addresses_id_seq RESTART WITH 1")
    db.session.commit()
