from app.models import db, Tag


def seed_tags():
    Nepenthes = Tag(name='Nepenthes')
    Cephalotus = Tag(name='Cephalotus')
    Dionaea = Tag(name='Venus Flytrap')
    Pinguicula = Tag(name='Butterworts')
    Drosera = Tag(name='Sundew')
    Dionaea = Tag(name='Venus Flytrap')
    Sarracenia = Tag(name='Sarracenia')
    Utricularia = Tag(name='Bladderwort')

    db.session.add(Nepenthes)
    db.session.add(Cephalotus)
    db.session.add(Dionaea)
    db.session.add(Pinguicula)
    db.session.add(Dionaea)
    db.session.add(Drosera)
    db.session.add(Sarracenia)
    db.session.add(Utricularia)
    db.session.commit()


def undo_tags():
    db.session.execute('TRUNCATE tags CASCADE;')
    db.session.execute("ALTER SEQUENCE tags_id_seq RESTART WITH 1")
    db.session.commit()
