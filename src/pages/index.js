// Import CSS for Webpack
import "./index.css";

// Import classses and constants
import { selectors, formSettings } from "../utils/constants";
import Card from "../components/Card";
import FormValidator from "../components/FormValidator";
import Section from "../components/Section";
import PopupWithImage from "../components/PopupWithImage";
import PopupWithForm from "../components/PopupWithForm";
import UserInfo from "../components/UserInfo";
import Api from "../components/Api";

// Variable Declarations
const editProfileButton = document.querySelector(selectors.editButton);
const addCardButton = document.querySelector(selectors.addButton);
const editAvatarOverlay = document.querySelector(selectors.editAvatarOverlay);
const formValidators = {};

// Function Declarations

/**
 * Fills profile form with current profile info
 */
function fillProfileForm() {
  const userInfo = user.getUserInfo();
  editProfilePopup.setInputValues(userInfo);
}

/**
 * Creates a new card element with given data (name and image link)
 *
 * @param {object} data
 * @returns {object} cardElement
 */
function createCard(data) {
  const card = new Card(
    {
      data,
      handleCardImageClick: (imageData) => {
        cardPreviewPopup.open(imageData);
      },
      handleCardDeleteClick: (cardId) => {
        deleteCardPopup.setInputValues(cardId);
        deleteCardPopup.open();
      },
      handleCardLikeClick: (cardId, isLiked) => {
        isLiked
          ? api.deleteLike(cardId).then((data) => card.updateLikeCount(data))
          : api.addLike(cardId).then((data) => card.updateLikeCount(data));
      },
    },
    selectors.cardTemplate
  );

  const cardElement = card.createCard();

  return cardElement;
}

/**
 * Enables form validation for all forms and makes it accesible by 'name'
 *
 * @param {object} formSettings
 */
const enableFormValidation = (formSettings) => {
  const formList = Array.from(document.querySelectorAll(selectors.popupForm));
  formList.forEach((formElement) => {
    const validator = new FormValidator(formSettings, formElement);
    // Get the name of the form
    const formName = formElement.getAttribute("name");

    // Store the validator by the `name` of the form
    formValidators[formName] = validator;
    validator.enableValidation();
  });
};

// Create instances of Classes
const apiHeaders = new Headers({
  authorization: "a397cd37-5ffd-4cc9-a80f-9599578123c3",
  "Content-Type": "application/json",
});

const api = new Api({
  baseUrl: "https://around.nomoreparties.co/v1/group-12",
  headers: apiHeaders,
});

const user = new UserInfo();

const cardSection = new Section(
  {
    renderer: (data) => {
      return createCard(data);
    },
  },
  selectors.cardsContainer
);

const cardPreviewPopup = new PopupWithImage(selectors.popupImage);

const editAvatarPopup = new PopupWithForm(selectors.editAvatarPopup, {
  submitForm: (evt) => {
    evt.preventDefault();

    editAvatarPopup.enableLoadingState();

    // Destructure and reassign values object
    const avatar = editAvatarPopup.getInputValues();

    api
      .editUserAvatar(avatar)
      .then((userData) => user.setUserAvatar(userData.avatar))
      .finally(() => {
        editAvatarPopup.close();
        editAvatarPopup.disableLoadingState();
      });
  },
});

const editProfilePopup = new PopupWithForm(selectors.editProfilePopup, {
  submitForm: (evt) => {
    evt.preventDefault();

    editProfilePopup.enableLoadingState();

    // Destructure and reassign values object
    const { name, about } = editProfilePopup.getInputValues();

    api
      .editUserInfo({ name, about })
      .then((userData) => user.setUserInfo(userData))
      .finally(() => {
        editProfilePopup.close();
        editProfilePopup.disableLoadingState();
      });
  },
});

const deleteCardPopup = new PopupWithForm(selectors.deleteCardPopup, {
  submitForm: (evt) => {
    evt.preventDefault();

    //Find and delete the card
    const { cardId } = deleteCardPopup.getInputValues();
    const cardElement = document.getElementById(cardId);

    api
      .deleteCard(cardId)
      .then(cardElement.remove())
      .finally(deleteCardPopup.close());
  },
});

const addCardPopup = new PopupWithForm(selectors.addCardPopup, {
  submitForm: (evt) => {
    evt.preventDefault();
    addCardPopup.enableLoadingState();

    // Destructure and reassign values object
    const { name, link } = addCardPopup.getInputValues();

    api
      .addNewCard({ name, link })
      .then((cardData) => cardSection.addItem(cardData))
      .finally(() => {
        addCardPopup.close();
        addCardPopup.disableLoadingState();
      });
  },
});

// Initialize class instances
api.getAppInfo().then(([userData, cardsData]) => {
  user.renderUserInfo(userData);
  cardSection.renderItems(cardsData);
});

cardPreviewPopup.setEventListeners();
editAvatarPopup.setEventListeners();
editProfilePopup.setEventListeners();
addCardPopup.setEventListeners();
deleteCardPopup.setEventListeners();

// Enable Form Validation
enableFormValidation(formSettings);

// Button Click Event Listeners
editAvatarOverlay.addEventListener("click", () => {
  formValidators[selectors.avatarFormName].resetValidation();
  editAvatarPopup.open();
});

editProfileButton.addEventListener("click", () => {
  formValidators[selectors.profileFormName].resetValidation();
  fillProfileForm();
  editProfilePopup.open();
});

addCardButton.addEventListener("click", () => {
  formValidators[selectors.cardFormName].resetValidation();
  addCardPopup.open();
});
