export default class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _handleServerResponse(res) {
    return res.ok ? res.json() : Promise.reject(res.status);
  }

  _handleError(err) {
    console.error(`Error caught in fetch API: ${err}`);
  }

  _getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, { headers: this._headers })
      .then(this._handleServerResponse)
      .catch(this._handleError);
  }

  _getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, { headers: this._headers })
      .then(this._handleServerResponse)
      .catch(this._handleError);
  }

  getAppInfo() {
    return Promise.all([this._getUserInfo(), this._getInitialCards()]);
  }

  editUserInfo({ name, about }) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name,
        about,
      }),
    })
      .then(this._handleServerResponse)
      .catch(this._handleError);
  }

  addNewCard({ name, link }) {
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name,
        link,
      }),
    })
      .then(this._handleServerResponse)
      .catch(this._handleError);
  }

  deleteCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    })
      .then(this._handleServerResponse)
      .catch(this._handleError);
  }

  addLike(cardId) {
    return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
      method: "PUT",
      headers: this._headers,
    })
      .then(this._handleServerResponse)
      .catch(this._handleError);
  }

  deleteLike(cardId) {
    return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    })
      .then(this._handleServerResponse)
      .catch(this._handleError);
  }

  editUserAvatar(avatar) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify(avatar),
    })
      .then(this._handleServerResponse)
      .catch(this._handleError);
  }
}
