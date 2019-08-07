class CreateDmMembers < ActiveRecord::Migration[5.2]
  def change
    create_table :dm_members do |t|
      t.integer :dm_id, null: false
      t.integer :user_id, null: false

      t.timestamps
    end
  end
end
