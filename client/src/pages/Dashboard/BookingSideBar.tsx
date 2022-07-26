import React from 'react';
import { Box, Button, Stack, styled } from '@mui/material';
import { Link } from 'components/common';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import { blue } from '@mui/material/colors';
import { useQuery } from 'react-query';
import { getMentors } from 'utils/api-helper';
import { MentorSchemaType } from 'types';

const StyledListItemText = styled(ListItemText)({
  '& .MuiListItemText-primary': {
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  '& .MuiListItemText-secondary': {
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
});

const SideBar = () => {
  const { isLoading, data } = useQuery(['top-mentors-sidebar'], () =>
    getMentors('All', '', -1, 1, 7, true),
  );
  return (
    <Box sx={{ p: 1 }}>
      <Stack
        direction="row"
        sx={{
          width: '100%',
          alignItems: 'baseline',
          justifyContent: 'space-between',
        }}>
        <h3>Who to meet</h3>
        <Link to="/search?topMentor=true" style={{ color: 'lightblue' }}>
          See All
        </Link>
      </Stack>
      <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'inherit' }}>
        {!isLoading &&
          data &&
          data.mentors.map((mentor) => (
            <TopMentorComponent mentor={mentor} key={mentor._id} />
          ))}
      </List>
    </Box>
  );
};

export default SideBar;

const TopMentorComponent = ({ mentor }: { mentor: MentorSchemaType }) => {
  const name = `${mentor.first_name} ${mentor.last_name}`;
  const profession = `${mentor.experiences[0].role} at ${mentor.experiences[0].company}`;
  const imgLink = mentor.avatar.url;
  return (
    <ListItem sx={{ p: 0, my: 2 }}>
      <ListItemAvatar>
        <Avatar src={imgLink} />
      </ListItemAvatar>
      <StyledListItemText primary={name} secondary={profession} />
      <Button
        variant="contained"
        style={{
          backgroundColor: blue[900],
          marginLeft: '8px',
          flexGrow: 1,
          color: 'white',
          fontWeight: 600,
          padding: '4px',
        }}>
        <Link to={`/user/${mentor._id}`}>Book</Link>
      </Button>
    </ListItem>
  );
};
