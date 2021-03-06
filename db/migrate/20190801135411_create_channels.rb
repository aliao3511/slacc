class CreateChannels < ActiveRecord::Migration[5.2]
  def change
    create_table :channels do |t|
      t.string :name, null: false
      t.integer :owner_id, null: false
      t.boolean :is_private, null: false

      t.timestamps
    end
    add_index :channels, :owner_id, unique: true
  end
end
