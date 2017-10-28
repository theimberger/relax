class Api::SpacesController < ApplicationController

  before_action :ensure_logged_in

  def create
    @space = Space.new(space_params)
    if @space.save
      SpaceMembership.new({
        user_id: current_user.id,
        space_id: @space.id,
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
    membership = SpaceMembership.find_by(
      space_id: params[:id],
      user_id: current_user.id
    )
    if membership.length == 0
      render json: ["Either this space doesn't exist or you don't have permission to view it."], status: 403
    else
      membership = membership.first
      #in case a user visits a website they have not accepted an invite too
      #but are still members
      membership.is_pending = false
      @space = Space.find(membership.space_id)
      @members = @space.users
      render :show
    end
  end

  def index
    @spaces = current_user.spaces
    render json: @spaces
  end

  def update
    @space = Space.find(params[:space][:id])
    admin_id = SpaceMembership.where(space_id: @space.id, is_admin: true).pluck(:user_id)
    if admin_id.include?(current_user.id)
      if @space.save(space_params);
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
    params.require(:space).permit(:title, :description)
  end
end