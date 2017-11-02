export const createChannel = (spaceId, channel) => {
  return $.ajax({
    method: "POST",
    url: `api/spaces/${spaceId}/channels`,
    data: channel
  });
};

export const getChannel = (id) => {
  return $.ajax({
    method: "GET",
    url: `api/channels/${id}`,
  });
};

export const deleteChannel = id => {
  return $.ajax({
    method: "DELETE",
    url: `api/channels/${id}`
  });
};

export const updateChannel = channel => {
  return $.ajax({
    method: "PATCH",
    url: `api/channels/${channel.id}`,
    data: channel
  });
};
