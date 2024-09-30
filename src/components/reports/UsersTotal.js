import React from 'react';
import { Box, CssBaseline, Toolbar, Typography, AppBar, IconButton, Avatar } from '@mui/material';
import AppBarView from '../AppBarView';
import Sidebar from '../Sidebar';




export function UserTotal(){

    return(
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
      
    <h4>Users Page</h4>
      
      </Box>
    </Box>
    )
}