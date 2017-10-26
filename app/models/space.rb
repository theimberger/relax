class Space < ApplicationRecord
  validates :title, presence: true, uniqueness: true
end
