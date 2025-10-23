import redis from './redis';


const clearCache = async () => {
    console.log("Clearing Redis cache");
    try{
        const keysToDelete = ['campaign_stats', 'screen_stats'];
        
        const count = await redis.del(keysToDelete);
        console.log(`Successfully deleted ${count} keys`);
    }catch(error){
        console.error('Failed to clear Redis cache: ', error);
    }finally{
        redis.quit();
    }
};


clearCache();