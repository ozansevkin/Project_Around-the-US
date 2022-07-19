// 1. Variable Declarations
const profileName = document.querySelector(".profile__name");
const profileTitle = document.querySelector(".profile__title");

const editProfileButton = document.querySelector(".profile__edit-button");
const addCardButton = document.querySelector(".profile__add-button");

const editProfilePopup = document.querySelector(".popup_type_edit");
const addCardPopup = document.querySelector(".popup_type_add");
const cardImagePopup = document.querySelector(".popup_type_image");

const editProfileForm = editProfilePopup.querySelector(".popup__form");
const editProfileFormInputName = editProfileForm.querySelector(
  ".popup__input_type_name"
);
const editProfileFormInputTitle = editProfileForm.querySelector(
  ".popup__input_type_title"
);
const editProfileFormSubmitButton = editProfileForm.querySelector(
  ".popup__submit-button"
);

const addCardForm = addCardPopup.querySelector(".popup__form");

const cardImagePopupImage = cardImagePopup.querySelector(".popup__image");
const cardImagePopupSubtitle = cardImagePopup.querySelector(".popup__subtitle");

const cardsContainer = document.querySelector(".cards");
const cardTemplate = document.querySelector("#card-template").content;

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
 * Creates a card
 *
 * @param {object} data card's title(string) and URL(string)
 * @returns {object} card
 */
function createCard(data) {
  const card = cardTemplate.querySelector(".card").cloneNode(true);

  const cardTitle = card.querySelector(".card__title");
  const cardImage = card.querySelector(".card__image");
  const cardLikeButton = card.querySelector(".card__like-button");
  const cardDeleteButton = card.querySelector(".card__delete-button");

  cardTitle.textContent = data.name;
  cardImage.src = data.link;
  cardImage.alt = data.name;
  listenCardLikeButtonClick(cardLikeButton);
  listenCardDeleteButtonClick(cardDeleteButton);
  listenCardImageClick(cardImage);

  return card;
}

/**
 * Renders a card on the page
 *
 * @param {object} card
 */
function renderCard(card) {
  cardsContainer.prepend(card);
}

/**
 * Opens a popup
 *
 * @param {object} popup
 */
function openPopup(popup) {
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

  const newCard = createCard({
    name: title,
    link: link,
  });

  renderCard(newCard);
  closePopup(addCardPopup);
  addCardForm.reset();
  disableSubmitButton(addCardPopup);
}

/**
 * Adds an event listener for card like button and defines its callback function
 *
 * @param {object} cardLikeButton
 */
function listenCardLikeButtonClick(cardLikeButton) {
  cardLikeButton.addEventListener("click", () => {
    cardLikeButton.classList.toggle("card__like-button_clicked");
  });
}

/**
 * Adds an event listener for card delete button and defines its callback function
 *
 * @param {object} cardDeleteButton
 */
function listenCardDeleteButtonClick(cardDeleteButton) {
  cardDeleteButton.addEventListener("click", () => {
    cardDeleteButton.closest(".card").remove();
  });
}

/**
 * Adds an event listener for card image and defines its callback function
 *
 * @param {object} cardImage
 */
function listenCardImageClick(cardImage) {
  cardImage.addEventListener("click", () => {
    cardImagePopupImage.src = cardImage.src;
    cardImagePopupImage.alt = cardImage.alt;
    cardImagePopupSubtitle.textContent = cardImage.alt;
    openPopup(cardImagePopup);
  });
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
 * Disables submit button of the popup
 *
 * @param {object} popup
 */
function disableSubmitButton(popup) {
  const submitButton = popup.querySelector(".popup__submit-button");
  submitButton.classList.add("popup__submit-button_inactive");
  submitButton.setAttribute("disabled", true);
}

// 3. Event Listeners and function calls

// Rendering Cards
initialCards.forEach((initialCard) => renderCard(createCard(initialCard)));

// Click Event Listeners
editProfileButton.addEventListener("click", () => {
  fillEditProfileForm();
  openPopup(editProfilePopup);
});

addCardButton.addEventListener("click", () => openPopup(addCardPopup));

// Submit Event Listeners
editProfileForm.addEventListener("submit", handleEditProfileFormSubmit);
addCardForm.addEventListener("submit", handleAddCardFormSubmit);

// Enable Popup Close
enablePopupClose();
