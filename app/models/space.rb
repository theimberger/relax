class Space < ApplicationRecord
  validates :title, presence: true, uniqueness: true

  has_many :space_memberships,
    class_name: :SpaceMembership,
    foreign_key: :space_id

  has_many :users,
    through: :space_memberships,
    source: :user
    
end
