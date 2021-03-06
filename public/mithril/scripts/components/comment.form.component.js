/* global comments */
var commentFormController = function (pageState) {
	var ctrl = this;
	
	ctrl.pageState = pageState();
	ctrl.pageState.comment = m.prop(new Comments.Model());
  ctrl.pageState.validationErrors = m.prop({});

	ctrl.errorCtrl = new errorComponent.controller();
	
	ctrl.save = function () {
		var post = ctrl.pageState.post(),
				comment = ctrl.pageState.comment,
        validationErrors = comment().validate();
    
    if (validationErrors) {
      ctrl.pageState.validationErrors(validationErrors);
      return;
    }
    
    comment().date(new Date());
		comment().postId(post._id());		
    Comments.save(comment).then(function (data) { 
      var comments = ctrl.pageState.post().comments();
      comment()._id(data.comment._id);
      comments.push(comment()); 
      ctrl.pageState.post().comments(comments);
      ctrl.pageState.comment(new Comment());
    }, ctrl.errorCtrl.error);	
	};
};

var commentFormView = function (ctrl) {
	var comment = ctrl.pageState.comment(),
      validationErrors = ctrl.pageState.validationErrors();

  return m('.column', [ 
    m('form.ui.comment.form', [ 
      errorComponent.view(ctrl.errorCtrl),
      m('.fields', [
        m('.author.eight.wide.field' + (validationErrors.author ? '.error' : ''), [
          m('label', 'Your Name'),
          m('input[type=text][placeholder=Your Name]', { 
            value: comment.author(),
            oninput: m.withAttr('value', comment.author),
            config: initializePopup,      
            'data-popup-message': validationErrors.author 
              ? validationErrors.author.join('<br/>') 
              : 'Enter your name here'
          })
        ]),
      ]),
      m('.fields', [
        m('.body.eight.wide.field' + (validationErrors.body ? '.error' : ''), [
          m('label', 'Comment'),
          m('textarea[placeholder=Comment]', {
            value: comment.body(), 
            oninput: m.withAttr('value', comment.body),
            onkeyup: ctrl.updateMarkdownPreview,
            config: initializePopup,
            'data-popup-message': validationErrors.body 
              ? validationErrors.body.join('<br/>')
              : 'Enter your comment here'
          })
        ])
      ]),
      m('.actions', [
        m('button[type=button].ui.primary.button', { onclick: ctrl.save, href: '#' }, 'Save')
      ])
    ])
  ]);
};

var commentFormComponent = {
	controller: commentFormController,
	view: commentFormView
};