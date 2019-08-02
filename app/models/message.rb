# == Schema Information
#
# Table name: messages
#
#  id               :bigint           not null, primary key
#  body             :string           not null
#  author_id        :integer          not null
#  messageable_id   :integer          not null
#  created_at       :datetime         not null
#  updated_at       :datetime         not null
#  messageable_type :string           not null
#

class Message < ApplicationRecord

    # validates :messageable_type, inclusion: { in: ["Channel", "DM"] }

    # belongs_to :author,
    # foreign_key: :author_id,
    # class_name: :User

    # belongs_to :messageable, polymorphic: true

end
