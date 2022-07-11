import axios from 'axios';
import { WHATSAPP } from '../config/keys';

const URL = `https://graph.facebook.com/v13.0/${WHATSAPP.PHONE_NUMBER_ID}/messages`;

interface Component {
  type: string;
  parameters: {
    type: string;
    text?: string;
    payload?: string;
  }[];
}

const getTemplate = (name: string, to: string, components: Component[]) => ({
  messaging_product: 'whatsapp',
  recipient_type: 'individual',
  to,
  type: 'template',
  template: {
    name,
    language: {
      code: 'en',
    },
    components,
  },
});

export const sendBookingRequestMessage = async (
  to: string,
  mentor: string,
  mentee: string,
  date: string,
  time: string,
  // eslint-disable-next-line max-params
) => {
  try {
    const { data } = await axios.post(
      URL,
      {
        ...getTemplate('booking_slot_request', to.replace('+', ''), [
          {
            type: 'body',
            parameters: [
              {
                type: 'text',
                text: mentor,
              },
              {
                type: 'text',
                text: mentee,
              },
              {
                type: 'text',
                text: date,
              },
              {
                type: 'text',
                text: time,
              },
            ],
          },
        ]),
      },
      {
        headers: {
          Authorization: `Bearer ${WHATSAPP.ACCESS_TOKEN}`,
        },
      },
    );

    return data;
  } catch (err: any) {
    console.log(err.message);
    return null;
  }
};
