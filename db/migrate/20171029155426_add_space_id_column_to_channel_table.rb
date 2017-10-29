class AddSpaceIdColumnToChannelTable < ActiveRecord::Migration[5.1]
  def change
    add_column :channels, :space_id, :integer, null: false
  end
end
