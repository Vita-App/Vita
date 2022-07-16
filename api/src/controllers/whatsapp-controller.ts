import { Request, Response } from 'express';
import { WHATSAPP_WEBHOOK_TOKEN } from '../config/keys';
import { UserModel } from '../Models/User';
import { acceptBookingController } from './bookings-controller';

export const verifyWebHook = async (req: Request, res: Response) => {
  if (
    req.query['hub.mode'] === 'subscribe' &&
    req.query['hub.verify_token'] === WHATSAPP_WEBHOOK_TOKEN
  ) {
    res.send(req.query['hub.challenge']);
  } else {
    res.sendStatus(400);
  }
};

export const handleWhatsAppWebHook = async (req: Request, res: Response) => {
  try {
    const entry = req.body.entry[0];
    const change = entry.changes[0];

    const { messages } = change.value;
    if (change.field !== 'messages') return res.sendStatus(400);

    const message = messages[0];

    if (message.type === 'button') {
      const bookingID = message.button.payload;

      const user: any = await UserModel.findOne({ phone: message.from });

      if (!user) {
        return res.sendStatus(400);
      }

      req.user = user;
      req.params.id = bookingID;

      if (message.button.text === 'Accept')
        return await acceptBookingController(req, res);
    }
  } catch (err) {
    return res.sendStatus(400);
  }

  return res.sendStatus(200);
};
