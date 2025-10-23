import IORedis from 'ioredis';

const redisUrl = process.env.REDIS_URL || 'redis://localhost:6379';

const redis = new IORedis(redisUrl, {
  maxRetriesPerRequest: null,
});

export default redis;
