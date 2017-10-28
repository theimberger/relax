class AddPendingColToMembershipsTable < ActiveRecord::Migration[5.1]
  def change
    add_column :space_memberships, :is_pending, :boolean, null: false, default: true
  end
end
