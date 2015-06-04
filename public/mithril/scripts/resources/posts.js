/* global Resource */

var Posts = new Resource({
  url: '/api/posts',
  Model: Post
});

Posts.loadWithComments = function (id) {
  return request({
    method: 'GET', 
    url: this.url + '/' + id + '?include=comments', 
    type: Post 
  });
};