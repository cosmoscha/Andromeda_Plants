from app.models import db, Product






def seed_products():
    adelae = Product(name='Drosera adelae',description='hello', quantity=5)
    Briggsiana = Product(name='Nepenthes xBriggsiana',description='hello', quantity=5)
    agnatared = Product(name='Pinguicula agnata red',description='hello', quantity=5)
    alpina = Product(name='Utricularia alpina',description='hello', quantity=5)
    BainesKloof = Product(name='Drosera capensis BainesKloof',description='hello', quantity=5)
    Cephalotus = Product(name='Cephalotus Hummers Giant',description='hello', quantity=5)
    falconeri = Product(name='Drosera falconeri',description='hello', quantity=5)
    fulva = Product(name='Drosera fulva',description='hello', quantity=5)
    gramogolensis = Product(name='Drosera gramogolensis',description='hello', quantity=5)
    hamata = Product(name='Nepenthes hamata',description='hello', quantity=5)
    lanata = Product(name='Drosera lanata',description='hello', quantity=5)
    LotusEater = Product(name='Drosera capensis Lotus Eater',description='hello', quantity=5)
    madagascariensis = Product(name='Drosera madagascariensis',description='hello', quantity=5)
    Microdent = Product(name='Dionaea muscipula Microdent',description='hello', quantity=5)
    paradoxa_TYPE = Product(name='Drosera paradoxa TYPE',description='hello', quantity=5)
    petiolaris = Product(name='Drosera petiolaris',description='hello', quantity=5)
    splashPage = Product(name='spashPage',description='hello', quantity=5)
    Porcelain = Product(name='Nepenthes ventricosa Porcelain',description='hello', quantity=5)
    potosiensis = Product(name='Pinguicula potosiensis',description='hello', quantity=5)
    slackii = Product(name='Drosera slackii',description='hello', quantity=5)
    yuccaDo1713 = Product(name='Pinguicula Yucca Do 1713',description='hello', quantity=5)
    nelumbifoliaxreniformis1 = Product(name='Utricularia (nelumbifolia x reniformis)',description='hello', quantity=5)
    db.session.add(adelae)
    db.session.add(Briggsiana)
    db.session.add(agnatared)
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
    db.session.add(splashPage)
    db.session.add(Porcelain)
    db.session.add(potosiensis)
    db.session.add(slackii)
    db.session.add(yuccaDo1713)
    db.session.add(nelumbifoliaxreniformis1)
    db.session.commit()


def undo_products():
    db.session.execute('TRUNCATE posts CASCADE;')
    db.session.execute("ALTER SEQUENCE products_id_seq RESTART WITH 1")
    db.session.commit()
