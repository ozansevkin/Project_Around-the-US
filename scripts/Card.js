import openPopup from "./utils.js";

const cardImagePopup = document.querySelector(".popup_type_image");
const cardImagePopupImage = cardImagePopup.querySelector(".popup__image");
const cardImagePopupSubtitle = cardImagePopup.querySelector(".popup__subtitle");

export default class Card {
  constructor(data, templateSelector) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
  }

  createCard() {
    const card = document
      .querySelector(this._templateSelector)
      .content.querySelector(".card")
      .cloneNode(true);

    const cardTitle = card.querySelector(".card__title");
    const cardImage = card.querySelector(".card__image");
    const cardLikeButton = card.querySelector(".card__like-button");
    const cardDeleteButton = card.querySelector(".card__delete-button");

    cardTitle.textContent = this._name;
    cardImage.src = this._link;
    cardImage.alt = this._name;
    this._listenCardLikeButtonClick(cardLikeButton);
    this._listenCardDeleteButtonClick(cardDeleteButton);
    this._listenCardImageClick(cardImage);

    return card;
  }

  _listenCardLikeButtonClick(cardLikeButton) {
    cardLikeButton.addEventListener("click", () => {
      cardLikeButton.classList.toggle("card__like-button_clicked");
    });
  }

  _listenCardDeleteButtonClick(cardDeleteButton) {
    cardDeleteButton.addEventListener("click", () => {
      cardDeleteButton.closest(".card").remove();
    });
  }

  _listenCardImageClick(cardImage) {
    cardImage.addEventListener("click", () => {
      cardImagePopupImage.src = cardImage.src;
      cardImagePopupImage.alt = cardImage.alt;
      cardImagePopupSubtitle.textContent = cardImage.alt;
      openPopup(cardImagePopup);
    });
  }
}
