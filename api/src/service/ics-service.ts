import { createEvent, EventAttributes } from 'ics';

export const createIcsEvent = (icsEventOptions: EventAttributes) => {
  const event = createEvent(icsEventOptions);
  if (event.error) throw event.error;
  return event.value;
};
