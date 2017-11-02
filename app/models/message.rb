class Message < ApplicationRecord
  after_create_commit { MessageBroadcastJob.perform_later self }
  after_initialize :set_defaults

  def set_defaults
  end

  validates :user_id, :context_id, :context_type, :content, presence: true

  belongs_to :context, polymorphic: true
  belongs_to :user,
    class_name: :User,
    foreign_key: :user_id

end
