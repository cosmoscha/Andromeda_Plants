from app.models import db, Photo


def seed_photos():
    adelae = Photo(
        productId=1, photoKey="https://andromedaplants.s3.amazonaws.com/adelae.jpg")
    Briggsiana = Photo(
        productId=2, photoKey="https://andromedaplants.s3.amazonaws.com/briggsiana.jpg")
    agnatared = Photo(
        productId=3, photoKey="https://andromedaplants.s3.amazonaws.com/agnata+red.jpg")
    alpina = Photo(
        productId=4, photoKey="https://andromedaplants.s3.amazonaws.com/alpina.jpg")
    BainesKloof = Photo(
        productId=5, photoKey="https://andromedaplants.s3.amazonaws.com/baineskloof.jpg")
    Cephalotus = Photo(
        productId=6, photoKey="https://andromedaplants.s3.amazonaws.com/ceph.jpg")
    falconeri = Photo(
        productId=7, photoKey="https://andromedaplants.s3.amazonaws.com/falconeri+palmerton.jpg")
    fulva = Photo(
        productId=8, photoKey="https://andromedaplants.s3.amazonaws.com/fulva.jpg")
    gramo = Photo(
        productId=9, photoKey="https://andromedaplants.s3.amazonaws.com/gramo.jpg")
    hamata = Photo(
        productId=10, photoKey="https://andromedaplants.s3.amazonaws.com/hamata.jpg")
    lanata = Photo(
        productId=11, photoKey="https://andromedaplants.s3.amazonaws.com/lanata.jpg")
    LotusEater = Photo(
        productId=12, photoKey="https://andromedaplants.s3.amazonaws.com/lotus+eater.jpg")
    madagascariensis = Photo(
        productId=13, photoKey="https://andromedaplants.s3.amazonaws.com/madagas.jpg")
    Microdent = Photo(
        productId=14, photoKey="https://andromedaplants.s3.amazonaws.com/microdent.jpg")
    paradoxa_TYPE = Photo(
        productId=15, photoKey="https://andromedaplants.s3.amazonaws.com/paradoxa+TYPE.jpg")
    petiolaris = Photo(
        productId=16, photoKey="https://andromedaplants.s3.amazonaws.com/petiolaris.jpg")
    Porcelain = Photo(
        productId=17, photoKey="https://andromedaplants.s3.amazonaws.com/porcelain.jpg")
    potosiensis = Photo(
        productId=18, photoKey="https://andromedaplants.s3.amazonaws.com/potosiensis.jpg")
    slackii = Photo(
        productId=19, photoKey="https://andromedaplants.s3.amazonaws.com/slackii.jpg")
    yuccaoDo1 = Photo(
        productId=20, photoKey="https://andromedaplants.s3.amazonaws.com/yucca+do+1713.jpg")
    RenXNel1 = Photo(
        productId=21, photoKey="https://andromedaplants.s3.amazonaws.com/nelumbifolia+x+ren+flower.jpg")
    RenXNel2 = Photo(
        productId=21, photoKey="https://andromedaplants.s3.amazonaws.com/reniformis+x+nelumbifolia.jpg")
    RenXNel3 = Photo(
        productId=21, photoKey="https://andromedaplants.s3.amazonaws.com/reniformis+x+nelumbifolia+2.jpg")
    RenXNel4 = Photo(
        productId=21, photoKey="https://andromedaplants.s3.amazonaws.com/reniformis+x+nelum+roots.jpg")

    db.session.add(adelae)
    db.session.add(Briggsiana)
    db.session.add(agnatared)
    db.session.add(alpina)
    db.session.add(BainesKloof)
    db.session.add(Cephalotus)
    db.session.add(falconeri)
    db.session.add(fulva)
    db.session.add(gramo)
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
    db.session.add(yuccaoDo1)
    db.session.add(RenXNel1)
    db.session.add(RenXNel2)
    db.session.add(RenXNel3)
    db.session.add(RenXNel4)
    db.session.commit()


def undo_photos():
    db.session.execute('TRUNCATE photos CASCADE;')
    db.session.execute("ALTER SEQUENCE photos_id_seq RESTART WITH 1")
    db.session.commit()
