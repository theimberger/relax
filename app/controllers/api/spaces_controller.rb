class Api::SpacesController < ApplicationController

  before_action :ensure_logged_in
  def create
    @space = Space.new(space_params)
    if @space.save

      #upon space save we create new membership instances for the current user
      #and new space, as well as two channesl - a general and a direct
      #message channel for the user with themself

      Membership.new({
        user_id: current_user.id,
        collection_id: @space.id,
        collection_type: :Space,
        is_admin: true,
        is_pending: false
      }).save!

      channel = Channel.new({
        title: "general",
        space_id: @space.id,
        purpose: "A channel for general discussion"
      })

      self_direct = Channel.new({
        title: current_user.username,
        space_id: @space.id,
        purpose: "",
        is_direct: true
      })

      channel.save!
      self_direct.save!

      Membership.new({
        user_id: current_user.id,
        collection_id: channel.id,
        collection_type: :Channel,
        is_admin: true,
        is_pending: false
      }).save!

      Membership.new({
        user_id: current_user.id,
        collection_id: self_direct.id,
        collection_type: :Channel,
        is_admin: true,
        is_pending: false
        }).save!

      render :show
    else
      render json: @space.errors.full_messages, status: 422
    end
  end

  def show
    #check to make sure user is a member
    membership = Membership.find_by(
      collection_id: params[:id],
      collection_type: :Space,
      user_id: current_user.id
    )
    if membership.nil?
      render json: ["Either this space doesn't exist or you don't have permission to view it."], status: 403
    else
      # membership = membership.first
      #in case a user visits a website they have not accepted an invite too
      #but are still members
      membership.is_pending = false
      membership.save
      # also, let's pass down whether the user is an admin
      @is_admin = membership.is_admin

      #space info
      @space = Space.find(membership.collection_id)
      @channels = @space.channels
      @channels = @channels.select { |channel| channel.users.include?(current_user) }
      @members = @space.users.joins(:memberships).select('users.*').where('memberships.is_pending = FALSE').uniq
      render :show
    end
  end

  def index
    @spaces = current_user.spaces
      .joins(:memberships)
      .select('spaces.*, memberships.is_pending')
    render json: @spaces
  end

  def update
    @space = Space.find(params[:space][:id])
    admin_id = Membership.where(collection_id: @space.id, collection_type: :Space, is_admin: true).pluck(:user_id)
    if admin_id.include?(current_user.id)
      if @space.update(space_params);
        render :show
      else
        render json @space.errors.full_messages, status: 422
      end
    else
      render json: ["You are not an admin for this space."], status: 403
    end
  end

  def destroy
  end

  private
  def space_params
    params.require(:space).permit(:id, :title, :description)
  end
end
