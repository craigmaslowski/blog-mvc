/* global mainNavModule */
/* global postListModule */
/* global postFormModule */

m.mount(document.querySelector('header.main'), mainNavigationModule);

m.route.mode = 'pathname';
m.route(document.querySelector('section.main'), '/', {
    '/': postListModule,
    '/register': registerUserModule,    
    '/login': loginUserModule,    
    '/add': postFormModule,
    '/edit/:id': postFormModule
});

