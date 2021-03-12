from flask.cli import AppGroup
from .users import seed_users, undo_users
from .addresses import seed_addresses, undo_addresses
from .photos import seed_photos, undo_photos
from .tags import seed_tags, undo_tags
from .products import seed_products, undo_products
from .user_products import seed_userProducts, undo_userProducts
from .product_tags import seed_productTags, undo_productTags
# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')

# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    seed_users()
    seed_addresses()
    seed_products()
    seed_photos()
    seed_tags()
    seed_userProducts()
    seed_productTags()
    # Add other seed functions here

# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_users()
    undo_addresses()
    undo_products()
    undo_photos()
    undo_tags()
    undo_userProducts()
    undo_productTags()
    # Add other undo functions here
