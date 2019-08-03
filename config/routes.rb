Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  
  namespace :api, defaults: { format: :json } do
    resources :users, only: [:create]
    resource :session, only: [:create, :destroy]
    resources :channels, only: [:index, :create, :show, :update, :destroy] do
      resources :messages, only: [:create, :index]
    end
    resources :messages, only: [:show, :update, :destroy]

    get 'session/verify_email', to: 'sessions#verify_email'
  end

  root to: 'static_pages#root'

  mount ActionCable.server, at: '/cable'
  
end
