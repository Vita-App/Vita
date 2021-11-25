import { ObjectId } from 'mongoose';

export interface UserModelType {
  user_id: string;
  name: string;
  email: string;
  image_link: string;
  create_time: Date;
  oauth_provider: string;
  isMentor: boolean;
  signupCompleted: boolean;
  mentorInformation: ObjectId | undefined;
}

export interface UserInfo {
  name: string;
  image_link: string;
  roomID: string;
}

export interface PostJSDoodleResponse {
  output: string;
  statusCode: string;
  memeory: string;
  cpuTime: string;
  error?: string;
}
export interface PostJDoodle {
  script: string;
  language: string;
  versionIndex: string;
  clientId: string;
  stdin: string;
  clientSecret: string;
}

export interface Room {
  id: string; // client version of Room may have id optional
  created_by?: string;
  name?: string;
  opts?: {
    maxPeople?: string; // will be int parsed when used
  };
}
