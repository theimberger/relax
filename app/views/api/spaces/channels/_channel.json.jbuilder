json.id channel.id
json.title channel.title
json.is_direct channel.is_direct
json.purpose channel.purpose
json.created_at channel.created_at
json.set! :users do
  json.array! channel.users, partial: 'api/users/user', as: :user
end
