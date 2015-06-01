function removePost (ctrl) {
  return function () {
    if (confirm('This action cannot be undone. Are you sure?')) {
      posts.remove(ctrl.pageState().post().id()).then(function () { m.route('/'); }, ctrl.errorCtrl.error);
    }
  }
};
