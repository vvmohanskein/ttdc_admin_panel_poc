import React, { useEffect, useState } from 'react';
import {
  Box,
  CssBaseline,
  Button,
  Grid,
  Typography,
  Card,
  Paper,
  CardContent,
  CardMedia,
  CardActionArea,
  IconButton,
  Tooltip,
  TextField,
} from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon, Search as SearchIcon } from '@mui/icons-material';
import AddIcon from '@mui/icons-material/Add';
import Sidebar from '../Sidebar';
import { Link, useNavigate } from 'react-router-dom';
import AppBarView from '../AppBarView';
import { eventsGetApi } from '../../API/api';
import Modal from '@mui/material/Modal';
import axios from 'axios';
import { toast } from 'react-toastify';
import './Event.css';

function Event() {


  const [cards,setCards] = useState([]);
  const [originalCards,setOriginalCards] = useState([])
  const [searchTerm, setSearchTerm] = useState('');
const [deleteId,setDeleteId]= useState('')
  const navigate = useNavigate()

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    const searchingTerm = event.target.value
    const filteredTitle = cards.filter(titleData =>
      titleData.title.toLowerCase().includes(searchingTerm.toLowerCase())
    );
    setCards(filteredTitle)
if(searchingTerm === ""){
  setCards(originalCards)
}
    
  };



  
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  height:200,
  bgcolor: 'background.paper',
  // border: '2px solid #000',
  borderRadius:'20px',
  boxShadow: 24,
  p: 4,
};
const [open, setOpen] = React.useState(false);
const handleOpen = () => setOpen(true);
const handleClose = () => setOpen(false);
  const handleEdit = (index,card) => {

    console.log(card?.buttons?.[0]?.payload);
    const id = card?.buttons?.[0]?.payload
    const numberId = id.slice(4); 
console.log(numberId);
    
axios.get(`https://demo.emeetify.com:81/tourism/places/getplaces?PlaceId=${numberId}&source=socketio&lang=en`)
.then((response)=>{
     console.log(response?.data?.data?.[0]?.WebUrl);
     const pdfUrl = response?.data?.data?.[0]?.WebUrl
     navigate(`/admin/EditEvent/${numberId}`,{state:{card, pdfUrl}})

}).catch((error)=>{
  console.log(error);
  
})
    // navigate(`/admin/EditEvent/${numberId}`,{state:card})

    console.log(`Edit card at index ${index}`);

  };

  const handleDelete = (card,index) => {
    const id = card?.buttons?.[0]?.payload
    const numberId = id.slice(4); 
setDeleteId(numberId)
    handleOpen()
    console.log(`Delete card at index ${index}`);
  };

  useEffect(()=>{
 eventsGetApi().then((response)=>{
  console.log(response?.data?.data);
  
  setCards(response?.data?.data)
  setOriginalCards(response?.data?.data)
 })
  },[])

