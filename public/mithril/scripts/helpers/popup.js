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