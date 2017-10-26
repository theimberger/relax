class CreateSpaceMemberships < ActiveRecord::Migration[5.1]
  def change
    create_table :space_memberships do |t|
      t.integer :user_id, null: false
      t.integer :space_id, null: false
      t.boolean :is_admin, default: false

      t.timestamps
    end

    add_index :space_memberships, [:user_id, :space_id]

  end
end
