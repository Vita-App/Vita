import NodeCache from 'node-cache';

/*
  12 hours expiry. 
  It is long enough to last for any meeting (too long) and shoudn't be needed normally
*/
const roomsCache = new NodeCache({
  stdTTL: 43200,
});

export default roomsCache;
