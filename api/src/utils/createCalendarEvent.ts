import { google } from 'googleapis';
import { CalendarCredentialsModel } from '../Models/CalendarCredentials';
const { OAuth2 } = google.auth;

import { CalendarOptionTypes } from '../types';

const createCalenderEvent = async (options: CalendarOptionTypes) => {
  const oAuth2Client = new OAuth2(
    process.env.GOOGLE_KEY_CLIENTID,
    process.env.GOOGLE_KEY_CLIENTSECRET,
  );

  const credentials: any = await CalendarCredentialsModel.findOne({});

  oAuth2Client.setCredentials({
    refresh_token: credentials.refresh_token,
  });

  const calendar: any = google.calendar({ version: 'v3', auth: oAuth2Client });

  const event = {
    summary: options.summary,
    location: 'Virtual / Google Meet',
    description: options.description,
    start: {
      dateTime: options.startTime,
    },
    end: {
      dateTime: options.endTime,
    },
    attendees: options.attendeesEmails,
    reminders: {
      useDefault: false,
      overrides: [
        { method: 'email', minutes: 24 * 60 },
        { method: 'popup', minutes: 10 },
      ],
    },
    conferenceData: {
      createRequest: {
        conferenceSolutionKey: {
          type: 'hangoutsMeet',
        },
        requestId: 'coding-calendar-demo',
      },
    },
  };

  const response = await calendar.events.insert({
    calendarId: 'primary',
    resource: event,
    conferenceDataVersion: 1,
    sendNotifications: true,
  });

  return response.data;
};

export default createCalenderEvent;
