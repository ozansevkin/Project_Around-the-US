// Import CSS for Webpack
import "./index.css";

// Import classses
import { selectors, initialCards, formformSettingss } from "../utils/constants";
import Card from "../components/Card";
import FormValidator from "../components/FormValidator";
import Section from "../components/Section";
import PopupWithImage from "../components/PopupWithImage";
import PopupWithForm from "../components/PopupWithForm";
import UserInfo from "../components/UserInfo";

// Variable Declarations
const editProfileButton = document.querySelector(selectors.editButton);
const addCardButton = document.querySelector(selectors.addButton);
const formValidators = {};

// Function Declarations

/**
 * Fills profile form with current profile info
 */
function fillProfileForm() {
  const userInfo = user.getUserInfo();
  editProfilePopup.setInputValues(userInfo);
}

function createCard(data) {
  const card = new Card(
    {
      data,
      handleCardImageClick: (imageData) => {
        cardPreviewPopup.open(imageData);
      },
    },
    selectors.cardTemplate
  );

  const cardElement = card.createCard();

  return cardElement;
}

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
const user = new UserInfo({
  userNameSelector: selectors.userName,
  userTitleSelector: selectors.userTitle,
});

const cardSection = new Section(
  {
    items: initialCards,
    renderer: (data) => {
      return createCard(data);
    },
  },
  selectors.cardsContainer
);

const cardPreviewPopup = new PopupWithImage(selectors.popupImage);

const editProfilePopup = new PopupWithForm(selectors.editProfilePopup, {
  submitForm: (evt) => {
    evt.preventDefault();

    const inputValues = editProfilePopup.getInputValues();

    user.setUserInfo({
      formInputName: inputValues.name,
      formInputTitle: inputValues.title,
    });

    editProfilePopup.close();
  },
});

const addCardPopup = new PopupWithForm(selectors.addCardPopup, {
  submitForm: (evt) => {
    evt.preventDefault();

    const inputValues = addCardPopup.getInputValues();

    const name = inputValues.title;
    const link = inputValues.link;
    const data = { name, link };

    const newCard = createCard(data);

    cardSection.addItem(newCard);

    addCardPopup.close();
  },
});

// Initialize class instances
cardSection.renderItems();
cardPreviewPopup.setEventListeners();
editProfilePopup.setEventListeners();
addCardPopup.setEventListeners();

// Enable Form Validation
enableFormValidation(formSettings);

// Button Click Event Listeners
editProfileButton.addEventListener("click", () => {
  formValidators[selectors.profileFormName].resetValidation();
  fillProfileForm();
  editProfilePopup.open();
});

addCardButton.addEventListener("click", () => {
  formValidators[selectors.cardFormName].resetValidation();
  addCardPopup.open();
});
