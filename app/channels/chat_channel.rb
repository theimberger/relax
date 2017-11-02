class ChatChannel < ApplicationCable::Channel
  def subscribed
    # stream_from "some_channel"
    stream_from "chat_channel"
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end

  def speak(data)
    # debugger
    message = {
      content: data['message'],
      user_id: 1,
      context_id: 27,
      context_type: :Channel
    }

    Message.create(message)
    # ActionCable.server.broadcast 'chat_channel', message: data["message"]
  end
end
