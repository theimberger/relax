class ChangeGroupsTableToSpaces < ActiveRecord::Migration[5.1]
  def change
    rename_table :groups, :spaces
  end
end
