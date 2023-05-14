const config = {
  baseUrl: 'https://api.green-api.com/waInstance',
  headers: {
    'content-type': 'application/json',
  },
}

const onResponse = (res) => {
  return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
};

export const isAuth = (data) => {
  return fetch(`${config.baseUrl}${data.instance}/getStateInstance/${data.token}`, {
    headers: config.headers,
    method: 'GET',
  }).then((res) => onResponse(res));
}

export const sendMessage = (id, message) => {
  const instance = sessionStorage.getItem('instance');
  const token = sessionStorage.getItem('token');
  return fetch(`${config.baseUrl}${instance}/SendMessage/${token}`, {
    headers: config.headers,
    method: 'POST',
    body: JSON.stringify({ chatId: `${id}@c.us`, message: `${message}` })
  }).then((res) => onResponse(res));
}

export const getMessage = () => {
  const instance = sessionStorage.getItem('instance');
  const token = sessionStorage.getItem('token');
  return fetch(`${config.baseUrl}${instance}/receiveNotification/${token}`, {
    headers: config.headers,
    method: 'GET',
  }).then((res) => onResponse(res));
}

export const removeMessageFromStack = (id) => {
  const instance = sessionStorage.getItem('instance');
  const token = sessionStorage.getItem('token');
  return fetch(`${config.baseUrl}${instance}/DeleteNotification/${token}/${id}`, {
    headers: config.headers,
    method: 'DELETE',
  }).then((res) => onResponse(res));
}
