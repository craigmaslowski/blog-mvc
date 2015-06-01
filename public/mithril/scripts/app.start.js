/* global Page */
/* global restrictedAccessComponent */
/* global loginUserComponent */
/* global restrictedAccess */
/* global registerUserComponent */
/* global mainNavigationComponent */
/* global postListComponent */
/* global postFormComponent */

//m.mount(document.querySelector('header.main'), mainNavigationComponent);

m.route.mode = 'pathname';
//m.route(document.querySelector('section.main'), '/', {
m.route(document.querySelector('#app'), '/', {
    '/': new Page(mainNavigationComponent, postListComponent),
    '/register': new Page(mainNavigationComponent, registerUserComponent),
    '/login': new Page(mainNavigationComponent, loginUserComponent),
    '/add': new Page(mainNavigationComponent, postFormComponent),
    '/edit/:id': new Page(mainNavigationComponent, postFormComponent),
    '/restrictedAccess': new Page(mainNavigationComponent, restrictedAccessComponent),
    '/post/:id': new Page(mainNavigationComponent, postDetailComponent)
});

