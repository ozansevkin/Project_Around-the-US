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
          ? api
              .deleteLike(cardId)
              .then((data) => {
                card.updateCardLike(data);
              })
              .catch(api.handleError)
          : api
              .addLike(cardId)
              .then((data) => {
                card.updateCardLike(data);
              })
              .catch(api.handleError);
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
    renderer: createCard,
  },
  selectors.cardsContainer
);

const cardPreviewPopup = new PopupWithImage(selectors.popupImage);

const editAvatarPopup = new PopupWithForm(selectors.editAvatarPopup, {
  handleSubmit: (evt) => {
    evt.preventDefault();

    editAvatarPopup.renderLoading(true);

    // Destructure and reassign values object
    const avatar = editAvatarPopup.getInputValues();

    api
      .editUserAvatar(avatar)
      .then((userData) => {
        user.renderUserInfo(userData);
        editAvatarPopup.close();
      })
      .catch(api.handleError)
      .finally(() => {
        editAvatarPopup.renderLoading(false);
      });
  },
});

const editProfilePopup = new PopupWithForm(selectors.editProfilePopup, {
  handleSubmit: (evt) => {
    evt.preventDefault();

    editProfilePopup.renderLoading(true);

    // Destructure and reassign values object
    const { name, about } = editProfilePopup.getInputValues();

    api
      .editUserInfo({ name, about })
      .then((userData) => {
        user.renderUserInfo(userData);
        editProfilePopup.close();
      })
      .catch(api.handleError)
      .finally(() => {
        editProfilePopup.renderLoading(false);
      });
  },
});

const deleteCardPopup = new PopupWithForm(selectors.deleteCardPopup, {
  handleSubmit: (evt) => {
    evt.preventDefault();

    //Find and delete the card
    const { cardId } = deleteCardPopup.getInputValues();
    const cardElement = document.getElementById(cardId);

    api
      .deleteCard(cardId)
      .then(() => {
        cardElement.remove();
        deleteCardPopup.close();
      })
      .catch(api.handleError);
  },
});

const addCardPopup = new PopupWithForm(selectors.addCardPopup, {
  handleSubmit: (evt) => {
    evt.preventDefault();
    addCardPopup.renderLoading(true, "Creating...");

    // Destructure and reassign values object
    const { name, link } = addCardPopup.getInputValues();

    api
      .addNewCard({ name, link })
      .then((cardData) => {
        cardSection.addItem(cardData);
        addCardPopup.close();
      })
      .catch(api.handleError)
      .finally(() => {
        addCardPopup.renderLoading(false);
      });
  },
});

// Initialize class instances
api
  .getAppInfo()
  .then(([userData, cardsData]) => {
    user.renderUserInfo(userData);
    cardSection.renderItems(cardsData);
  })
  .catch(api.handleError);

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
