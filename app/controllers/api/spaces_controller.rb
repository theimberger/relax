class Api::SpacesController < ApplicationController

  before_action :ensure_logged_in

  def create
    @spcae = Space.new(space_params)
    if @space.save
      render :show
    else
      render json: @space.errors.full_messages, status: 422
    end
  end

  def show

  end

  def index
    p "Space index action fired"
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
