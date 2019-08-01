class Model < ApplicationRecord

    validates :is_dm, inclusion: { in: [true, false] }

    belongs_to :author,
    foreign_key: :author_id,
    class_name: :User

    belongs_to :messageable, polymorphic: true

end