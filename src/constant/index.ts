export const PROXY_URL = "http://localhost:8080";
export const BASE_URL = `${PROXY_URL}/https://api.yelp.com/v3/businesses`;
export const SEARCH_URL = `${BASE_URL}/search`;
export const LIMIT_DATA_URL = 20;

/** SEARCH URL CONSTANT */
export const QUERY_LOCATION = "location";
export const QUERY_LATITUDE = "latitude";
export const QUERY_LONGITUDE = "longitude";
export const QUERY_OPEN_NOW = "open_now";
export const QUERY_LIMIT = "limit";
export const QUERY_OFFSET = "offset";
export const QUERY_TERM = "term";

export const API_KEY = `Bearer ${import.meta.env.VITE_TOKEN}`;
export const MAP_KEY = import.meta.env.VITE_APP_MAPBOX_ACCESS_TOKEN;
