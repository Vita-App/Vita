import React from 'react';

import Stack from '@mui/material/Stack';
import EditableField from 'components/EditableField';
import { MentorSchemaType, UserType } from 'types';

interface IProps {
  mentor?: MentorSchemaType;
  user: UserType;
}

const Profile: React.FC<IProps> = ({ mentor, user }) => (
  <Stack my={5} maxWidth="500px">
    <EditableField
      value={user.first_name}
      label="First Name"
      name="first_name"
      updateLabel="First Name"
    />
  </Stack>
);

export default Profile;
