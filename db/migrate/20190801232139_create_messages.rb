class CreateMessages < ActiveRecord::Migration[5.2]
  def change
    create_table :messages do |t|
      t.string :body, null: false
      t.integer :author_id, null: false
      t.integer :messageable_id, null: false
      t.boolean :is_dm, null: false

      t.timestamps
    end
  end
end
