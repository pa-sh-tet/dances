class Api {
  constructor({ url }) {
    this._url = url;
  }

  _getResponse(res) {
    if (res.ok) {
      return res.text().then(text => text ? JSON.parse(text) : {});
    }

    return Promise.reject(`Возникла ошибка: ${res.status}`);
  }

  getDances() {
    return fetch(`${this._url}/dances`, {
      headers: {
        authorization: `Bearer ${localStorage.getItem('jwt')}`,
        'Content-Type': 'application/json',
      },
      method: 'GET',
    }).then(this._getResponse);
  }

  getUsers() {
    return fetch(`${this._url}/users`, {
      headers: {
        authorization: `Bearer ${localStorage.getItem('jwt')}`,
        'Content-Type': 'application/json',
      },
      method: 'GET',
    }).then(this._getResponse);
  }

  addDance(data) {
    return fetch(`${this._url}/dances`, {
      headers: {
        authorization: `Bearer ${localStorage.getItem('jwt')}`,
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify(data),
    }).then(this._getResponse);
  }

  deleteDance(id) {
    return fetch(`${this._url}/dances/${id}`, {
      headers: {
        authorization: `Bearer ${localStorage.getItem('jwt')}`,
        'Content-Type': 'application/json',
      },
      method: 'DELETE',
    }).then(this._getResponse);
  }

  addUser(data) {
    return fetch(`${this._url}/users`, {
      headers: {
        authorization: `Bearer ${localStorage.getItem('jwt')}`,
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify(data),
    }).then(this._getResponse);
  }

  deleteUser(id) {
    return fetch(`${this._url}/users/${id}`, {
      headers: {
        authorization: `Bearer ${localStorage.getItem('jwt')}`,
        'Content-Type': 'application/json',
      },
      method: 'DELETE',
    }).then(this._getResponse);
  }

  login(data) {
    return fetch(`${this._url}/login`, {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify(data),
    }).then(this._getResponse);
  }

  sendContact(data) {
    return fetch(`${this._url}/contact`, {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify(data),
    })
    .then(res => {
      return res.json().then(json => ({
        status: res.status,
        ok: res.ok,
        json
      }));
    });
  }

  updateDance(id, data) {
    return fetch(`${this._url}/dances/${id}`, {
      headers: {
        authorization: `Bearer ${localStorage.getItem('jwt')}`,
        'Content-Type': 'application/json',
      },
      method: 'PATCH', // Изменение метода запроса на PATCH
      body: JSON.stringify(data),
    }).then(this._getResponse);
  }

  updateUser(id, data) {
    return fetch(`${this._url}/users/${id}`, {
      headers: {
        authorization: `Bearer ${localStorage.getItem('jwt')}`,
        'Content-Type': 'application/json',
      },
      method: 'PATCH',
      body: JSON.stringify(data),
    }).then(this._getResponse);
  }
}

const apiConfig = {
  // Рабочий вариант:
  url: 'http://80.78.243.127',

  // Для демонстрации:
  // url: 'http://localhost:5000',
};

export const api = new Api(apiConfig);
