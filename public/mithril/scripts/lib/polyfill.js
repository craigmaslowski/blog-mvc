if (!Array.prototype.findIndex) {
  Array.prototype.findIndex = function (predicate) {
    if (this == null) {
      throw new TypeError('Array.prototype.findIndex called on null or undefined');
    }

    if (typeof predicate !== 'function') {
      throw new TypeError('predicate must be a function');
    }

    var list = Object(this);
    var length = list.length >>> 0;
    var thisArg = arguments[1];
    var value;

    for (var i = 0; i < length; i++) {
      value = list[i];
      if (predicate.call(thisArg, value, i, list)) {
        return i;
      }
    }
    return -1;
  };
}

if (!Array.prototype.without) {
  Array.prototype.without = function (predicate) {
    if (this == null) {
      throw new TypeError('Array.prototype.findIndex called on null or undefined');
    }

    if (typeof predicate !== 'function') {
      throw new TypeError('predicate must be a function');
    }

    return this.reduce(function (acc, item) {
      if (predicate(item)) return acc;
      acc.push(item);
      return acc;
    }, []);
  };
}