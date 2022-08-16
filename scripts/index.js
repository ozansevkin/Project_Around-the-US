import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
import { openPopup, closePopup } from "./utils.js";
export { editProfilePopup, addCardPopup, fillEditProfileForm };

// 1. Variable Declarations
const profileName = document.querySelector(".profile__name");
const profileTitle = document.querySelector(".profile__title");

const editProfileButton = document.querySelector(".profile__edit-button");
const addCardButton = document.querySelector(".profile__add-button");

const editProfilePopup = document.querySelector(".popup_type_edit");
const addCardPopup = document.querySelector(".popup_type_add");

const editProfileForm = editProfilePopup.querySelector(".popup__form");
const editProfileFormInputName = editProfileForm.querySelector(
  ".popup__input_type_name"
);
const editProfileFormInputTitle = editProfileForm.querySelector(
  ".popup__input_type_title"
);

const addCardForm = addCardPopup.querySelector(".popup__form");

const cardsContainer = document.querySelector(".cards");
const cardTemplateSelector = "#card-template";

// Settings for form validation
const settings = {
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__submit-button",
  inactiveButtonClass: "popup__submit-button_inactive",
  inputErrorClass: "popup__input_error",
  errorClass: "popup__input-error-text_active",
};

// Form Validators
const addCardFormValidator = new FormValidator(settings, addCardForm);
const editProfileFormValidator = new FormValidator(settings, editProfileForm);

// Cards Array
const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://code.s3.yandex.net/web-code/yosemite.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://code.s3.yandex.net/web-code/lake-louise.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://code.s3.yandex.net/web-code/bald-mountains.jpg",
  },
  { name: "Latemar", link: "https://code.s3.yandex.net/web-code/latemar.jpg" },
  {
    name: "Vanoise National Park",
    link: "https://code.s3.yandex.net/web-code/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://code.s3.yandex.net/web-code/lago.jpg",
  },
];

// 2. Function Declarations

/**
 * Renders a card on the page
 *
 * @param {object} card
 */
function renderCard(card) {
  cardsContainer.prepend(card);
}

/**
 * Returns a new card element with given data
 *
 * @param {object} cardData
 * @param {string} cardTemplateSelector
 * @returns
 */
function createCard(cardData, cardTemplateSelector) {
  const card = new Card(cardData, cardTemplateSelector);
  return card.createCard();
}

/**
 * Handles the changes after the edit profile form submitted
 *
 * @param {object} evt
 */
function handleEditProfileFormSubmit(evt) {
  evt.preventDefault();

  profileName.textContent = editProfileFormInputName.value;
  profileTitle.textContent = editProfileFormInputTitle.value;

  closePopup(editProfilePopup);
}

/**
 * Fills edit profile form with current profile info
 */
function fillEditProfileForm() {
  editProfileFormInputName.value = profileName.textContent;
  editProfileFormInputTitle.value = profileTitle.textContent;
}

/**
 * Handles the changes after the add card form submitted
 *
 * @param {object} evt
 */
function handleAddCardFormSubmit(evt) {
  evt.preventDefault();

  const title = evt.target.title.value;
  const link = evt.target.link.value;

  const newCard = createCard(
    {
      name: title,
      link: link,
    },
    cardTemplateSelector
  );

  renderCard(newCard);
  closePopup(addCardPopup);
  addCardForm.reset();
  addCardFormValidator.toggleButtonState();
}

/**
 * Enables form validation for both forms
 *
 */
function enableValidation() {
  addCardFormValidator.enableValidation();
  editProfileFormValidator.enableValidation();
}

// 3. Event Listeners and function calls

// Click Event Listeners
editProfileButton.addEventListener("click", () => {
  fillEditProfileForm();
  openPopup(editProfilePopup);
});

addCardButton.addEventListener("click", () => openPopup(addCardPopup));

// Rendering Cards
initialCards.forEach((initialCard) =>
  renderCard(createCard(initialCard, cardTemplateSelector))
);

// Submit Event Listeners
editProfileForm.addEventListener("submit", handleEditProfileFormSubmit);
addCardForm.addEventListener("submit", handleAddCardFormSubmit);

// Enable Form Validation
enableValidation();
