# == Schema Information
#
# Table name: memberships
#
#  id              :integer          not null, primary key
#  user_id         :integer          not null
#  collection_id   :integer          not null
#  is_admin        :boolean          default(FALSE)
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#  is_pending      :boolean          default(TRUE)
#  collection_type :string           not null
#

class Membership < ApplicationRecord
  validates :user_id, :collection_id, presence: true

  after_initialize :ensure_options
  def ensure_options
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
