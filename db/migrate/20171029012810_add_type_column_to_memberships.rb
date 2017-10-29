class AddTypeColumnToMemberships < ActiveRecord::Migration[5.1]
  def change
    add_column :space_memberships, :type, :string, null: false
    rename_table :space_memberships, :memberships
  end
end
