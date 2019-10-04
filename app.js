'use strict';
const path = require('path');

module.exports = app => {
  app.loader.loadToApp(path.join(app.config.baseDir, 'app/error'), 'error', {
    caseStyle: 'upper',
  });

  loadConsumers(app);

  app.sessionStore = {
    async get(key) {
      const res = await app.redis.get(key);
      if (!res) return null;
      return JSON.parse(res);
    },
    async set(key, value, maxAge) {
      if (!maxAge) maxAge = 24 * 60 * 60 * 1000;
      value = JSON.stringify(value);
      await app.redis.set(key, value, 'PX', maxAge);
    },
    async destroy(key) {
      await app.redis.del(key);
    },
  };
};

function loadConsumers(app) {
  const unlockConsumer = new (require('./app/consumer/unlock_inventory'))();
  unlockConsumer.init(app).catch(console.log);
}
