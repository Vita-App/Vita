import { Room } from '../types';

import roomsCache from '../config/NodeCache';
const PATH_REGEX = /^\/room\/(?<id>[A-Za-z0-9_-]+$)/;
const ID_REGEX = /^(?<id>[A-Za-z0-9_-]+$)/;

function getRoomFromLink(link: string): Room | undefined {
  let id: string | undefined;
  try {
    const url = new URL(link); // throws if url is invalid
    /* This does not care about url host so any host is valid as long as that follows below pathname pattern
        /room/<room_id>
        room_id regex = ([A-Za-z0-9_-])+ (same as nanoid character set)
      */
    id = url.pathname.match(PATH_REGEX)?.groups?.id;
  } catch (error) {
    id = link.match(ID_REGEX)?.groups?.id;
  }
  return id !== undefined ? roomsCache.get(id) : undefined;
}

export default getRoomFromLink;
