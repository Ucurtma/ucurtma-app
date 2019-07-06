const { Selector: NativeSelector, ClientFunction } = require('testcafe');

module.exports.Selector = (input, t) => {
  return NativeSelector(input).with({ boundTestRun: t });
};

module.exports.getLocation = ClientFunction(() => document.location.href);
