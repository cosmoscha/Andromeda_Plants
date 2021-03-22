from app.models import db, ProductTag


def seed_productTags():
 adelae= ProductTag(id= 1,products_id=1, tags_id=5 )
 briggsiana= ProductTag( id= 2,products_id=2 , tags_id=1 )
 agnataRed= ProductTag( id= 3,products_id=3 , tags_id=4 )
 alpina= ProductTag( id= 4,products_id=4 , tags_id=7 )
 BainesKloof= ProductTag( id= 5,products_id=5 , tags_id=4 )
 Cephalotus= ProductTag( id= 6,products_id=6 , tags_id= 2)
 falconeri= ProductTag( id= 7,products_id=7 , tags_id=4 )
 fulva= ProductTag( id= 8,products_id=8 , tags_id=4 )
 gramogolensis= ProductTag( id= 9,products_id=9 , tags_id=4 )
 hamata= ProductTag( id= 10,products_id=10 , tags_id=1 )
 lanata= ProductTag( id= 11,products_id=11 , tags_id=4 )
 LotusEater= ProductTag( id= 12,products_id=12 , tags_id=4 )
 madagascariensis= ProductTag( id= 13,products_id=13 , tags_id=4 )
 Microdent= ProductTag( id= 14,products_id=14 , tags_id=3 )
 paradoxa_TYPE= ProductTag( id= 15,products_id=15 , tags_id=4 )
 petiolaris= ProductTag( id= 16,products_id=16, tags_id=4 )
 Porcelain= ProductTag( id= 17,products_id=17 , tags_id=1 )
 potosiensis= ProductTag( id= 18,products_id=18, tags_id=4 )
 slackii= ProductTag( id= 19,products_id=19 , tags_id=4 )
 yuccaDo1713= ProductTag( id= 20,products_id=20 , tags_id=4 )
 nelumbifoliaxreniformis= ProductTag( id= 21,products_id=21 , tags_id=7 )

#  Beginner1= ProductTag(id=23, prod)

 db.session.add(adelae)
 db.session.add(briggsiana)
 db.session.add(agnataRed)
 db.session.add(alpina)
 db.session.add(BainesKloof)
 db.session.add(Cephalotus)
 db.session.add(falconeri)
 db.session.add(fulva)
 db.session.add(gramogolensis)
 db.session.add(hamata)
 db.session.add(lanata)
 db.session.add(LotusEater)
 db.session.add(madagascariensis)
 db.session.add(Microdent)
 db.session.add(paradoxa_TYPE)
 db.session.add(petiolaris)
 db.session.add(Porcelain)
 db.session.add(potosiensis)
 db.session.add(slackii)
 db.session.add(yuccaDo1713)
 db.session.add(nelumbifoliaxreniformis)
 db.session.commit()

def undo_productTags():
    db.session.execute('TRUNCATE productTags CASCADE;')
    db.session.execute("ALTER SEQUENCE productTags_id_seq RESTART WITH 1")
    db.session.commit()
