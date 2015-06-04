/* global postDetailComponent */
/* global Page */
/* global restrictedAccessComponent */
/* global loginUserComponent */
/* global restrictedAccess */
/* global registerUserComponent */
/* global mainNavigationComponent */
/* global postListComponent */
/* global postFormComponent */

m.route.mode = 'pathname';

m.route(document.querySelector('#app'), '/', {
    '/': new Page(mainNavigationComponent, postListComponent),
    '/register': new Page(mainNavigationComponent, registerUserComponent),
    '/login': new Page(mainNavigationComponent, loginUserComponent),
    '/add': new Page(mainNavigationComponent, postFormComponent),
    '/authors': new Page(mainNavigationComponent, userListComponent),
    '/edit/:id': new Page(mainNavigationComponent, postFormComponent),
    '/post/:id': new Page(mainNavigationComponent, postDetailComponent),
    '/restrictedAccess': new Page(mainNavigationComponent, restrictedAccessComponent)    
});
