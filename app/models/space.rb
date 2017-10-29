# == Schema Information
#
# Table name: spaces
#
#  id          :integer          not null, primary key
#  title       :string           not null
#  description :string
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#

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
