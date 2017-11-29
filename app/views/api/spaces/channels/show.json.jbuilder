json.id @channel.id
json.space_id @channel.space_id
json.title @channel.title
json.purpose @channel.purpose
json.created_at @channel.created_at
json.is_direct @channel.is_direct
json.admin @admin.id
json.set! :users do
  json.array! @channel.users, partial: 'api/users/user', as: :user
end
json.set! :messages do
  json.array! @channel.messages, partial: 'api/spaces/channels/messages/message', as: :message
end
