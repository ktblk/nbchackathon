Rails.application.routes.draw do
  get 'telemundo/index'

  root 'user#index'

  get 'user/generate_video'

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
