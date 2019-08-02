class RemoveColumnsFromMessages < ActiveRecord::Migration[5.2]
  def change
    remove_column :messages, :author_id
    remove_column :messages, :messageable_id
  end
end
