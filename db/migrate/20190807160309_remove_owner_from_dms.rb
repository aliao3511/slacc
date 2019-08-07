class RemoveOwnerFromDms < ActiveRecord::Migration[5.2]
  def change
    remove_columns :dms, :owner_id
  end
end
