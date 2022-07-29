import React from 'react';

import Stack from '@mui/material/Stack';
import EditableField from 'components/EditableField';
import { MentorSchemaType, UserType } from 'types';

interface IProps {
  mentor?: MentorSchemaType;
  user: UserType;
}

const Profile: React.FC<IProps> = ({ mentor, user }) => (
  <Stack my={5} maxWidth="600px">
    <EditableField
      value={user.first_name}
      label="First Name"
      name="first_name"
      updateLabel="Update your first name"
    />
    <EditableField
      value={user.last_name}
      label="Last Name"
      name="last_name"
      updateLabel="Update your last name"
    />
    <EditableField
      value={mentor?.expertise}
      label="Expertise"
      name="expertise[]"
      updateLabel="Choose your Expertise!"
    />
    <EditableField
      value={mentor?.linkedIn}
      label="LinkedIn"
      name="linkedIn"
      updateLabel="Update your LinkedIn Profile"
    />
    <EditableField
      value={mentor?.twitter}
      label="Twitter"
      name="twitter"
      updateLabel="Update your twitter Profile"
    />
    <EditableField
      value={user?.timezone}
      label="Time Zone"
      name="time_zone"
      updateLabel="Update your Time Zone"
    />
  </Stack>
);

export default Profile;
