class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception
  helper_method :logged_in?, :current_user

  def login(user)
    @current_user = user
    session[:session_token] = @current_user.reset_session_token
  end

  def current_user
    @current_user ||= User.find_by(session_token: session[:session_token])
  end

  def logged_in?
    !!current_user
  end

  def logout
      session[:session_token] = nil
      current_user.reset_session_token
      @current_user = nil
  end

  def ensure_logged_in
    unless logged_in?
      render json: ["You must be logged in."], status: 403
    end
  end

end
