export default class Popup {
  constructor(popupSelector) {
    this._selector = popupSelector;
    this._element = document.querySelector(this._selector);
  }

  open() {
    this._element.classList.add("popup_opened");
    document.addEventListener("keydown", this._handleEscClose);
  }

  close() {
    this._element.classList.remove("popup_opened");
    document.removeEventListener("keydown", this._handleEscClose);
  }

  // Arrow method
  _handleEscClose = (evt) => {
    if (evt.key === "Escape") {
      this.close();
    }
  };

  setEventListeners() {
    // Overlay Close
    this._element.addEventListener("mousedown", (evt) => {
      if (evt.target === evt.currentTarget) {
        this.close();
      }
    });

    // Close Button
    this._element.addEventListener("click", (evt) => {
      if (evt.target.classList.contains("popup__close-button")) {
        this.close();
      }
    });
  }
}
