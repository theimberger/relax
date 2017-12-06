class Api::ChannelsController < ApplicationController
  before_action :ensure_logged_in

  def create
    channel = channel_params
    if channel[:is_direct] == "true"
      create_direct(channel)
    else
      create_channel(channel)
    end
  end

  def create_direct(channel)
    direct = Channel.new({
      title: "direct",
      is_direct: true,
      space_id: params[:space_id]
    })

    direct.save!

    membership = {
        collection_type: :Channel,
        collection_id: direct.id,
        is_admin: true,
        is_pending: false,
        user_id: current_user.id
    };
    Membership.new(membership).save!
    membership[:user_id] = channel[:user]
    Membership.new(membership).save!
    show(direct.id)
  end

  def create_channel(channel)
    channel[:space_id] = params[:space_id]
    channel = Channel.new(channel)
    channel.save!
    Membership.new({
        collection_type: :Channel,
        collection_id: channel.id,
        is_admin: true,
        is_pending: false,
        user_id: current_user.id
    }).save!
    show(channel.id)
  end

  def show(id = params[:id])
    @messages = Message.all
    @channel = Channel.find(id)
    @admin = @channel.users.joins(:memberships).select('users.*').where('memberships.is_admin = TRUE')
    @admin = @admin.first
    render "api/spaces/channels/show"
  end


  def update
  end

  def destroy
    channel = Channel.find(params[:id])
    channel.messages.each { |m| m.delete }
    channel.memberships.each { |m| m.delete }
    channel.delete
  end

  private
  def channel_params
    params.require(:channel).permit(:user, :title, :is_direct, :purpose);
  end
end
