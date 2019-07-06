const { Selector } = require('../pages/helpers');

class Homepage {
  constructor() {
    this.selector = Selector;
  }

  getCreateJourneyButton(t) {
    return this.selector('.uc-create-journey-btn', t);
  }
}

module.exports = {
  homepage: new Homepage(),
};
