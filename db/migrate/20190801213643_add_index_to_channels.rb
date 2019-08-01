class AddIndexToChannels < ActiveRecord::Migration[5.2]
  def change
    add_index :channels, :owner_id
  end
end
