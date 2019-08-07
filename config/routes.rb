Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  
  namespace :api, defaults: { format: :json } do
    
    resources :users, only: [:create, :show]
    resource :session, only: [:create, :destroy]
    resources :channels, only: [:index, :create, :show, :update, :destroy] do
      resources :messages, only: [:create, :index]
      # resources :users, only: [:index]
      get 'leave_channel', to: 'channel_members#destroy'
      get 'add_channel', to: 'channels#add_channel'
    end
    resources :messages, only: [:show, :update, :destroy]
    resources :users, only: [:index]

    get 'get_users', to: 'users#get_users'
    get 'session/verify_email', to: 'sessions#verify_email'
  end

  root to: 'static_pages#root'

  mount ActionCable.server, at: '/cable'
  
end
