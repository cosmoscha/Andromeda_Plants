"""updated product model for price

Revision ID: cdbd6d193b9e
Revises: de32ee81a2c1
Create Date: 2021-03-12 15:10:15.788198

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'cdbd6d193b9e'
down_revision = 'de32ee81a2c1'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('products', sa.Column('price', sa.Float(), nullable=True))
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('products', 'price')
    # ### end Alembic commands ###