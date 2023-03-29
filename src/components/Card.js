import { selectors } from "../utils/constants";

export default class Card {
  constructor(
    { data, handleCardImageClick, handleCardDeleteClick, handleCardLikeClick },
    templateSelector
  ) {
    this._data = data;
    this._userId = document.querySelector(selectors.userInfo).id;
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

    this._cardName.textContent = this._data.name;
    this._cardImage.src = this._data.link;
    this._cardImage.alt = this._data.name;
    this._card.id = this._data._id;

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
      this._handleCardLikeClick(this._data._id, this._isLiked);
    });
  }

  updateCardLike(data) {
    this._updateLikeCount(data);
    this._toggleCardLikeButton();
    this._isLiked = !this._isLiked;
  }

  _toggleCardLikeButton() {
    this._cardLikeButton.classList.toggle(selectors.cardLikeButtonActiveClass);
  }

  _getLikeCount(data) {
    return data.likes.length.toString();
  }

  _updateLikeCount(data) {
    this._cardLikeCount.textContent = this._getLikeCount(data);
  }

  _getLikedUserIds() {
    return this._data.likes.map((like) => like._id);
  }

  _authenticateCardDelete() {
    if (this._userId == this._data.owner._id) {
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
      this._handleCardDeleteClick({ cardId: this._data._id });
    });
  }

  _listenCardImageClick() {
    this._cardImage.addEventListener("click", () => {
      this._handleCardImageClick(this._data);
    });
  }

  _listenCardImageError() {
    this._cardImage.addEventListener("error", () =>
      this._handleCardImageError(
        "https://placehold.co/400x400?text=Around+The+U.S."
      )
    );
  }

  _handleCardImageError(placeholderPath) {
    this._data.link = placeholderPath;
    this._cardImage.src = placeholderPath;
  }

  _setEventListeners() {
    this._listenCardLikeButtonClick();
    this._listenCardDeleteButtonClick();
    this._listenCardImageClick();
    this._listenCardImageError();
  }
}
