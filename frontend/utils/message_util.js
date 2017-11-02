export const postMessage = (spaceId, channelId, message) => {
  return $.ajax({
    method: 'POST',
    url: `api/spaces/${spaceId}/channels/${channelId}/messages`,
    data: message
  });
};
