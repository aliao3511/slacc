class RemoveBodyFromDms < ActiveRecord::Migration[5.2]
  def change
    remove_column :dms, :body
  end
end
