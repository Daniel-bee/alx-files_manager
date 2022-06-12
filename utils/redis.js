const redis = require('redis');
const { promisify } = require('util');

class RedisClient {
  constructor() {
    this.client = redis.createClient();
    this.client.on('connect', () => {
      this.con = true;
    });
    this.get = promisify(this.client.get).bind(this.client);
    this.client.on('error', (err) => {
      console.log(err);
    });
  }

  isAlive() {
    return this.con;
  }

  async get(key) {
    return this.client.get(key, (err, reply) => reply);
  }

  async set(key, value, duration) {
    this.client.set(key, value);
    this.client.expire(key, duration);
  }

  async del(key) {
    return this.client.del(key);
  }
}
const redisClient = new RedisClient();

module.exports = redisClient;
