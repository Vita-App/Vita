import { Request, Response } from 'express';
import { WHATSAPP_WEBHOOK_TOKEN } from '../config/keys';
import { UserModel } from '../Models/User';
import bookingsController from './bookings.controller';

const verifyWebHook = async (req: Request, res: Response) => {
  if (
    req.query?.hub_mode === 'subscribe' &&
    req.query?.hub_verify_token === WHATSAPP_WEBHOOK_TOKEN
  ) {
    res.send(req.query?.hub_challenge);
  } else {
    res.sendStatus(400);
  }
};

const handleWhatsAppWebHook = async (req: Request, res: Response) => {
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
        return await bookingsController.acceptBooking(req, res);
    }
  } catch (err) {
    return res.sendStatus(400);
  }

  return res.sendStatus(200);
};

export default {
  verifyWebHook,
  handleWhatsAppWebHook,
};
