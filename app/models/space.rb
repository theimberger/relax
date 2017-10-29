class Space < ApplicationRecord
  validates :title, presence: true, uniqueness: true

  has_many :memberships, as: :collection

  has_many :users,
    through: :memberships,
    source: :user

end
