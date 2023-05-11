"""idk

Revision ID: 01d649c14379
Revises: a13748127731
Create Date: 2023-05-11 12:09:46.841368

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '01d649c14379'
down_revision = 'a13748127731'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('songs', schema=None) as batch_op:
        batch_op.drop_column('year')

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('songs', schema=None) as batch_op:
        batch_op.add_column(sa.Column('year', sa.INTEGER(), nullable=True))

    # ### end Alembic commands ###