export const createSpace = (space) => {
  return $.ajax({
    method: "POST",
    url: "api/spaces",
    error: (err) => console.log(err)
  });
};

export const fetchSpaces = () => {
  return $.ajax({
    method: "GET",
    url: "api/spaces",
    error: (err) => console.log(err)
  });
};
