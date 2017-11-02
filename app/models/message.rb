class Message < ApplicationRecord
  after_create_commit { MessageBroadcastJob.perform_later self }

  validates :user_id, :context_id, :context_type, :content, presence: true

  belongs_to :context, polymorphic: true

end
