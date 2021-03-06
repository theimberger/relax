class Api::MembershipsController < ApplicationController

  def create
    if membership_params.nil?
      render json: ["No such user"], status: 422
    else
      membership = Membership.new(membership_params)

      if membership.collection_type == "Channel"
        membership[:is_pending] = false
      end

      membership.save!

      if membership.collection_type == "Space"
        createSpaceMambership(membership)
      end

      #no page really for this action - we just want to know if we succeeded.
      render json: ["membership processed"], status: 200
    end
  end

  def createSpaceMambership(membership)
    channel_membership = {}
    channel_membership[:user_id] = membership.user_id
    channel_membership[:collection_type] = :Channel
    space = Space.find(membership.collection_id)
    channel_membership[:collection_id] = space.channels.first.id
    channel_membership[:is_pending] = false
    channel_membership[:is_admin] = false
    Membership.new(channel_membership).save!
    self_direct = Channel.new({
      title: User.find(channel_membership[:user_id]).username,
      space_id: space.id,
      purpose: "",
      is_direct: true
    })
    self_direct.save!
    channel_membership[:is_admin] = true
    channel_membership[:collection_id] = self_direct.id
    Membership.new(channel_membership).save!
  end

  def destroy
    Membership.select('memberships.*').
      where(collection_type: :Channel).
      where(collection_id: params[:id]).
      where(user_id: current_user.id).delete_all

    channel = Channel.find(params[:id])
    render json: {id: channel.id, space_id: channel.space_id}, status: 200
  end

  private

  def membership_params
    # handle the fact that users don't know each other's ids, only usernames : /
    membership_params = params.require(:membership).permit(:collection_type, :collection_id, :username)
    username = params[:membership][:username]
    user = User.find_by(username: username)
    if user.nil?
      return nil
    else
      membership_params[:user_id] = user.id
      # membership_params[:is_pending] = true
      # membership_params[:is_admin] = false
      membership_params.delete(:username)
      membership_params
    end
  end
end
