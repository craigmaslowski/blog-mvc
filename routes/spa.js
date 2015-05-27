var path = require('path');

module.exports = function (req, res, next) {
  // serve files with an extension from the public folder and handle api calls as normal
  // for all other requests serve the SPA's index file.
  if (path.extname(req.path).length > 0 || req.path.toLowerCase().indexOf('/api/') !== -1) { 
    next();
  } else {
    // hardcoded to mithril for right now
    // we'll add paths to load a specific framework's SPA as we include them.
    req.url = '/mithril/index.html';
    next();
  }
};