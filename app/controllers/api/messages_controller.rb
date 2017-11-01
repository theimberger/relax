class MessagesController < ApplicationController


  def create
    ActionCable.server.broadcast 'chat_channel', message: 'hello'
  end

end
