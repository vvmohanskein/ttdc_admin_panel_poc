import React from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Toolbar, Typography, Box, Avatar } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import GroupIcon from '@mui/icons-material/Group';
import InsertChartIcon from '@mui/icons-material/InsertChart';
import FeedbackIcon from '@mui/icons-material/Feedback';
import { styled } from '@mui/material/styles';
import LogoImage from './Logo.png'
import { Link,useLocation} from 'react-router-dom';
import { useState,useEffect } from 'react';

import './Sidebar.css';

const drawerWidth = 240;

// Styled ListItem for default and hover effect with transition
const StyledListItem = styled(ListItem)(({ theme }) => ({
  // Set default styles for icon and text
  '& .MuiListItemIcon-root': {
    color: 'white', // Default icon color white
    fontSize: '18px',
    transition: 'color 0.3s ease', // Smooth transition for icon color
  },
  '& .MuiListItemText-primary': {
    color: 'white', // Default text color white
    fontWeight: 'normal', // Default font weight
    fontSize: '0.8rem', // Reduce text font size (adjustable)
    transition: 'color 0.3s ease, font-weight 0.3s ease, font-size 0.3s ease', // Smooth transition for text properties
  },
  transition: 'background-color 0.3s ease, border-radius 0.3s ease', // Transition for background and border-radius
  '&:hover': {
    backgroundColor: 'white', // Change background to white on hover
    borderRadius: '10px', // Add border-radius on hover
    '& .MuiListItemIcon-root': {
      color: '#5f59e4', // Change icon color to red on hover
      fontSize: '20px', // Optionally increase icon size on hover (adjust as needed)
    },
    '& .MuiListItemText-primary': {
      color: '#5f59e4', // Change text color to red on hover
      fontWeight: 'bold', // Make text bold on hover
      fontSize: '0.9rem', // Optionally increase font size
      letterSpacing: '0.5px', // Optional letter spacing for a cleaner look
    },
  },
}));

const Sidebar = () => {

  const location = useLocation();
  const [activeBar, setActiveBar]= useState("dashboard")


  useEffect(()=>{
    const path = location.pathname;
    console.log('path-->',path)
    // if(path === '/dashboard'){
    //     setActiveBar("dashboard")
    // } else if(path === '/category'){
    //     setActiveBar("category")
    // } else if(path === '/product'){
    //     setActiveBar("product")
    // }
    // console.log(path);
},[location]);

  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
          backgroundColor: '#F4F7FE',
          borderRight: 'none',
          boxShadow: '2px 0 5px rgba(0,0,0,0.1)', // Subtle shadow effect
          padding: '20px',
        },
      }}
      variant="permanent"
      anchor="left"
    >
      {/* User Profile and Title */}
      <Toolbar sx={{ justifyContent: 'center', mb: 3 }}>
      <Box
  component="img"
  alt="User Profile"
  src={LogoImage}
  sx={{
    width: '100%',    // Full width of the container
    height: 'auto',   // Maintain aspect ratio
    mb: 1,
    // background: '#fff',
    borderRadius: '6px'
  }}
/>
      </Toolbar>

      {/* Navigation Menu */}
      <List>
        {[
          { text: 'Dashboard', icon: <DashboardIcon />, link: '/admin/dashboard' },
          { text: 'Events', icon: <GroupIcon />, link: '/admin/events' },
          { text: 'Users', icon: <GroupIcon />, link: '/admin/users' },
          { text: 'Ads & Posts', icon: <InsertChartIcon />, link: '/admin/ads' },
          { text: 'Reports', icon: <InsertChartIcon />, link: '/admin/reports' },
          { text: 'Admin Users', icon: <GroupIcon />, link: '/admin/admin-users' },
          { text: 'Feedbacks', icon: <FeedbackIcon />, link: '/admin/feedbacks' },
        ].map((item, index) => (
          <Link to={item.link} style={{ textDecoration: 'none' }} key={item.text}>
            <StyledListItem button selected={item.selected}>
              <ListItemIcon className='ListIcon'>{item.icon}</ListItemIcon>
              <ListItemText className='FontDefault' primary={item.text} />
            </StyledListItem>
          </Link>
        ))}
      </List>
    </Drawer>
  );
}

export default Sidebar;
