# == Schema Information
#
# Table name: channels
#
#  id         :bigint           not null, primary key
#  name       :string           not null
#  owner_id   :integer          not null
#  is_private :boolean          not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Channel < ApplicationRecord

    validates :name, :is_private, null: false
    validates :is_private, inclusion: { in: [true, false] }
    
    belongs_to :owner,
    foreign_key: :owner_id,
    class_name: :User

    # has_many :messages, dependent: :destroy

end