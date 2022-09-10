export function convertToSearchParams(params) {
  if (!params) {
    return "";
  }
  const url = new URLSearchParams();
  const keys = Object.keys(params);
  for (const key of keys) {
    if (typeof params[key] === "object") {
      url.append(key, JSON.stringify(params[key]));
    } else {
      url.append(key, params[key]);
    }
  }
  return url.toString();
}
