import { Request, Response } from 'express';
import { WHATSAPP_WEBHOOK_TOKEN } from '../config/keys';

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
  for (const entry of req.body.entry) {
    for (const change of entry.changes) {
      if (change.field !== 'messages') {
        return;
      }

      if (change.value.messages) {
        const message = change.value.messages[0];
        if (message.type === 'button') {
          console.log(message.button);
        } else {
          console.log(message.text);
        }
      }
    }
  }

  return res.sendStatus(200);
};
