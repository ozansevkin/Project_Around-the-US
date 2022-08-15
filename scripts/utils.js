import {
  editProfilePopup,
  addCardPopup,
  fillEditProfileForm,
} from "./index.js";
export { closePopup };

// 1. Variable Declarations

const editProfileButton = document.querySelector(".profile__edit-button");
const addCardButton = document.querySelector(".profile__add-button");

// 2. Function Declarations

/**
 * Opens a popup
 *
 * @param {object} popup
 */
export default function openPopup(popup) {
  popup.classList.add("popup_opened");
  document.addEventListener("keydown", closeByEscape);
}

/**
 * Closes a popup
 *
 * @param {object} popup
 */
function closePopup(popup) {
  popup.classList.remove("popup_opened");
  document.removeEventListener("keydown", closeByEscape);
}

/**
 * Closes already opened popup by Escape key
 *
 * @param {object} evt
 */
function closeByEscape(evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".popup_opened");

    closePopup(openedPopup);
  }
}

/**
 * Enables popup close functions for all popups
 */
function enablePopupClose() {
  const popupList = Array.from(document.querySelectorAll(".popup"));

  popupList.forEach((popup) => {
    addOverlayCloseEventListener(popup);
    addCloseButtonEventListener(popup);
  });
}

/**
 * Adds close by clicking overlay functionality to popup
 *
 * @param {object} popup
 */
function addOverlayCloseEventListener(popup) {
  popup.addEventListener("mousedown", (evt) => {
    if (evt.target === evt.currentTarget) {
      closePopup(popup);
    }
  });
}

/**
 * Adds close by clicking close button functionality to popup
 *
 * @param {object} popup
 */
function addCloseButtonEventListener(popup) {
  popup.addEventListener("click", (evt) => {
    if (evt.target.classList.contains("popup__close-button")) {
      closePopup(popup);
    }
  });
}

// 3. Event Listeners and function calls

// Click Event Listeners
editProfileButton.addEventListener("click", () => {
  fillEditProfileForm();
  openPopup(editProfilePopup);
});

addCardButton.addEventListener("click", () => openPopup(addCardPopup));

// Enable Popup Close
enablePopupClose();
