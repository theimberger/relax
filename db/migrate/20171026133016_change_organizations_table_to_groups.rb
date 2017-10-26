class ChangeOrganizationsTableToGroups < ActiveRecord::Migration[5.1]
  def change
    rename_table :organizations, :groups
  end
end
