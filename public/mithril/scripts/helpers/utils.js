function getPropertyOrDefault (prop, data, defaultValue) {
  defaultValue = defaultValue || '';
  return data && data[prop] ? data[prop] : defaultValue;
};

function toJSON () {
  var self = this;
  return Object.keys(self).reduce(function (acc, key) {
    if (key != 'toJSON')
      acc[key] = self[key]();
    return acc;
  }, {});
};

function formatDate (date) {
  date = new Date(typeof date == 'function' ? date() : date);
  return date.getMonth() + 1 + '/' + date.getDate() + '/' + date.getYear();
}

function mixinLayout (layout, navigation, content) {
  return function () {
    return layout(navigation(), content());
  };
};

function ensureRestrictedAccess (pageState) {
  if (!pageState().authenticated) m.route
};