const handleDeleteEvent =()=>{
  if(deleteId){
    axios.delete(`https://demo.emeetify.com:81/tourism/places/eventdelete/${deleteId}`)
    .then((response)=>{
      console.log(response?.data);
      if(response?.data?.status){
        toast.success(response?.data?.message)
        handleClose()
        window.location.reload()
      }
      if(response?.data?.status === false){
        toast.error(response?.data?.message)
    
      }
    }).catch((error)=>{
      console.log(error);
      
    })
  }
}

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />

      {/* Sidebar */}
      <Sidebar />

      {/* Top Bar */}
      <AppBarView />

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          bgcolor: 'background.default',
          p: 3,
          marginTop: 8,
          backgroundImage: 'linear-gradient(135deg, #e3fdf5 0%, #ffe6fa 100%)',
          minHeight: '100vh',
        }}
      >
        <Paper
          elevation={4}
          sx={{
            padding: '30px',
            borderRadius: '9px',
            margin: '0 auto',
            backgroundColor: '#ffffff',
          }}
        >
          {/* Search Bar & Add Event */}
          <Grid container spacing={2} sx={{ mb: 4 }}>
            <Grid item xs={12} md={8}>
              <TextField
                size="small"
                variant="outlined"
                placeholder="Search events..."
                value={searchTerm}
                onChange={handleSearchChange}
                InputProps={{
                  startAdornment: (
                    <IconButton>
                      <SearchIcon />
                    </IconButton>
                  ),
                }}
                sx={{
                  flexGrow: 1,
                  marginRight: 2,
                }}
              />
            </Grid>
            <Grid item xs={12} md={4} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Link to="/admin/AddEvent" style={{ textDecoration: 'none' }}>
                <Button
                  variant="contained"
                  startIcon={<AddIcon />}
                  sx={{
                    bgcolor: '#5f59e4',
                    color: 'white',
                    '&:hover': {
                      bgcolor: '#706aff',
                    },
                    borderRadius: '8px', // Rounded corners for a modern look
                    padding: '4px 12px', // Reduced padding
                    fontWeight: 'bold',
                    fontSize: '0.875rem', // Smaller font size
                    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)', // Subtle shadow
                    transition: 'background-color 0.3s ease', // Smooth transition
                  }}
                >
                  Add Event
                </Button>
              </Link>
            </Grid>
          </Grid>

          {/* Product List Section */}
          <Grid container spacing={2}>
            {cards?.map((card, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
<Card
  sx={{
    height: '400px',
    boxShadow: '0 8px 20px rgba(0, 0, 0, 0.15)',
    overflow: 'hidden',
    position: 'relative',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    display: 'flex', // Added to make it a flex container
    flexDirection: 'column', // Column direction
  }}
>
  <CardActionArea sx={{ flexGrow: 1 }}> {/* Allow this area to grow */}
    <Box sx={{ height: '160px', overflow: 'hidden' }}>
      <CardMedia
        component="img"
        alt={card.title}
        height="100%"
        image={`${card.image_url}`}
        sx={{
          objectFit: 'cover',
          borderRadius: '8px',
          transition: 'opacity 0.3s ease',
          '&:hover': {
            opacity: 0.85,
          },
        }}
      />
    </Box>
  </CardActionArea>
  
  {/* Adjusted CardContent */}
  <CardContent
    sx={{
      flexGrow: 0, // Ensure it doesn't grow beyond its content
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      height: '80px', // Fixed height to keep it uniform
    }}
  >
    <Typography
      gutterBottom
      variant="h6"
      component="h2"
      sx={{
        color: '#333',
        fontWeight: 'bold',
        fontSize: '1.2rem',
      }}
    >
      {card.title}
    </Typography>
    <Typography
      variant="body2"
      color="textSecondary"
      component="p"
      sx={{
        color: '#757575',
        fontStyle: 'italic',
      }}
    >
      {card.subtitle}
    </Typography>
  </CardContent>

  {/* Edit and Delete Buttons */}
  <Box
    sx={{
      position: 'absolute',
      top: 8,
      right: 8,
      display: 'flex',
      gap: '4px',
    }}
  >
    <Tooltip title="Edit" arrow>
      <IconButton
        aria-label="edit"
        onClick={() => handleEdit(index, card)}
        sx={{
          bgcolor: '#ffffff',
          padding: '4px',
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
          '&:hover': {
            bgcolor: '#e0e0e0',
          },
        }}
      >
        <EditIcon fontSize="small" />
      </IconButton>
    </Tooltip>
    <Tooltip title="Delete" arrow>
      <IconButton
        aria-label="delete"
        onClick={() => handleDelete(card,index)}
        sx={{
          bgcolor: '#ffffff',
          padding: '4px',
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
          '&:hover': {
            bgcolor: '#e57373',
          },
        }}
      >
        <DeleteIcon fontSize="small" />
      </IconButton>
    </Tooltip>
  </Box>
</Card>


              </Grid>
            ))}
          </Grid>
        </Paper>
        <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
           Are You Sure want to delete?
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
<Button className='delete-btn-yes' onClick={handleDeleteEvent}>
  Yes
</Button>
<Button className='delete-btn-no' onClick={handleClose}>
  No
</Button>
          </Typography>
        </Box>
      </Modal>
      </Box>
    </Box>
  );
}

export default Event;
