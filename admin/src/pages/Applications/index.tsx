import React, { useRef, useState } from "react";
import {
  List,
  ListItemButton,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Container,
  Typography,
  Stack,
  TextField,
  IconButton,
  Box,
} from "@mui/material";
import { ArrowForward, Search } from "@mui/icons-material";
import { applications as applicationsData } from "data";
import { useNavigate } from "react-router";

const ApplicationsPage = () => {
  const navigate = useNavigate();
  const searchRef = useRef<HTMLInputElement>();
  const [applications, setApplications] = useState(applicationsData);

  const onSearch = () => {
    const search = searchRef.current!.value;
    setApplications(
      applicationsData.filter(({ name }) =>
        name.toLowerCase().includes(search.toLowerCase())
      )
    );
  };

  return (
    <Box pl={10} pr={2}>
      <Stack
        direction={{ xs: "column", sm: "row" }}
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <Typography variant="h3" gutterBottom>
          Applications
        </Typography>
        <TextField
          inputRef={searchRef}
          label="Search"
          size="small"
          onChange={onSearch}
          InputProps={{
            endAdornment: (
              <IconButton onClick={onSearch}>
                <Search />
              </IconButton>
            ),
          }}
        />
      </Stack>
      <List>
        {applications.map(application => (
          <ListItemButton
            key={application.id}
            onClick={() => navigate(`/application/${application.id}`)}
          >
            <ListItemAvatar>
              <Avatar src="https://avatars0.githubusercontent.com/u/147616?s=460&v=4" />
            </ListItemAvatar>
            <ListItemText
              primary={application.name}
              secondary={application.description}
            />
            <ArrowForward />
          </ListItemButton>
        ))}
      </List>
    </Box>
  );
};

export default ApplicationsPage;
