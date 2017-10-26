
@spaces.each do |space|
  json.set! space.id do
    json.partial! "api/spaces/space", space: space
  end
end
