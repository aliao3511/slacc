class AddMessageableTypeToMessages < ActiveRecord::Migration[5.2]
  def change
    remove_column :messages, :is_dm
    add_column :messages, :messageable_type, :string, null: false
  end
end
