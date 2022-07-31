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
    {user.is_mentor && (
      <>
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
          value={mentor?.twitter || 'Not Provided'}
          label="Twitter"
          name="twitter"
          updateLabel="Update your twitter Profile"
        />
      </>
    )}
  </Stack>
);

export default Profile;
