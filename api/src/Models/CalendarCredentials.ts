import { Schema, model } from 'mongoose';
import { CalenderCredentialsSchemaTypes } from '../types';

const CalendarCredentialsSchema = new Schema<CalenderCredentialsSchemaTypes>({
  email: { type: String },
  refresh_token: { type: String },
});

export const CalendarCredentialsModel = model(
  'CalendarCredentials',
  CalendarCredentialsSchema,
);
