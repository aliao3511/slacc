class Dm < ApplicationRecord

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
