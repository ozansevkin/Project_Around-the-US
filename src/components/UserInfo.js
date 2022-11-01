export default class UserInfo {
  constructor({ userNameSelector, userTitleSelector }) {
    this._userName = document.querySelector(userNameSelector);
    this._userTitle = document.querySelector(userTitleSelector);
  }

  getUserInfo() {
    const name = this._userName.textContent;
    const title = this._userTitle.textContent;

    return { name, title };
  }

  setUserInfo({ formInputName, formInputTitle }) {
    this._userName.textContent = formInputName;
    this._userTitle.textContent = formInputTitle;
  }
}
