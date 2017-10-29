class Membership < ApplicationRecord
  validates :user_id, :collection_id, :is_admin, presence: true

  after_initialize :ensure_is_admin
  def ensure_is_admin
    self.is_admin = false if self.is_admin.nil?
    self.is_pending = true if self.is_pending.nil?
  end

  belongs_to :user,
    class_name: :User,
    foreign_key: :user_id

  belongs_to :collection, polymorphic: :true

  # having trouble with collection associations?
  # -- make sure you're using type :Spaces and :Channel
  
end
