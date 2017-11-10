export function buildOpt(method, data) {
  return {
    method,
    headers: {
      'Content-Type': 'application/json',
      deviceId: 'ztb_deviceId',
    },
    mode: 'cors',
    credentials: 'include',
    body: JSON.stringify(data),
  };
}

export const Methods = {
  POST: 'POST',
  GET: 'GET',
};

export default function(url, method, params) {
  return fetch(url, buildOpt(method, params)).then(res => res.json());
}
