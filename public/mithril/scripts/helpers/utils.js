function getPropertyOrDefault (prop, data, defaultValue) {
  defaultValue = defaultValue || '';
  return data && data[prop] ? data[prop] : defaultValue;
}

function formatDate (date) {
  date = new Date(typeof date == 'function' ? date() : date);
  return date.getMonth() + 1 + '/' + date.getDate() + '/' + date.getYear();
}

function initializePopup (el, isInitialized) {
  var $el = $(el);
  if (isInitialized) {
    $el.popup('destroy');
  }
  
  $el.data('html', $el.attr('data-popup-message'));
  $el.popup({
    variation: 'inverted'
  });
}