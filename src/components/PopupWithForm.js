import { selectors } from "../utils/constants";
import Popup from "./Popup";

export default class PopupWithForm extends Popup {
  constructor(selector, { submitForm }) {
    super(selector);
    this._submitForm = submitForm;
    this._form = this._element.querySelector(selectors.popupForm);
    this._submitButton = this._element.querySelector(selectors.submitButton);
    this._submitButtonInitialText = this._submitButton.textContent;
    this._inputList = this._element.querySelectorAll(selectors.popupInput);
  }

  close() {
    super.close();
    this._form.reset();
  }

  getInputValues() {
    //collects data from all the input fields and returns that data as an object.
    this._formValues = {};

    this._inputList.forEach((input) => {
      this._formValues[input.name] = input.value;
    });

    return this._formValues;
  }

  setInputValues(data) {
    this._inputList.forEach((input) => {
      // Insert the `value` by the `name` of the input
      input.value = data[input.name];
    });
  }

  enableLoadingState() {
    const e = new RegExp("e" + "$");
    this._submitButton.textContent = this._submitButtonInitialText.replace(
      e,
      "ing..."
    );
  }

  disableLoadingState() {
    this._submitButton.textContent = this._submitButtonInitialText;
  }

  setEventListeners() {
    super.setEventListeners();

    // Submit
    this._element.addEventListener("submit", this._submitForm);
  }
}
