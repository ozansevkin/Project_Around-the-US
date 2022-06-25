// 1. Variable Declarations
const profileEditButton = document.querySelector(".profile__edit-button");
const profileAddButton = document.querySelector(".profile__add-button");

const profileName = document.querySelector(".profile__name");
const profileTitle = document.querySelector(".profile__title");

const popupEdit = document.querySelector(".popup_type_edit");
const popupAdd = document.querySelector(".popup_type_add");
const popupImage = document.querySelector(".popup_type_image");

const popupEditForm = popupEdit.querySelector(".popup__container");
const popupEditInputName = popupEdit.querySelector(".popup__input_type_name");
const popupEditInputTitle = popupEdit.querySelector(".popup__input_type_title");
const popupEditSubmitButton = popupEdit.querySelector(".popup__submit-button");
const popupEditCloseButton = popupEdit.querySelector(".popup__close-button");

const popupAddForm = popupAdd.querySelector(".popup__container");
const popupAddSubmitButton = popupAdd.querySelector(".popup__submit-button");
const popupAddCloseButton = popupAdd.querySelector(".popup__close-button");

const popupImageEl = popupImage.querySelector(".popup__image");
const popupImageSub = popupImage.querySelector(".popup__subtitle");
const popupImageCloseButton = popupImage.querySelector(".popup__close-button");

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
function getCardElement(data) {
  const cardTemplate = document.querySelector("#card-template").content;
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);

  const cardTitle = cardElement.querySelector(".card__title");
  const cardImage = cardElement.querySelector(".card__image");
  const cardLikeButton = cardElement.querySelector(".card__like-button");
  const cardDeleteButton = cardElement.querySelector(".card__delete-button");

  cardTitle.textContent = data.name;
  cardImage.src = data.link;
  cardImage.alt = data.name;
  cardLikeButtonEventListener(cardLikeButton);
  cardDeleteButtonEventListener(cardDeleteButton);
  cardImageEventListener(cardImage);

  const cardsContainer = document.querySelector(".cards");
  cardsContainer.append(cardElement);
}

function popupOpenHandler(popup) {
  popup.classList.add("popup_opened");
}

function popupCloseHandler(popup) {
  popup.classList.remove("popup_opened");
}

function popupEditSubmitHandler(evt) {
  evt.preventDefault();

  profileName.textContent = popupEditInputName.value;
  profileTitle.textContent = popupEditInputTitle.value;

  popupEdit.classList.remove("popup_opened");
}

function popupAddSubmitHandler(evt) {
  evt.preventDefault();

  const title = evt.target.title.value;
  const link = evt.target.link.value;

  getCardElement({
    name: title,
    link: link,
  });

  popupCloseHandler(popupAdd);

  evt.target.title.value = "";
  evt.target.link.value = "";
}

function cardLikeButtonEventListener(cardLikeButton) {
  cardLikeButton.addEventListener("click", () => {
    cardLikeButton.classList.toggle("card__like-button_clicked");
  });
}

function cardDeleteButtonEventListener(cardDeleteButton) {
  cardDeleteButton.addEventListener("click", () => {
    cardDeleteButton.parentElement.remove();
  });
}

function cardImageEventListener(cardImage) {
  cardImage.addEventListener("click", () => {
    popupImageEl.src = cardImage.src;
    popupImageEl.alt = cardImage.alt;
    popupImageSub.textContent = cardImage.alt;
    popupImage.classList.add("popup_opened");
  });
}

// 3. Event Listeners and function calls

// Rendering Cards
initialCards.forEach((initialCard) => getCardElement(initialCard));

// Button Event Listeners
profileEditButton.addEventListener("click", () => {
  popupEditInputName.value = profileName.textContent;
  popupEditInputTitle.value = profileTitle.textContent;
  popupOpenHandler(popupEdit);
});

profileAddButton.addEventListener("click", () => popupOpenHandler(popupAdd));

popupEditCloseButton.addEventListener("click", () =>
  popupCloseHandler(popupEdit)
);

popupAddCloseButton.addEventListener("click", () =>
  popupCloseHandler(popupAdd)
);

popupImageCloseButton.addEventListener("click", () =>
  popupCloseHandler(popupImage)
);

// Submit Event Listeners
popupEditForm.addEventListener("submit", popupEditSubmitHandler);
popupAddForm.addEventListener("submit", popupAddSubmitHandler);
