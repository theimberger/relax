class Api::MessagesController < ApplicationController


  def create
    @message = Message.new(message_params)
    @message[:user_id] = current_user.id
    @message[:context_id] = params[:channel_id]
    @message[:context_type] = :Channel
    @message.save!
    ActionCable.server.broadcast 'chat_channel', message: @message
  end

  private
  def message_params
    params.require(:message).permit(:content);
  end

end
