/* global m */
/* global toJSON */
/* global getPropertyOrDefault */

var posts = new Resource({
  url: '/api/posts',
  Model: function (data) {
    this.id = m.prop(getPropertyOrDefault('_id', data));
    this.title = m.prop(getPropertyOrDefault('title', data));
    this.body = m.prop(getPropertyOrDefault('body', data));
    this.date = m.prop(getPropertyOrDefault('date', data, new Date()));
    this.toJSON = toJSON;
  }
});