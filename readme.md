# BlogMVC

BlogMVC is similar in purpose to TodoMVC in that it's used to show differing implementations of the same front end application using different front end frameworks.

Where this project differs is that the use case is slightly more complex, including multiple pages, authentication and access restriction, and a full backend API written using Express.

## Frameworks Currently Represented Include
* [Mithril](http://lhorie.github.io/mithril/) - [Implementation](https://github.com/craigmaslowski/blog-mvc/tree/master/public/mithril)

## Client App Requirements

### Required Pages
# Front Page Listing All Blog Posts
# Post Detail Page
# Add Post
# Edit Post
# Add Author
# Login

### Main Navigation Links
# Home link visible to all users
# Add Post visible to logged in authors
# Add Author visible to logged in authors
# Logout visible to logged in authors and redirect to home page on success 

### Front Page
# Each post should have a clickable title that goes to post detail page
# Logged in Authors should have link to Edit Post
# Each post's body should convert the data from markdown to html

### Post Detail Page
# Post's body should convert the data from markdown to html
# Logged in Authors should have link to Edit Post
# Logged in Authors should have link to Remove Post

### Add Post Page
# Access to this page should be restricted to logged in users
# Collect Title and Body
# Redirect to home page on success
# Show error(s) on failure
# Should validate all input

### Edit Post Page
# Access to this page should be restricted to logged in users
# Collect Title and Body
# Logged in Authors should have link to Remove post
# Redirect to home page on success
# Show error(s) on failure
# Should validate all input

### Add Author (Registration) Page
# Access to this page should be restricted to logged in users
# Collect Username, First Name, Last Name, and Password
# Password should be confirmed
# Redirect to home page on success
# Show error(s) on failure
# Should validate all input

## Login Page
# Collect Username and Password
# Redirect to home page on success
# Show error(s) on failure
# Should validate all input
