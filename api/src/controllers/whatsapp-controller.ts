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
  const body = JSON.parse(req.body);
  if (body.field !== 'messages') {
    // not from the messages webhook so dont process
    return res.sendStatus(400);
  }

  const messages = body.value;

  console.log(messages);

  return res.sendStatus(200);
};
