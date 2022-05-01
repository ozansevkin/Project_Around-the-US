// 1. Variable Declarations
let profileEditButton = document.querySelector(".profile__edit-button");
let profileName = document.querySelector(".profile__name");
let profileTitle = document.querySelector(".profile__title");

let popup = document.querySelector(".popup");
let popupForm = document.querySelector(".popup__container");
let popupInputName = popup.querySelector(".popup__input_type_name");
let popupInputTitle = popup.querySelector(".popup__input_type_title");
let popupSubmitButton = popup.querySelector(".popup__submit-button");
let popupCloseButton = popup.querySelector(".popup__close-button");

// 2. Function Declarations
function popupOpenHandler() {
  popupInputName.value = profileName.textContent;
  popupInputTitle.value = profileTitle.textContent;

  popup.classList.add("popup_opened");
}

function popupCloseHandler() {
  popup.classList.remove("popup_opened");
}

function popupSubmitHandler(evt) {
  evt.preventDefault();

  profileName.textContent = popupInputName.value;
  profileTitle.textContent = popupInputTitle.value;

  popup.classList.remove("popup_opened");
}

// 3. Event Listeners and function calls
profileEditButton.addEventListener("click", popupOpenHandler);
popupCloseButton.addEventListener("click", popupCloseHandler);
popupForm.addEventListener("submit", popupSubmitHandler);
