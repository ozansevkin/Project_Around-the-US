// Import CSS for Webpack
import "../pages/index.css";

// Import classses
import { selectors, initialCards, settings } from "./constants";
import Card from "./Card";
import FormValidator from "./FormValidator";
import Section from "./Section";
import PopupWithImage from "./PopupWithImage";
import PopupWithForm from "./PopupWithForm";
import UserInfo from "./UserInfo";

// Variable Declarations
const editProfileForm = document
  .querySelector(selectors.editProfilePopup)
  .querySelector(selectors.popupForm);
const editProfileFormInputName = editProfileForm.querySelector(
  ".popup__input_type_name"
);
const editProfileFormInputTitle = editProfileForm.querySelector(
  ".popup__input_type_title"
);

const addCardForm = document
  .querySelector(selectors.addCardPopup)
  .querySelector(selectors.popupForm);

const editProfileButton = document.querySelector(".profile__edit-button");
const addCardButton = document.querySelector(".profile__add-button");

// Function Declarations
/**
 * Fills edit profile form with current profile info
 */
function fillEditProfileForm() {
  const userInfo = user.getUserInfo();
  editProfileFormInputName.value = userInfo.userNameText;
  editProfileFormInputTitle.value = userInfo.userTitleText;
}

// Create instances of Classes
const user = new UserInfo({
  userNameSelector: selectors.userName,
  userTitleSelector: selectors.userTitle,
});

const cardSection = new Section(
  {
    items: initialCards,
    renderer: (data) => {
      const card = new Card(
        {
          data,
          handleCardImageClick: (imageData) => {
            cardPreviewPopup.open(imageData);
          },
        },
        selectors.cardTemplate
      );
      cardSection.addItem(card.createCard());
    },
  },
  selectors.cardsContainer
);

const cardPreviewPopup = new PopupWithImage(selectors.popupImage);

const editProfilePopup = new PopupWithForm(selectors.editProfilePopup, {
  submitForm: (evt) => {
    evt.preventDefault();

    const inputValues = editProfilePopup._getInputValues();

    user.setUserInfo({
      formInputName: inputValues[0].value,
      formInputTitle: inputValues[1].value,
    });

    editProfilePopup.close();
  },
});

const addCardPopup = new PopupWithForm(selectors.addCardPopup, {
  submitForm: (evt) => {
    evt.preventDefault();

    const inputValues = addCardPopup._getInputValues();

    const title = inputValues[0].value;
    const link = inputValues[1].value;
    const data = { name: title, link: link };

    const newCard = new Card(
      {
        data,
        handleCardImageClick: (imageData) => {
          cardPreviewPopup.open(imageData);
        },
      },
      selectors.cardTemplate
    );

    cardSection.addItem(newCard.createCard());

    addCardPopup.close();
    addCardFormValidator.toggleButtonState();
  },
});

// Form Validators
const addCardFormValidator = new FormValidator(settings, addCardForm);
const editProfileFormValidator = new FormValidator(settings, editProfileForm);

// Initialize all my instances
cardSection.renderItems();
cardPreviewPopup.setEventListeners();
editProfilePopup.setEventListeners();
addCardPopup.setEventListeners();
addCardFormValidator.enableValidation();
editProfileFormValidator.enableValidation();

// All the rest

// Click Event Listeners
editProfileButton.addEventListener("click", () => {
  fillEditProfileForm();
  editProfilePopup.open();
});

addCardButton.addEventListener("click", () => addCardPopup.open());
