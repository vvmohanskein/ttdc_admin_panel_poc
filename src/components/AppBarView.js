import React, { useState } from 'react';
import { AppBar, Toolbar, IconButton, Avatar, Menu, MenuItem } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { useNavigate } from 'react-router-dom';

const drawerWidth = 240;

const AppBarView = () => {
    const [anchorEl, setAnchorEl] = useState(null); // State to manage the menu anchor

    // Function to handle opening the menu
    const handleMenuClick = (event) => {
        setAnchorEl(event.currentTarget); // Set the anchor element to the clicked avatar
    };

    // Function to handle closing the menu
    const handleClose = () => {
        setAnchorEl(null); // Close the menu
    };

    const navigate = useNavigate();

    const handleLogout = () => {
        // Clear user authentication (this could involve clearing tokens, etc.)
        localStorage.removeItem('userToken'); // Example of clearing token
        // Redirect to login page or any other page after logout
        navigate('/');
    };

    return (
        <AppBar
            position="fixed"
            sx={{
                width: `calc(100% - ${drawerWidth}px)`,
                ml: `${drawerWidth}px`,
                backgroundColor: '#ffffff',
                color: 'black', // Change to black for better contrast
                boxShadow: '0px 6px 12px rgba(0, 0, 0, 0.15)',
            }}
        >
            <Toolbar sx={{ justifyContent: 'flex-end' }}>
                <IconButton>
                    <NotificationsIcon sx={{ color: '#5f59e4' }} />
                </IconButton>
                <Avatar
                    src={require('./Logo.png')}
                    sx={{ ml: 2, cursor: 'pointer' }} // Add cursor pointer for better UX
                    onClick={handleMenuClick} // Open the menu on avatar click
                >
                    AT
                </Avatar>
                <Menu
                    anchorEl={anchorEl} // Set the anchor element
                    open={Boolean(anchorEl)} // Control the menu open state
                    onClose={handleClose} // Handle menu close
                    PaperProps={{
                        sx: {
                            width: '110px', // Reduced width for the menu
                            marginLeft: '10px', // Center the menu
                            backgroundColor: '#ffffff',
                            borderRadius: '8px',
                            boxShadow: '0px 6px 12px rgba(0, 0, 0, 0.2)',
                        },
                    }}
                >
                    <MenuItem
                        onClick={() => { navigate('/profile'); handleClose(); }}
                        sx={{
                            padding: '10px 20px', // Add padding to MenuItem
                            '&:hover': { // Hover effect
                                backgroundColor: '#f0f0f0', // Change background on hover
                                color: '#5f59e4', // Change text color on hover
                            },
                        }}
                    >
                        Profile
                    </MenuItem>
                    <MenuItem
                        onClick={handleLogout}
                        sx={{
                            padding: '10px 20px', // Add padding to MenuItem
                            '&:hover': { // Hover effect
                                backgroundColor: '#f0f0f0', // Change background on hover
                                color: '#5f59e4', // Change text color on hover
                            },
                        }}
                    >
                        Logout
                    </MenuItem>
                </Menu>
            </Toolbar>
        </AppBar>
    );
}

export default AppBarView;
