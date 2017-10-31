class Api::ChannelsController < ApplicationController
  before_action :ensure_logged_in

  def create
    channel = channel_params
    if channel[:is_direct]
      create_direct(channel)
    else
      create_channel(channel)
    end
    # channel[:space_id] = params[:space_id]
    # if channel.save
    #   membership = {
    #     collection_type: :Channel,
    #     collection_id: channel.id,
    #     is_admin: true,
    #     is_pending: false,
    #     user_id: current_user.id
    #   };
    #
    #   Membership.new(membership).save!
    #
    #   if channel[:is_direct]
    #     membership[:user_id] = User.find_by(username: channel.title)
    #     Membership.new(membership).save!
    #   end
    #   render json: channel, status: 200
    # else
    #   render json: ["Oops, an error occurred"], status: 404
    # end
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

  end


  def update
  end

  def destroy
  end

  private
  def channel_params
    params.require(:channel).permit(:user, :title, :is_direct);
  end
end
