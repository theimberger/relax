export const createMembership = membership => {
  return $.ajax({
    method: "POST",
    url: "api/memberships",
    data: membership
  });
};

export const destroyMembership = (channelId, user = {}) => {
  return $.ajax({
    method: "DELETE",
    url: `api/memberships/${channelId}`,
    data: user
  });
};
