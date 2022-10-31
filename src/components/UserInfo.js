export default class UserInfo {
  constructor({ userNameSelector, userTitleSelector }) {
    this._userName = document.querySelector(userNameSelector);
    this._userTitle = document.querySelector(userTitleSelector);
  }

  getUserInfo() {
    const userNameText = this._userName.textContent;
    const userTitleText = this._userTitle.textContent;

    return { userNameText, userTitleText };
  }

  setUserInfo({ formInputName, formInputTitle }) {
    this._userName.textContent = formInputName;
    this._userTitle.textContent = formInputTitle;
  }
}
