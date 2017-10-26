class Api::SpacesController < ApplicationController

  before_action :ensure_logged_in

  def create
    @space = Space.new(space_params)
    if @space.save

      SpaceMembership.new({
        user_id: current_user.id,
        space_id: @space.id,
        is_admin: true
      }).save!

      render :show
    else
      render json: @space.errors.full_messages, status: 422
    end
  end

  def show
    @space = Space.find(params[:id])
    render :show
  end

  def index
    @spaces = current_user.spaces
    render json: @spaces
  end

  def update
  end

  def destroy
  end

  private
  def space_params
    params.require(:space).permit(:title, :description)
  end
end
