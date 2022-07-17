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
const editProfilePopupCloseButton = editProfilePopup.querySelector(
  ".popup__close-button"
);

const addCardForm = addCardPopup.querySelector(".popup__form");
const addCardPopupCloseButton = addCardPopup.querySelector(
  ".popup__close-button"
);

const cardImagePopupImage = cardImagePopup.querySelector(".popup__image");
const cardImagePopupSubtitle = cardImagePopup.querySelector(".popup__subtitle");
const cardImagePopupCloseButton = cardImagePopup.querySelector(
  ".popup__close-button"
);

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
}

/**
 * Closes a popup
 *
 * @param {object} popup
 */
function closePopup(popup) {
  popup.classList.remove("popup_opened");
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

// Popup Close
function enablePopupClose() {
  const popupList = Array.from(document.querySelectorAll(".popup"));

  popupList.forEach((popup) => {
    addOverlayCloseEventListener(popup);
    addEscCloseEventListener(popup);
  });
}

function addOverlayCloseEventListener(popup) {
  popup.addEventListener("mousedown", (evt) => {
    if (evt.target === evt.currentTarget) {
      closePopup(popup);
    }
  });
}

function addEscCloseEventListener(popup) {
  popup.addEventListener("keydown", (evt) => {
    if (evt.key === "Escape") {
      closePopup(popup);
    }
  });
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

editProfilePopupCloseButton.addEventListener("click", () =>
  closePopup(editProfilePopup)
);

addCardPopupCloseButton.addEventListener("click", () =>
  closePopup(addCardPopup)
);

cardImagePopupCloseButton.addEventListener("click", () =>
  closePopup(cardImagePopup)
);

// Submit Event Listeners
editProfileForm.addEventListener("submit", handleEditProfileFormSubmit);
addCardForm.addEventListener("submit", handleAddCardFormSubmit);

// Enable Popup Close
enablePopupClose();
