import React, { useState } from "react";
import { Box, Container, Typography, IconButton, Tooltip } from "@mui/material";
import { Delete } from "@mui/icons-material";
import { DataGrid, GridColDef, GridSelectionModel } from "@mui/x-data-grid";
import { users } from "data";

const UsersPage = () => {
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
  ];

  return (
    <Container maxWidth="xl">
      <Typography variant="h3" gutterBottom>
        Users
      </Typography>
      <Box width="100%" position="relative">
        {selectedRows.length !== 0 && (
          <IconButton
            sx={{ position: "absolute", right: 0, top: 5 }}
            onClick={() => console.log("Click")}
            color="error"
          >
            <Delete />
          </IconButton>
        )}
        <DataGrid
          columns={columns}
          rows={users}
          autoHeight
          pageSize={5}
          rowsPerPageOptions={[5]}
          onSelectionModelChange={ids => setSelectedRows(ids)}
          checkboxSelection
        />
      </Box>
    </Container>
  );
};

export default UsersPage;
