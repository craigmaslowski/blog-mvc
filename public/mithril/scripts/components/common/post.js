function removePost (ctrl) {
  return function () {
    if (confirm('This action cannot be undone. Are you sure?')) {
      Posts.remove(ctrl.pageState.post()._id()).then(function () { m.route('/'); }, ctrl.errorCtrl.error);
    }
  }
};
