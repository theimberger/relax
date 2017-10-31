export const createChannel = (spaceId, channel) => {
  return $.ajax({
    method: "POST",
    url: `api/spaces/${spaceId}/channels`,
    data: channel
  });
};

export const deleteChannel = (spaceId, channel) => {
  return $.ajax({
    method: "DELETE",
    url: `api/spaces/${spaceId}/channels/${channel.id}`
  });
};

export const updateChannel = (spaceId, channel) => {
  return $.ajax({
    method: "PATCH",
    url: `api/spaces/${spaceId}/channels/${channel.id}`,
    data: channel
  });
};
