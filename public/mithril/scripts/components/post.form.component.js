/* global $ */
/* global errorComponent */
/* global mixinLayout */
/* global layoutComponent */
/* global mainNavigationComponent */
/* global m */
/* global posts */

var postFormController = function (pageState) {
  var ctrl = this,
      id = m.route.param('id');

  ctrl.pageState = pageState;
  
  if (!ctrl.pageState().authenticated()) 
    m.route('/restrictedAccess'); 
  
  ctrl.pageState().showMarkdownPreview = m.prop(false);
  ctrl.pageState().markdownPreview = m.prop('');
  ctrl.pageState().post = m.prop({});
  ctrl.errorCtrl = new errorComponent.controller();
  
  // load the post if we're editing or create a new post if we're adding
  if (id)
    posts.load(id)
      .then(ctrl.pageState().post, ctrl.errorCtrl.error)
      .then(function () { ctrl.pageState().markdownPreview(marked(ctrl.pageState().post().body())); });
  else 
    ctrl.pageState().post(new posts.Model());

  // clear the error
  ctrl.clearError = function () {
    ctrl.error('');  
  };
  
  // save the post
  ctrl.save = function () {
    posts.save(ctrl.pageState().post).then(function () { m.route('/'); }, ctrl.errorCtrl.error);
  };

  // remove the post
  ctrl.remove = removePost(ctrl);
  
  ctrl.updateMarkdownPreview = function () {
    ctrl.pageState().markdownPreview(marked(ctrl.pageState().post().body()));
  };
};

var postFormView = function (ctrl) {
  var post = ctrl.pageState().post();

  var titleInput = m('.field', [
    m('label', 'Title'),
    m('input[type=text][placeholder=Title]', { 
      value: post.title(), 
      oninput: m.withAttr('value', post.title) 
    })
  ]);

  var bodyInput = m('.field', [
    m('label', 'Body'),
    m('textarea[placeholder=Body]', {
      value: post.body(), 
      oninput: m.withAttr('value', post.body),
      onkeyup: ctrl.updateMarkdownPreview
    })
  ]);

  var previewToggle = m('.field', [
    m('.ui.toggle.checkbox', [
      m('input[type=checkbox]#showMarkdownPreview', { 
        onchange: m.withAttr('checked', ctrl.pageState().showMarkdownPreview) 
      }),
      m('label[for=showMarkdownPreview]', 'Preview')
    ])
  ]);

  // build the form
  var formElements = [ m('h4.ui.dividing.header', 'Post Editor') ];

  // build form actions
  var actions = [
    m('button[type=button].ui.primary.button', { onclick: ctrl.save, href: '#' }, 'Save')
  ];
    
  // add a remove button to actions if we're editing a post.
  if (post.id()) {
    actions.push(m('button[type=button].ui.button', { onclick: ctrl.remove, href: '#' }, 'Remove'));
  }

  // build the preview
  var preview = m('.ui.segment.preview', m.trust(ctrl.pageState().markdownPreview()));

  if (ctrl.pageState().showMarkdownPreview()) {
    formElements.push(titleInput);
    formElements.push(m('.ui.grid', [       
      m('.eight.wide.column', [ bodyInput ]),
      m('.eight.wide.column.field', [
        m('label', 'Preview'), 
        preview 
      ])
    ]));
    
    formElements.push(previewToggle);
    formElements.push(actions);
  } else {
    formElements.push(titleInput);
    formElements.push(bodyInput);
    formElements.push(previewToggle);
    formElements.push(actions);
  }
  
  // return the form
  return m('.column', [ 
    m('form.ui.form.post-form', [ errorComponent.view(ctrl.errorCtrl), formElements ])
  ]);
};

var postFormComponent = {
  controller: postFormController,
  view: postFormView
};