/* global Resource */

var posts = new Resource({
  url: '/api/posts',
  Model: Post
});

posts.loadWithComments = function (id) {
  return request({
    method: 'GET', 
    url: this.url + '/' + id + '?include=comments', 
    type: Post 
  });
};