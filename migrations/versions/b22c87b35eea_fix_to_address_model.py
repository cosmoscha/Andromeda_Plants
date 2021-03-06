"""fix to address model

Revision ID: b22c87b35eea
Revises: 12cf69dd4268
Create Date: 2021-03-25 03:31:42.816216

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'b22c87b35eea'
down_revision = '12cf69dd4268'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('addresses', sa.Column('state', sa.String(), nullable=False))
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('addresses', 'state')
    # ### end Alembic commands ###
