class CreateMessages < ActiveRecord::Migration[5.1]
  def change
    create_table :messages do |t|
      t.string :content, null: false
      t.string :context_type, null: false
      t.boolean :read, default: false

      t.integer :user_id, null: false
      t.integer :context_id, null: false

      t.timestamps
    end
  end
end
