class CreateDMs < ActiveRecord::Migration[5.2]
  def change
    create_table :dms do |t|
      t.string :body, null: false
      t.integer :owner_id
      t.string :timestamps
    end
  end
end
