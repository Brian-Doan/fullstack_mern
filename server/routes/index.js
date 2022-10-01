const authRoute = require('./auth');
const postRoute = require('./post');

function route(app) {
  app.use('/api/auth', authRoute);
  app.use('/api/posts', postRoute);
}

module.exports = route;
