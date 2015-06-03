/* global initializePopup */
/* global $ */
/* global errorComponent */
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
  ctrl.pageState().validationErrors = m.prop({});
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
    var post = ctrl.pageState().post,
        validationErrors = post().validate();
    
    if (validationErrors) {
      ctrl.pageState().validationErrors(validationErrors);
      return;
    }
    
    posts.save(post).then(function () { m.route('/'); }, ctrl.errorCtrl.error);
  };

  // remove the post
  ctrl.remove = removePost(ctrl);
  
  ctrl.updateMarkdownPreview = function () {
    ctrl.pageState().markdownPreview(marked(ctrl.pageState().post().body()));
  };
};

var postFormView = function (ctrl) {
  var post = ctrl.pageState().post(),
      validationErrors = ctrl.pageState().validationErrors();

  var titleField = m('.title.field' + (validationErrors.title ? '.error' : ''), [
    m('label', 'Title'),
    m('input[type=text][placeholder=Title]', { 
      value: post.title(), 
      oninput: m.withAttr('value', post.title),
      config: initializePopup,      
      'data-popup-message': validationErrors.title 
        ? validationErrors.title.join('<br/>') 
        : 'Enter your post\'s title here'
    })
  ]);

  var bodyField = m('.body.field' + (validationErrors.body ? '.error' : ''), [
    m('label', 'Body'),
    m('textarea[placeholder=Body]', {
      value: post.body(), 
      oninput: m.withAttr('value', post.body),
      onkeyup: ctrl.updateMarkdownPreview,
      config: initializePopup,
      'data-popup-message': validationErrors.body 
        ? validationErrors.body.join('<br/>')
        : 'Enter your post\'s content here'
    })
  ]);

  var previewToggleField = m('.preview.toggle.field', [
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
  if (post._id()) {
    actions.push(m('button[type=button].ui.button', { onclick: ctrl.remove, href: '#' }, 'Remove'));
  }

  // build the preview
  var preview = m('.ui.segment.preview', m.trust(ctrl.pageState().markdownPreview()));

  // create a one or two column display
  if (ctrl.pageState().showMarkdownPreview()) {
    formElements.push(titleField);
    formElements.push(m('.ui.body.field.grid', [       
      m('.eight.wide.column', [ bodyField ]),
      m('.eight.wide.column.field', [
        m('label', 'Preview'), 
        preview 
      ])
    ]));
    
    formElements.push(previewToggleField);
    formElements.push(actions);
  } else {
    formElements.push(titleField);
    formElements.push(bodyField);
    formElements.push(previewToggleField);
    formElements.push(actions);
  }
  
  // return the form
  return m('.column', [ 
    m('form.ui.post.form', [ errorComponent.view(ctrl.errorCtrl), formElements ])
  ]);
};

var postFormComponent = {
  controller: postFormController,
  view: postFormView
};