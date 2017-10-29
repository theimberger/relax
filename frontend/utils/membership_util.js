export const createMembership = (spaceId, memberId) => {
  return $.ajax({
    method: "POST",
    url: `api/spaces/${spaceId}/${memberId}`,
  });
};

export const destroyMembership = (spaceId, memberId) => {
  return $.ajax({
    method: "DELETE",
    url: `api/spaces/${spaceId}/${memberId}`,
  });
};
