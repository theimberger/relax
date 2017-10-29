class Channel < ApplicationRecord

  has_many :memberships, as: :collection

  has_many :users,
    through: :memberships,
    source: :user


end
