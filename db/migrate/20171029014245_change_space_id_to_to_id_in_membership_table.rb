class ChangeSpaceIdToToIdInMembershipTable < ActiveRecord::Migration[5.1]
  def change
    rename_column :memberships, :space_id, :collection_id
  end
end
