import React from 'react';
import { Box, CssBaseline, Toolbar, Typography, AppBar, IconButton, Avatar, Card } from '@mui/material';
import Sidebar from '../Sidebar';
import AppBarView from '../AppBarView';


const drawerWidth = 240;

function UsersComponent() {
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      
      {/* Sidebar */}
      <Sidebar />

      {/* Top Bar */}
      <AppBarView/>

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          bgcolor: 'background.default',
          p: 3,
          marginTop: 8, // Adjust the top margin to push below the topbar
        }}
      >
<Card>
    <h1>Users Page</h1>
    </Card>    
      </Box>
    </Box>
  );
}

export default UsersComponent;
