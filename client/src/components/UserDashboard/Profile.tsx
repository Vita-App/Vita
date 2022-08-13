import React, { useEffect, useRef, useState } from 'react';

import Stack from '@mui/material/Stack';
import EditableField from 'components/EditableField';
import { MentorSchemaType, UserType } from 'types';
import { Avatar, Typography } from '@mui/material';
import { StyledButton, StyledTextField } from 'components/common';
import axios from 'axios';
import { SERVER_URL } from 'config.keys';
import { toast } from 'react-toastify';
import { useSetRecoilState } from 'recoil';
import { authState } from 'store';

interface IProps {
  mentor?: MentorSchemaType;
  user: UserType;
}

const updateUserProfilePic = async (formData: FormData) => {
  const { data } = await axios.put<{ url: string; filename: string }>(
    `${SERVER_URL}/api/profile-pic`,
    formData,
    {
      withCredentials: true,
    },
  );

  return data;
};

const Profile: React.FC<IProps> = ({ mentor, user }) => {
  const setAuth = useSetRecoilState(authState);
  const [updatingPic, setUpdatingPic] = useState(false);
  const [avatarSrc, setAvatarSrc] = useState('');
  const profilePicRef = useRef<HTMLInputElement>();

  const onChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;

    // Check size of file and if it's too big, show error
    const file = e.target.files[0];

    // Max size of file is 600Kb
    if (file?.size > 600000) {
      toast.error('Please upload an image smaller than 600KB');
      return;
    }

    const formData = new FormData();
    formData.append('profilePic', e.target.files[0]);

    setUpdatingPic(true);
    try {
      const data = await updateUserProfilePic(formData);
      setAuth((prev) => {
        console.log({ ...prev, user: { ...prev.user, avatar: data } });
        return { ...prev, user: { ...prev.user!, avatar: data } };
      });
      setAvatarSrc(data.url);
      toast.success('Profile picture updated successfully');
    } catch (err) {
      toast.error("Couldn't update profile pic");
    } finally {
      setUpdatingPic(false);
    }
  };

  useEffect(() => {
    setAvatarSrc(user.avatar?.url || '');
  }, [user.avatar?.url]);

  return (
    <Stack my={5} maxWidth="600px">
      <Stack mb={2}>
        <Typography variant="h6" mb={1}>
          Profile Picture
        </Typography>
        <Stack
          direction="row"
          spacing={3}
          border={1}
          p={2}
          borderRadius="4px"
          borderColor="#767676"
          alignItems="center">
          <Avatar sx={{ width: '50px', height: '50px' }} src={avatarSrc} />
          <Stack spacing={1}>
            <Stack direction="row" spacing={1}>
              <StyledButton
                variant="contained"
                disabled={updatingPic}
                sx={{ flex: 0.4 }}
                onClick={() => profilePicRef.current?.click()}>
                {!updatingPic ? 'Change' : 'Updating...'}
              </StyledButton>
              <StyledTextField
                id="profilePicture"
                type="file"
                inputRef={profilePicRef}
                onChange={onChange}
                sx={{
                  display: 'none',
                }}
                inputProps={{
                  accept: 'image/jpeg, image/png',
                }}
              />
            </Stack>
            <Typography variant="caption" color="textSecondary">
              You can upload .jpeg or .png image files.
            </Typography>
          </Stack>
        </Stack>
      </Stack>
      <EditableField
        validators={{
          required: 'Please enter your name',
        }}
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
            validators={{
              required: 'Please select at least one expertise',
            }}
            value={mentor?.expertise}
            label="Expertise"
            name="expertise[]"
            updateLabel="Choose your Expertise!"
          />
          <EditableField
            validators={{
              required: 'Linkedin is required',
              pattern: {
                value: /^(https?:\/\/)?(www\.)?linkedin\.com\/in\/.+$/,
                message: 'Please enter a valid Linkedin URL',
              },
            }}
            value={mentor?.linkedIn}
            label="LinkedIn"
            name="linkedIn"
            updateLabel="Update your LinkedIn Profile"
          />
          <EditableField
            validators={{
              pattern: {
                value: /^(https?:\/\/)?(www\.)?twitter\.com\/.+$/,
                message: 'Please enter a valid Twitter URL',
              },
            }}
            value={mentor?.twitter}
            label="Twitter"
            name="twitter"
            updateLabel="Update your twitter Profile"
          />
        </>
      )}
    </Stack>
  );
};

export default Profile;
