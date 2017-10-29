class Api::MembershipsController < ApplicationController

  def create
    if membership_params.nil?
      render json: ["No such user"], status: 422
    else
      membership = Membership.new(membership_params)
      membership.save!
      debugger
      render json: ["membership processed"], status: 200
    end
  end

  def destroy
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
