import Handlebars from 'handlebars';
import path from 'path';
import fs from 'fs';

export const emailVerificationTemplate = (url: string) => {
  const templateStr = fs
    .readFileSync(path.resolve(__dirname, 'emailVerification.hbs'))
    .toString('utf8');
  const template = Handlebars.compile(templateStr);
  return template({ url });
};
