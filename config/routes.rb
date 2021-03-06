Rails.application.routes.draw do
  root "static_pages#root"

  mount ActionCable.server => '/cable'

  namespace :api, default: {format: :json} do
    resources :users, only: [:create]
    resource :session, only: [:create, :destroy]

    resources :spaces, except: [:new, :edit] do
      resources :channels, only: [:create, :show, :index] do
        resources :messages, only: [:create, :update, :destroy]
      end

      resources :users, only: [:index, :show]
    end

    resources :channels, only: [:show, :update, :destroy]

    resources :memberships, only: [:create, :destroy]
  end
end
