class MessageBroadcastJob < ApplicationJob
  queue_as :default

  def perform(message)
    ActionCable.server.broadcast "chat_channel_#{message.context_id}", message: render_message(message)
  end

  private
  def render_message(message)
    ApplicationController.renderer.render(
      format: :HTML,
      partial: 'api/spaces/channels/messages/chat_message',
      locals: { message: message })
  end
end
