export default class Section {
  constructor({ renderer }, selector) {
    this._renderer = renderer;
    this._element = document.querySelector(selector);
  }

  renderItems(items) {
    items.reverse().forEach((item) => {
      this.addItem(item);
    });
  }

  addItem(item) {
    const renderedItem = this._renderer(item);
    this._element.prepend(renderedItem);
  }
}
