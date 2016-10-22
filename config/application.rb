require_relative 'boot'

require 'rails/all'

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module Nbchack
  class Application < Rails::Application
    # Settings in config/environments/* take precedence over those specified here.
    # Application configuration should go into files in config/initializers
    # -- all .rb files in that directory are automatically loaded.

    config.autoload_paths += %W(#{Rails.root}/app/modules)
    config.autoload_paths += %W(#{Rails.root}/app/modules/**)
    config.autoload_paths += %W(#{Rails.root}/lib)
    config.autoload_paths += %W(#{Rails.root}/lib/**)

    # Enable the asset pipeline
    config.assets.enabled = true

    # Version of your assets, change this if you want to expire all your assets
    config.assets.version = '1.0'

    config.assets.precompile += ['application.css']
    config.assets.precompile << /(^[^_\/]|\/[^_])[^\/]*$/

    config.assets.initialize_on_precompile = false
    config.assets.paths << Rails.root.join("vendor","assets", "fonts")

    config.before_initialize do
      dev = File.join(Rails.root, 'config', 'config.yml')
      YAML.load(File.open(dev)).each do |key, value|
        ENV[key.to_s] = value
      end if File.exists?(dev)
    end

  end
end
