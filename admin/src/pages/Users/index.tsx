import React, { useRef, useState } from "react";
import { useNavigate } from "react-router";
import {
  Box,
  Typography,
  Button,
  Stack,
  TextField,
  IconButton,
  Dialog,
} from "@mui/material";
import { Delete, Search } from "@mui/icons-material";
import { DataGrid, GridColDef, GridSelectionModel } from "@mui/x-data-grid";
import ConfirmDialog from "components/Modals/ConfirmDialog";
import { users } from "data";

const UsersPage = () => {
  const searchRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
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
    <Box sx={{ pl: 10, pr: 2 }}>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <ConfirmDialog
          onClose={() => setOpen(false)}
          onConfirm={() => {}}
          title="Are you sure?"
          message="These users will be permanently deleted from the database"
        />
      </Dialog>
      <Stack
        direction={{ xs: "column", sm: "row" }}
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
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
        <Button onClick={() => setOpen(true)} color="error" variant="contained">
          Delete <Delete />
        </Button>
      )}
    </Box>
  );
};

export default UsersPage;
