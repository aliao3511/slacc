class Dm < ApplicationRecord

    # belongs_to :owner,
    # foreign_key: :owner_id,
    # class_name: :User

    has_many :dm_members, dependent: :destroy
    has_many :members, 
    through: :dm_members,
    source: :user,
    dependent: :destroy

    has_many :messages,
    as: :messageable, 
    inverse_of: :messageable,
    dependent: :destroy

end
