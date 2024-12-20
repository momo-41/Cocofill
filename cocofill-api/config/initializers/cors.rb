# Be sure to restart your server when you modify this file.

# Avoid CORS issues when API is called from the frontend app.
# Handle Cross-Origin Resource Sharing (CORS) in order to accept cross-origin Ajax requests.

# Read more: https://github.com/cyu/rack-cors

# origins "https://cocofill-two.vercel.app", 'http://localhost:3000' # ポート番号の違うNext.js側のアクセス(3000)を許可する

Rails.application.config.middleware.insert_before 0, Rack::Cors do
  allow do
    origins "https://cocofill-two.vercel.app", "http://localhost:3001"
    # ポート番号の違うNext.js側のアクセス(3000)を許可する

    resource "*",
      headers: :any,
      methods: [:get, :post, :put, :patch, :delete, :options, :head]
  end
end
