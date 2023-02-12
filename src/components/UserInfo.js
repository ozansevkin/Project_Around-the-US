import { selectors } from "../utils/constants";

export default class UserInfo {
  constructor() {
    this._userName = document.querySelector(selectors.userName);
    this._userAbout = document.querySelector(selectors.userAbout);
    this._userAvatar = document.querySelector(selectors.userAvatar);
    this._userInfo = document.querySelector(selectors.userInfo);
  }

  getUserInfo() {
    const name = this._userName.textContent;
    const about = this._userAbout.textContent;

    return { name, about };
  }

  renderUserInfo({ name, about, avatar, _id }) {
    this._userName.textContent = name;
    this._userAbout.textContent = about;
    this._userAvatar.src = avatar;
    this._userInfo.id = _id;
  }
}
