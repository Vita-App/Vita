import React from 'react';
import {
  Chip,
  List,
  ListItem,
  Box,
  Typography,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Divider,
} from '@mui/material';
import { ExperienceType } from 'types';

interface IProps {
  experiences: ExperienceType[];
}

const Experiences: React.FC<IProps> = ({ experiences }) => (
  <Box>
    <Typography variant="h5">Experience</Typography>
    <Divider />
    <List>
      {experiences.map((experience) => (
        <ListItem key={experience._id}>
          <ListItemAvatar>
            <Avatar>🚀</Avatar>
          </ListItemAvatar>
          <ListItemText
            primary={experience.company}
            secondary={experience.role}
          />
          <Chip label={`${experience.start_year} - ${experience.end_year}`} />
        </ListItem>
      ))}
    </List>
  </Box>
);

export default Experiences;
