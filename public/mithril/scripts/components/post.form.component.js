/* global errorComponent */
/* global mixinLayout */
/* global layoutComponent */
/* global mainNavigationComponent */
/* global m */
/* global posts */

var postFormController = function () {
  var ctrl = this,
      id = m.route.param('id');

  // viewstate setup
  ctrl.post = m.prop({});
  ctrl.errorCtrl = new errorComponent.controller();
  
  // load the post if we're editing or create a new post if we're adding
  if (id)
    posts.load(id).then(ctrl.post, ctrl.errorCtrl.error);
  else 
    ctrl.post(new posts.Model());

  // clear the error
  ctrl.clearError = function () {
    ctrl.error('');  
  };
  
  // save the post
  ctrl.save = function () {
    posts.save(ctrl.post).then(function () { m.route('/'); }, ctrl.errorCtrl.error);
  };

  // remove the post
  ctrl.remove = function () {
    posts.remove(ctrl.post().id()).then(function () { m.route('/'); }, ctrl.errorCtrl.error);;
  };
};

var postFormView = function (ctrl) {
  var post = ctrl.post();

  // build the form
  var form = [
    m('h4.ui.dividing.header', 'Post Editor'),
    m('.field', [
      m('label', 'Title'),
      m('input[type=text][placeholder=Title]', 
        { value: post.title(), oninput: m.withAttr('value', post.title) })  
    ]),
    m('.field', [
      m('label', 'Body'),
      m('textarea[placeholder=Body]',
        {value: post.body(), oninput: m.withAttr('value', post.body)})
    ]),
    m('button[type=button].ui.primary.button', { onclick: ctrl.save, href: '#' }, 'Save')
  ];
  
  // add a remove button if we're editing.
  if (post.id()) {
    form.push(m('button[type=button].ui.button', { onclick: ctrl.remove, href: '#' }, 'Remove'));
  }

  // return the form
  return m('.column', [ m('form.ui.form.post-form', [ errorComponent.view(ctrl.errorCtrl), form ])]);
};

var postFormComponent = {
  controller: postFormController,
  view: postFormView
};