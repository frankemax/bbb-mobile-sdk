const humanizeSeconds = (time) => {
  if (!time) {
    return '00:00';
  }
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  return [
    minutes,
    seconds,
  ].map((x) => {
    if (x < 10) {
      return `0${x}`;
    }
    return x;
  },).join(':');
};

// Function to parse query parameters from a URL
const parseQueryString = (url) => {
  const queryString = url.split('?')[1];
  if (!queryString) {
    return {};
  }

  const params = {};
  const keyValuePairs = queryString.split('&');

  keyValuePairs.forEach((pair) => {
    const [key, value] = pair.split('=');
    params[key] = decodeURIComponent(value || '');
  });

  return params;
};

const getHostFromUrl = (url) => {
  const regex = /^(?:[^:\n]+:\/\/)?([^:#/\n]*)/;
  const match = url.match(regex);
  const host = match ? match[1] : null;
  return host;
};

export default {
  humanizeSeconds,
  parseQueryString,
  getHostFromUrl
};
