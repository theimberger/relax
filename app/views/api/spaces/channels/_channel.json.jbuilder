json.id channel.id
json.title channel.title
json.is_direct channel.is_direct
json.set! :users do
  json.array! channel.users, partial: 'api/users/user', as: :user
end
