class SpaceMembership < ApplicationRecord
  validates :user_id, :space_id, :is_admin, presence: true

  after_initialize :ensure_is_admin

  def ensure_is_admin
    self.is_admin = false if self.is_admin.nil?
  end

end
