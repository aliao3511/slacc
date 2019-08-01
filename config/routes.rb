Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root to: 'static_pages#root'

  namespace :api, defaults: { format: :json } do
    resources :users, only: [:create]
    resource :session, only: [:create, :destroy]
    resource :channels, only: [:index, :create, :show, :update, :destroy]
  
    get 'session/verify_email', to: 'sessions#verify_email'
  end
end
