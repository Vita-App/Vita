import axios from 'axios';
import { WHATSAPP } from '../config/keys';

const URL = `https://graph.facebook.com/v13.0/${WHATSAPP.PHONE_NUMBER_ID}/messages`;

interface Component {
  type: string;
  sub_type?: string;
  index?: string;
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
  at: string,
  booking_id: string,
) => {
  try {
    const { data } = await axios.post(
      URL,
      getTemplate('booking_request', to, [
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
              text: at,
            },
          ],
        },
        {
          type: 'button',
          sub_type: 'quick_reply',
          index: '0',
          parameters: [
            {
              type: 'payload',
              payload: booking_id,
            },
          ],
        },
        {
          type: 'button',
          sub_type: 'quick_reply',
          index: '1',
          parameters: [
            {
              type: 'payload',
              payload: booking_id,
            },
          ],
        },
      ]),
      {
        headers: {
          Authorization: `Bearer ${WHATSAPP.ACCESS_TOKEN}`,
        },
      },
    );

    return data;
  } catch (err: any) {
    console.log(err);
    return null;
  }
};

export const sendBookingConfirmationMessage = async (
  to: string,
  user: string,
  other: string,
  topic: string,
  at: string,
  meetingCode: string,
) => {
  try {
    const { data } = await axios.post(
      URL,
      getTemplate('booking__accept', to, [
        {
          type: 'body',
          parameters: [
            {
              type: 'text',
              text: user,
            },
            {
              type: 'text',
              text: other,
            },
            {
              type: 'text',
              text: topic,
            },
            {
              type: 'text',
              text: at,
            },
          ],
        },
        {
          type: 'button',
          sub_type: 'url',
          index: '0',
          parameters: [
            {
              type: 'text',
              text: meetingCode,
            },
          ],
        },
      ]),
      {
        headers: {
          Authorization: `Bearer ${WHATSAPP.ACCESS_TOKEN}`,
        },
      },
    );

    return data;
  } catch (err: any) {
    console.log(err);
    return null;
  }
};
