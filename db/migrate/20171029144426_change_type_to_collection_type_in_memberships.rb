class ChangeTypeToCollectionTypeInMemberships < ActiveRecord::Migration[5.1]
  def change
    rename_column :memberships, :type, :collection_type
  end
end
