import Popup from "./Popup";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._image = this._element.querySelector(".popup__image");
    this._subtitle = this._element.querySelector(".popup__subtitle");
  }

  open(imageData) {
    this._image.src = imageData.link;
    this._image.alt = `Image ${imageData.name}`;
    this._subtitle.textContent = imageData.name;
    super.open();
  }
}
