import React from 'react';
import { Box, CssBaseline, Toolbar, Typography, AppBar, IconButton, Avatar } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Sidebar from '../Sidebar';
import LogoImage from '../Logo.png'
import AppBarView from '../AppBarView';
import { PieChart } from '@mui/x-charts/PieChart';


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
            <Typography variant="h5">435</Typography>
          </Box>
          <Box sx={{ p: 2, bgcolor: 'white', width: '24%', textAlign: 'center', boxShadow: 1, borderRadius: 2 }}>
            <Typography>Total Users</Typography>
            <Typography variant="h5">12454</Typography>
          </Box>
          <Box sx={{ p: 2, bgcolor: 'white', width: '24%', textAlign: 'center', boxShadow: 1, borderRadius: 2 }}>
            <Typography>Total Products</Typography>
            <Typography variant="h5">300+</Typography>
          </Box>
          <Box sx={{ p: 2, bgcolor: 'white', width: '24%', textAlign: 'center', boxShadow: 1, borderRadius: 2 }}>
            <Typography>Unresponded Queries</Typography>
            <Typography variant="h5">538</Typography>
          </Box>
        </Box>

        {/* Graphs */}
       <Box>
       <PieChart
      series={[
        {
          innerRadius: 30,
          outerRadius: 100,
          data: [
            { id: 0, value: 10, label: 'New Visitors' },
            { id: 1, value: 15, label: 'Old Visitors' },
            { id: 2, value: 20, label: 'Recent Visitors' },
          ],
        },
      ]}
      width={600}
      height={200}
    />
       </Box>
      </Box>
    </Box>
  );
}

export default Dashboard;
