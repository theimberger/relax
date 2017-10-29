Rails.application.routes.draw do
  root "static_pages#root"

  namespace :api, default: {format: :json} do
    resources :users, only: [:create]
    resource :session, only: [:create, :destroy]

    resources :spaces, except: [:new, :edit] do
      resources :channels, only: [:create, :update, :destroy]
    end

    resources :memberships, only: [:create, :destroy]
  end
end
