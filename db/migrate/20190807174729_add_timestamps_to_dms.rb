class AddTimestampsToDms < ActiveRecord::Migration[5.2]
  def change
    remove_column :dms, :timestamps
    add_column :dms, :created_at, :datetime
    add_column :dms, :updated_at, :datetime
  end
end
