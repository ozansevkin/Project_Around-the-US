import { selectors } from "./constants";
import Popup from "./Popup";

export default class PopupWithForm extends Popup {
  constructor(selector, { submitForm }) {
    super(selector);
    this._submitForm = submitForm;
  }

  close() {
    super.close();
    this._element.querySelector(selectors.popupForm).reset();
  }

  _getInputValues() {
    //collects data from all the input fields and returns that data as an object.

    const inputArray = this._element.querySelectorAll(".popup__input");

    return { ...inputArray };
  }

  setEventListeners() {
    super.setEventListeners();
    // Submit
    this._element.addEventListener("submit", this._submitForm);

    // Close Button
    this._element.addEventListener("click", (evt) => {
      if (evt.target.classList.contains("popup__close-button")) {
        this.close();
      }
    });
  }
}
