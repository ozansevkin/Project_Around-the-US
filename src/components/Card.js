import { selectors } from "../utils/constants";

export default class Card {
  constructor(
    { data, handleCardImageClick, handleCardDeleteClick, handleCardLikeClick },
    templateSelector
  ) {
    this._data = data;
    this._name = data.name;
    this._link = data.link;
    this._likes = data.likes;
    this._id = data._id;
    this._userId = document.querySelector(selectors.userInfo).id;
    this._ownerId = data.owner._id;
    this._templateSelector = templateSelector;
    this._handleCardImageClick = handleCardImageClick;
    this._handleCardDeleteClick = handleCardDeleteClick;
    this._handleCardLikeClick = handleCardLikeClick;
  }

  createCard() {
    this._card = this._getElement();

    this._cardName = this._card.querySelector(selectors.cardName);
    this._cardImage = this._card.querySelector(selectors.cardImage);
    this._cardLikeButton = this._card.querySelector(selectors.cardLikeButton);
    this._cardLikeCount = this._card.querySelector(selectors.cardLikeCount);
    this._cardDeleteButton = this._card.querySelector(
      selectors.cardDeleteButton
    );

    this._cardName.textContent = this._name;
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._card.id = this._id;

    this._cardLikeCount.textContent = this._getLikeCount(this._data);
    this._findLikeStatus();
    this._authenticateCardDelete();

    this._setEventListeners();

    return this._card;
  }

  _getElement() {
    return document
      .querySelector(this._templateSelector)
      .content.querySelector(selectors.card)
      .cloneNode(true);
  }

  _findLikeStatus() {
    this._isLiked = this._getLikedUserIds().includes(this._userId);

    if (this._isLiked) {
      this._toggleCardLikeButton();
    }
  }

  _listenCardLikeButtonClick() {
    this._cardLikeButton.addEventListener("click", () => {
      this._toggleCardLikeButton();
      this._handleCardLikeClick(this._id, this._isLiked);
      this._isLiked = !this._isLiked;
    });
  }

  _toggleCardLikeButton() {
    this._cardLikeButton.classList.toggle(selectors.cardLikeButtonActiveClass);
  }

  _getLikeCount(data) {
    return data.likes.length.toString();
  }

  updateLikeCount(data) {
    this._cardLikeCount.textContent = this._getLikeCount(data);
  }

  _getLikedUserIds() {
    return this._likes.map((like) => like._id);
  }

  _authenticateCardDelete() {
    if (this._userId == this._ownerId) {
      this._showCardDeleteButton();
    }
  }

  _showCardDeleteButton() {
    this._cardDeleteButton.classList.add(
      selectors.cardDeleteButtonVisibleClass
    );
  }

  _listenCardDeleteButtonClick() {
    this._cardDeleteButton.addEventListener("click", () => {
      this._handleCardDeleteClick({ cardId: this._id });
    });
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
