import React from 'react';
import { Box, CssBaseline, Toolbar, Typography, AppBar, IconButton, Avatar } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Sidebar from '../Sidebar';
import LogoImage from '../Logo.png'
import AppBarView from '../AppBarView';
import { PieChart } from '@mui/x-charts/PieChart';
import { LineChart } from '@mui/x-charts';
import './Dashboard.css';
import { BarChart } from '@mui/x-charts/BarChart';

const drawerWidth = 240;


export function Dashboard() {
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
          <Box sx={{ p: 2,borderLeft:"2px solid orangered", bgcolor: 'white', width: '24%', textAlign: 'center', boxShadow: 1, borderRadius: 2 }}>
            <Typography>Total Registered Private Hotels</Typography>
            <Typography variant="h5">435+</Typography>
          </Box>
          <Box sx={{ p: 2,borderLeft:"2px solid orangered", bgcolor: 'white', width: '24%', textAlign: 'center', boxShadow: 1, borderRadius: 2 }}>
            <Typography>Total Users</Typography>
            <Typography variant="h5">1244</Typography>
          </Box>
          <Box sx={{ p: 2,borderLeft:"2px solid orangered", bgcolor: 'white', width: '24%', textAlign: 'center', boxShadow: 1, borderRadius: 2 }}>
            <Typography>Total Events</Typography>
            <Typography variant="h5">20</Typography>
          </Box>
          <Box sx={{ p: 2,borderLeft:"2px solid orangered", bgcolor: 'white', width: '24%', textAlign: 'center', boxShadow: 1, borderRadius: 2 }}>
            <Typography>Total feedbacks </Typography>
            <Typography variant="h5">538</Typography>
          </Box>
        </Box>

        {/* Graphs */}
        <div className='chart-main-div-dashboard'>
        
          
        <Box className='pie-chart_box' sx={{width:'50%', backgroundColor:''}}>
          <h3 sx={{textAlign:'center'}}>Users Count</h3>
       <PieChart
      series={[
        {
          innerRadius: 30,
          outerRadius: 100,
          data: [
            { id: 0, value: 30, label: 'New Users' },
            { id: 2, value: 25, label: 'Active Users' },
          ],
        },
      ]}
      width={600}
      height={200}
    />
       </Box>
       <Box className='line-chart_box'  sx={{width:'50%', backgroundColor:''}}>
       {/* <LineChart
      xAxis={[{ data: [1, 2, 3, 5, 8, 10] }]}
      series={[
        {
          data: [2, 5.5, 2, 8.5, 1.5, 5],
        },
      ]}
      width={500}
      height={300}
    /> */}
    <h3>User Analytics</h3>
      <BarChart
      xAxis={[{ scaleType: 'band', data: ['Register Users(2024) ', 'Un-Register Users(2024)'] }]}
      series={[{ data: [2, 4] }, { data: [1, 6] }]}
      width={500}
      height={300}
      barLabel="value"
    />
       </Box>

        </div>
      
      </Box>
    </Box>
  );
}

