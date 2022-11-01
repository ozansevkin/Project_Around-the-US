import { selectors } from "../utils/constants";

export default class Card {
  constructor({ data, handleCardImageClick }, templateSelector) {
    this._data = data;
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
    this._handleCardImageClick = handleCardImageClick;
  }

  createCard() {
    this._card = this._getElement();

    this._cardTitle = this._card.querySelector(selectors.cardTitle);
    this._cardImage = this._card.querySelector(selectors.cardImage);
    this._cardLikeButton = this._card.querySelector(selectors.cardLikeButton);
    this._cardDeleteButton = this._card.querySelector(
      selectors.cardDeleteButton
    );

    this._cardTitle.textContent = this._name;
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;

    this._setEventListeners();

    return this._card;
  }

  _getElement() {
    return document
      .querySelector(this._templateSelector)
      .content.querySelector(selectors.card)
      .cloneNode(true);
  }

  _listenCardLikeButtonClick() {
    this._cardLikeButton.addEventListener("click", () => {
      this._toggleCardLikeButton();
    });
  }

  _toggleCardLikeButton() {
    this._cardLikeButton.classList.toggle(selectors.cardLikeButtonActiveClass);
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
      this._handleCardImageClick(this._data);
    });
  }

  _setEventListeners() {
    this._listenCardLikeButtonClick();
    this._listenCardDeleteButtonClick();
    this._listenCardImageClick();
  }
}
