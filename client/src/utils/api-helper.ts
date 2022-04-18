import axios from 'axios';
import { SERVER_URL } from 'config.keys';
import { MentorSchemaType } from 'types';

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
