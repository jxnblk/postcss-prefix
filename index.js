
var _ = require('lodash');

module.exports = function(options) {

  var options = options || {};
  options = _.defaults(options, {
    replace: '.',
    prefix: '',
  });

  var SELECTORS_REGEX = /\,/;
  var PART_REGEX = /(?=\.)|(?=#)|(?=\[)/;

  return function(root) {

    root.eachRule(function(rule) {
      var selectors = rule.selectors;
      selectors = selectors.map(function(selector) {
        selector = selector.trim();
        var parts = selector.split(PART_REGEX);
        parts = parts.map(function(part) {
          if (part.match(/^\.\w/)) {
            var prefixed = selector.replace(options.replace, '.' + options.prefix);
            return prefixed;
          }
        });
        return parts.join(' ');
      });
      rule.selectors = selectors;
    });

    return root;

  };
};

//module.exports.postcss = function(css) {
//  return module.exports()(css);
//};


