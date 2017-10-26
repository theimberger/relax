class SpaceMembership < ApplicationRecord
  validates :user_id, :space_id, :is_admin, presence: true

  after_initialize :ensure_is_admin
  def ensure_is_admin
    self.is_admin = false if self.is_admin.nil?
  end

  belongs_to :user,
    class_name: :User,
    foreign_key: :user_id

  belongs_to :space,
    class_name: :Space,
    foreign_key: :space_id

end
