class Message < ApplicationRecord
  validates :user_id, :context_id, :context_type, :content

  belongs_to :context, polymorphic: true
  
end
