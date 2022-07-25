import React from 'react';
import { Box, Button, Stack, styled } from '@mui/material';
import { Link } from 'react-router-dom';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import { blue } from '@mui/material/colors';

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
  const x = 1;
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
        <Link to="/search" style={{ color: 'lightblue' }}>
          See All
        </Link>
      </Stack>
      <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'inherit' }}>
        <TopMentorComponent />
      </List>
    </Box>
  );
};

export default SideBar;

const TopMentorComponent = () => {
  const name = 'Rishabh Malhotra';
  const profession = 'SDE at Amazon';
  const imgLink = '';
  return (
    <ListItem sx={{ p: 0 }}>
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
        Book
      </Button>
    </ListItem>
  );
};
