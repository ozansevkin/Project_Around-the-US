import { openPopup } from "./utils.js";

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
    this._card = this._getElement();

    this._cardTitle = this._card.querySelector(".card__title");
    this._cardImage = this._card.querySelector(".card__image");
    this._cardLikeButton = this._card.querySelector(".card__like-button");
    this._cardDeleteButton = this._card.querySelector(".card__delete-button");

    this._cardTitle.textContent = this._name;
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._listenCardLikeButtonClick();
    this._listenCardDeleteButtonClick();
    this._listenCardImageClick();

    return this._card;
  }

  _getElement() {
    return document
      .querySelector(this._templateSelector)
      .content.cloneNode(true);
  }

  _listenCardLikeButtonClick() {
    this._cardLikeButton.addEventListener("click", () => {
      this._toggleCardLikeButton();
    });
  }

  _toggleCardLikeButton() {
    this._cardLikeButton.classList.toggle("card__like-button_clicked");
  }

  _listenCardDeleteButtonClick() {
    this._cardDeleteButton.addEventListener("click", () => {
      this._deleteCard();
    });
  }

  _deleteCard() {
    this._card.remove();
    this._card = null;
  }

  _listenCardImageClick() {
    this._cardImage.addEventListener("click", () => {
      this._openCardImagePopup();
    });
  }

  _openCardImagePopup() {
    cardImagePopupImage.src = this._cardImage.src;
    cardImagePopupImage.alt = this._cardImage.alt;
    cardImagePopupSubtitle.textContent = this._cardImage.alt;
    openPopup(cardImagePopup);
  }
}
