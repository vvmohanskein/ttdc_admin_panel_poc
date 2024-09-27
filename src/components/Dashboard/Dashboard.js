import React from 'react';
import { Box, CssBaseline, Toolbar, Typography, AppBar, IconButton, Avatar } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Sidebar from '../Sidebar';
import LogoImage from '../Logo.png'
import AppBarView from '../AppBarView';


const drawerWidth = 240;

function Dashboard() {
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
        {/* Dashboard Content */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 4 }}>
          <Box sx={{ p: 2, bgcolor: 'white', width: '24%', textAlign: 'center', boxShadow: 1, borderRadius: 2 }}>
            <Typography>Total Distributors</Typography>
            <Typography variant="h4">435</Typography>
          </Box>
          <Box sx={{ p: 2, bgcolor: 'white', width: '24%', textAlign: 'center', boxShadow: 1, borderRadius: 2 }}>
            <Typography>Total Users</Typography>
            <Typography variant="h4">12454</Typography>
          </Box>
          <Box sx={{ p: 2, bgcolor: 'white', width: '24%', textAlign: 'center', boxShadow: 1, borderRadius: 2 }}>
            <Typography>Total Products</Typography>
            <Typography variant="h4">300+</Typography>
          </Box>
          <Box sx={{ p: 2, bgcolor: 'white', width: '24%', textAlign: 'center', boxShadow: 1, borderRadius: 2 }}>
            <Typography>Unresponded Queries</Typography>
            <Typography variant="h4">538</Typography>
          </Box>
        </Box>

        {/* Graphs */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Box sx={{ width: '48%', bgcolor: 'white', p: 3, borderRadius: 2, boxShadow: 1 }}>
            <Typography variant="h6">Number of New Users</Typography>
            {/* Insert Chart Here */}
            <Box sx={{ mt: 2 }}>
              <img src="/path/to/chart.png" alt="Chart 1" style={{ width: '100%' }} />
            </Box>
          </Box>
          <Box sx={{ width: '48%', bgcolor: 'white', p: 3, borderRadius: 2, boxShadow: 1 }}>
            <Typography variant="h6">Number of Users Visits</Typography>
            {/* Insert Chart Here */}
            <Box sx={{ mt: 2 }}>
              <img src="/path/to/chart.png" alt="Chart 2" style={{ width: '100%' }} />
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default Dashboard;
