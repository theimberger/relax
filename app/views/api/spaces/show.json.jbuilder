
json.id @space.id
json.title @space.title
json.description @space.description
json.set! :channels do
  json.array! @channels, partial: 'api/spaces/channels/channel', as: :channel
end
json.set! :users do
  json.array! @members, partial: 'api/users/user', as: :user
end
