export const createSpace = (space) => {
  return $.ajax({
    method: "POST",
    url: "api/spaces",
    data: space
  });
};

export const updateSpace = (space) => {
  return $.ajax({
    method: "PATCH",
    url: `api/spaces/${space.space.id}`,
    data: space
  });
};

export const fetchUserSpaces = () => {
  return $.ajax({
    method: "GET",
    url: "api/spaces"
  });
};

export const fetchSingleSpace = (id) => {
  return $.ajax({
    method: "GET",
    url: `api/spaces/${id}`
  });
};
