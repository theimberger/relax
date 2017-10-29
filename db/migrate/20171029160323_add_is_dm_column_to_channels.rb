class AddIsDmColumnToChannels < ActiveRecord::Migration[5.1]
  def change
    add_column :channels, :is_direct, :boolean, default: false
  end
end
