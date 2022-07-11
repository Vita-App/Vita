import { Request, Response } from 'express';
import { WHATSAPP_WEBHOOK_TOKEN } from '../config/keys';
import { BookingModel } from '../Models/Booking';
import { UserModel } from '../Models/User';

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

    const { field, messages } = change.value;

    if (field !== 'messages') return res.sendStatus(400);

    const message = messages[0];

    if (message.type === 'button') {
      const bookingID = message.button.payload;
      const booking = await BookingModel.findById(bookingID);

      const user = await UserModel.find({ phone: message.from });

      if (!user || !booking) {
        return res.sendStatus(400);
      }
    }
  } catch (err) {
    return res.sendStatus(400);
  }

  return res.sendStatus(200);
};
