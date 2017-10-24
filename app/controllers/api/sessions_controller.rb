class Api::SessionsController < ApplicationController

  def create
    debugger
    if !logged_in?
      @user = User.find_by_credentials(
        params[:user][:username],
        params[:user][:password]
      )
      if @user
        login(@user)
      else
        render json: ["Invalid login information."], status: 422
      end
    else
      render json: ["A user is already logged in."], status: 422
    end
  end

  def destroy
    if logged_in?
      logout()
    else
      render json: ["No user currently logged in."], status: 422
    end
  end

end
