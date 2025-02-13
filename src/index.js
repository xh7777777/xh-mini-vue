// src/index.js

class MiniVue {
  constructor(options) {
    this.el = options.el;
    this.data = options.data;

    this._init();
  }

  _init() {
    const app = document.querySelector(this.el);
    app.innerHTML = this.data.message;
  }
}

export default MiniVue;
