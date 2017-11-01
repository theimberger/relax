# == Schema Information
#
# Table name: channels
#
#  id         :integer          not null, primary key
#  title      :string           not null
#  topic      :string
#  purpose    :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  space_id   :integer          not null
#  is_direct  :boolean          default(FALSE)
#

class Channel < ApplicationRecord

  validates :title, :space_id, presence: true

  after_initialize :ensure_is_direct
  def ensure_is_direct
    self.is_direct = false if self.is_direct.nil?
  end

  belongs_to :space,
  class_name: :Space,
  foreign_key: :space_id

  has_many :memberships, as: :collection

  has_many :users,
    through: :memberships,
    source: :user

    has_many :messages, as: :collection
    
end
