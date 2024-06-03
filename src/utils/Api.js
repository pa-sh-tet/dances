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

  // Получение всех танцев
  getDances() {
    return fetch(`${this._url}/dances`, {
      headers: {
        authorization: `Bearer ${localStorage.getItem('jwt')}`,
        'Content-Type': 'application/json',
      },
      method: 'GET',
    }).then(this._getResponse);
  }

  // Получение всех пользователей
  getUsers() {
    return fetch(`${this._url}/users`, {
      headers: {
        authorization: `Bearer ${localStorage.getItem('jwt')}`,
        'Content-Type': 'application/json',
      },
      method: 'GET',
    }).then(this._getResponse);
  }

  // Добавление нового танца
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

  // Удаление танца
  deleteDance(id) {
    return fetch(`${this._url}/dances/${id}`, {
      headers: {
        authorization: `Bearer ${localStorage.getItem('jwt')}`,
        'Content-Type': 'application/json',
      },
      method: 'DELETE',
    }).then(this._getResponse);
  }

  // Добавление нового пользователя
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

  // Удаление пользователя
  deleteUser(id) {
    return fetch(`${this._url}/users/${id}`, {
      headers: {
        authorization: `Bearer ${localStorage.getItem('jwt')}`,
        'Content-Type': 'application/json',
      },
      method: 'DELETE',
    }).then(this._getResponse);
  }

  // Логин пользователя
  login(data) {
    return fetch(`${this._url}/login`, {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify(data),
    }).then(this._getResponse);
  }
}

const apiConfig = {
  url: 'http://80.78.243.127:5000/',
};

export const api = new Api(apiConfig);
