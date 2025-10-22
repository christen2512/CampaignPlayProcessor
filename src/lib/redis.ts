import IORedis from 'ioredis';

const redis = new IORedis({
  maxRetriesPerRequest: null,
});

export default redis;
