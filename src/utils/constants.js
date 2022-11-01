export const initialCards = [
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

// Settings for form validation
export const formSettings = {
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__submit-button",
  inactiveButtonClass: "popup__submit-button_inactive",
  inputErrorClass: "popup__input_error",
  errorClass: "popup__input-error-text_active",
};

// Selectors
export const selectors = {
  cardsContainer: ".cards",
  cardTemplate: "#card-template",
  card: ".card",
  cardTitle: ".card__title",
  cardImage: ".card__image",
  cardLikeButton: ".card__like-button",
  cardLikeButtonActiveClass: "card__like-button_clicked",
  cardDeleteButton: ".card__delete-button",
  popupImage: ".popup_type_image",
  editProfilePopup: ".popup_type_edit",
  addCardPopup: ".popup_type_add",
  popupForm: ".popup__form",
  popupInput: ".popup__input",
  userName: ".profile__name",
  userTitle: ".profile__title",
  editButton: ".profile__edit-button",
  addButton: ".profile__add-button",
  profileFormName: "profile-form",
  cardFormName: "card-form",
};
