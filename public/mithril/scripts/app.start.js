/* global mainNavComponent */
/* global postListComponent */
/* global postFormComponent */

m.mount(document.querySelector('header.main'), mainNavigationComponent);

m.route.mode = 'pathname';
m.route(document.querySelector('section.main'), '/', {
    '/': postListComponent,
    '/register': registerUserComponent,    
    '/login': loginUserComponent,    
    '/add': postFormComponent,
    '/edit/:id': postFormComponent
});

