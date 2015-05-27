var router = require('express').Router();

require('./auth')(router);
require('./posts')(router);

module.exports = router;