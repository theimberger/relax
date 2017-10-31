Rails.application.routes.draw do
  root "static_pages#root"

  namespace :api, default: {format: :json} do
    resources :users, only: [:create]
    resource :session, only: [:create, :destroy]

    resources :spaces, except: [:new, :edit] do
      resources :channels, only: [:create]
      resources :users, only: [:index, :show]
    end

    resources :channels, only: [:update, :destroy]
    resources :memberships, only: [:create, :destroy]
  end
end
