class Space < ApplicationRecord
  validates :title, presence: true, uniqueness: true

  has_many :channels,
    class_name: :Channel,
    foreign_key: :space_id

  has_many :memberships, as: :collection

  has_many :users,
    through: :memberships,
    source: :user

end
