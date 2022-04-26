let editButton = document.querySelector(".profile__edit-button");
let profileName = document.querySelector(".profile__name");
let profileTitle = document.querySelector(".profile__title");
let popup = document.querySelector(".popup");
let popupForm = document.querySelector(".popup__container");
let popupInputName = popup.querySelector(".popup__input_type_name");
let popupInputTitle = popup.querySelector(".popup__input_type_title");
let popupSubmitButton = popup.querySelector(".popup__submit-button");
let popupCloseButton = popup.querySelector(".popup__close-button");

function popupOpenHandler() {
  popupInputName.value = profileName.textContent;
  popupInputTitle.value = profileTitle.textContent;

  popup.classList.add("popup_is_opened");
}

function popupCloseHandler(evt) {
  evt.preventDefault();

  popup.classList.remove("popup_is_opened");
}

function popupSubmitHandler(evt) {
  evt.preventDefault();

  popupInputName = popup.querySelector(".popup__input_type_name");
  popupInputTitle = popup.querySelector(".popup__input_type_title");

  profileName.textContent = popupInputName.value;
  profileTitle.textContent = popupInputTitle.value;

  popup.classList.remove("popup_is_opened");
}

editButton.addEventListener("click", popupOpenHandler);
popupCloseButton.addEventListener("click", popupCloseHandler);
popupForm.addEventListener("submit", popupSubmitHandler);
