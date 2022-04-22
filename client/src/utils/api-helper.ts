import axios from 'axios';
import { SERVER_URL } from 'config.keys';
import { MentorSchemaType, TopicSchemaType } from 'types';

export const getMentors = async (expertise : any, topic = -1, limit = 0) => {
  const { data: response } = await axios.get<MentorSchemaType[]>(
    `${SERVER_URL}/api/get-mentors`,
    {
      params: {
        expertise,
        topic,
        limit,
      },
    },
  );
  console.log(response);
  return response;
};

export const getTopics = async (motivation : any, limit = 0) => {
  const { data: response } = await axios.get<TopicSchemaType[]>(
    `${SERVER_URL}/api/get-topics`,
    {
      params: {
        motivation,
        limit,
      },
    },
  );
  console.log(response);
  return response;
};
