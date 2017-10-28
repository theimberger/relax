class FixIsPendingColumn < ActiveRecord::Migration[5.1]
  def change
    remove_column :space_memberships, :is_pending, :boolean
    add_column :space_memberships, :is_pending, :boolean, default: true
  end
end
