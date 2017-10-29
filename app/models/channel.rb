class Channel < ApplicationRecord

  validates :title, :space_id, :is_direct, presence: true

  after_initialize :ensure_is_direct
  def ensure_is_direct
    self.is_direct = false if self.is_admin.nil?
  end

  belongs_to: :space,
  class_name: :Space,
  foreign_key: :space_id

  has_many :memberships, as: :collection

  has_many :users,
    through: :memberships,
    source: :user

end
