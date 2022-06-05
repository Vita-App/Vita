import React, { useRef, useState } from "react";
import { useNavigate } from "react-router";
import {
  Box,
  Container,
  Typography,
  Button,
  Stack,
  TextField,
  IconButton,
} from "@mui/material";
import { Delete, Search } from "@mui/icons-material";
import { DataGrid, GridColDef, GridSelectionModel } from "@mui/x-data-grid";
import { users } from "data";

const UsersPage = () => {
  const searchRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const [rows, setRows] = useState(users);
  const [selectedRows, setSelectedRows] = useState<GridSelectionModel>([]);
  const columns: GridColDef[] = [
    {
      field: "first_name",
      headerName: "First Name",
    },
    {
      field: "last_name",
      headerName: "Last Name",
    },
    {
      field: "email",
      headerName: "Email",
      width: 200,
    },
    {
      field: "View Details",
      headerName: "",
      width: 300,
      renderCell: params => {
        return (
          <Button
            variant="outlined"
            color="error"
            sx={{ zIndex: 100 }}
            onClick={() => {
              navigate(`/user/${params.row.id}`);
            }}
          >
            View Details
          </Button>
        );
      },
    },
  ];

  const onSearch = () => {
    const search = searchRef.current!.value;
    const filteredUsers = users.filter(
      (user: any) =>
        user.first_name.toLowerCase().includes(search.toLowerCase()) ||
        user.last_name.toLowerCase().includes(search.toLowerCase()) ||
        user.email.toLowerCase().includes(search.toLowerCase())
    );
    setSelectedRows([]);
    setRows(filteredUsers);
  };

  return (
    <Container sx={{ width: "100%" }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography variant="h3" gutterBottom>
          Users
        </Typography>
        <TextField
          inputRef={searchRef}
          label="Search"
          variant="outlined"
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
      <Box mb={2}>
        <DataGrid
          columns={columns}
          rows={rows}
          autoHeight
          pageSize={5}
          rowsPerPageOptions={[5]}
          onSelectionModelChange={ids => setSelectedRows(ids)}
          checkboxSelection
        />
      </Box>
      {selectedRows.length !== 0 && (
        <Button
          onClick={() => console.log(selectedRows)}
          color="error"
          variant="contained"
        >
          Delete <Delete />
        </Button>
      )}
    </Container>
  );
};

export default UsersPage;
