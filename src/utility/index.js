// Truncate a string to a specified maximum length and append "..." if truncated.
const formatString = (string, maxLen) => {
  if (string.length < maxLen) {
    return string;
  } else {
    return string.substring(0, maxLen) + "...";
  }
};

// Set query parameters in the URL based on an array of { key, value } pairs.
const setQueryParams = (paramsArray) => {
  const url = new URL(window.location.href);
  const queryParams = new URLSearchParams(url.search);

  paramsArray.forEach(({ key, value }) => {
    queryParams.set(key, value);
  });

  window.history.pushState({}, "", `${url.pathname}?${queryParams.toString()}`);
};

// Get query parameters from the current window location and return them as an object.
const getQueryParams = () => {
  const url = new URL(window.location.href);
  const queryParams = new URLSearchParams(url.search);
  const params = {};

  queryParams.forEach((value, key) => {
    params[key] = value;
  });

  return params;
};

export { formatString, setQueryParams, getQueryParams };
