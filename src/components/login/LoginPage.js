import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { TextField, Button, Checkbox, Typography, Link, Box, Paper } from '@mui/material';
import { styled } from '@mui/system';
import './Login.css';
import "@fontsource/montserrat";
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
import { loginAPI } from '../../API/api';
import { useNavigate } from 'react-router-dom';

// Styled components for modern UI elements
const StyledButton = styled(Button)({
  // backgroundColor: '#0061F2',
  backgroundColor: '#5f59e4',
  color: '#fff',
  padding: '12px 24px',
  fontSize: '18px',
  height: '40px',
  textTransform: 'none',
  fontWeight: '600',
  boxShadow: '0px 8px 15px rgba(0, 97, 242, 0.3)',
  transition: 'all 0.3s ease',
  '&:hover': {
    // backgroundColor: '#0053d6',
    backgroundColor: '#5f59e4',
    boxShadow: '0px 12px 20px rgba(0, 83, 214, 0.5)',
    transform: 'translateY(-3px)',
  },
});

const StyledTextField = styled(TextField)({
  '& .MuiOutlinedInput-root': {
    boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.1)',
  },
  '& .MuiInputLabel-root': {
    fontSize: '14px',
  },
});

export function LoginPage(){
// const AdminPage = () => {


  const [snackPopup, setSnackPopup] = React.useState({
    open: false,
    vertical: 'top',
    horizontal: 'center',
    message :""
  });
  const { vertical, horizontal, open } = snackPopup;

  const navigate= useNavigate()
  const handleClose = () => {
    setSnackPopup({ ...snackPopup, open: false });
  };
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      remember: false,
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email('Invalid email address')
        .required('Email is Required'),
      password: Yup.string()
        .required('Password is Required'),
    }),
    onSubmit: (values) => {
      // Handle form submission logic here
      // console.log('Form Values:', values);
      handleLoginSubmit(values);
    },
  });

  const handleLoginSubmit = (data) => {
    console.log("Login Data--->",data)
    loginAPI(data).then((response) => {
      console.log("Success-->", response?.data);

      if(response?.data?.status){
        const responseData = response?.data
        navigate('/admin/dashboard',{state: responseData})
      }
      if(response?.data?.status === false){
       const falseResponse =  response?.data?.message    
    //    setSnackPopup({ ...snackPopup, open: true, message :response?.data?.message });
    //  setTimeout(()=>handleClose(),3000)

    toast.error(response?.data?.message)
      }
    })
    .catch((error) => {
      console.log("error-->", error);
    })
  }

  return (
    <Box sx={{ display: 'flex', height: '100vh' }}>
<ToastContainer />
      {/* Left Side: Background Image with Branding */}
      <Box
        sx={{
          flex: 1,
          backgroundImage: 'url(https://ttdc.skeintech.com/static/media/bgimg-1.9357b731d5009007d44d.jpg)', // Replace with your image URL
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          color: 'white',
          padding: 4,
        }}
      />
      {/* Right Side: Login Form */}
      <Box
        component={Paper}
        elevation={6}
        sx={{
          flex: 1,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '40px',
          borderRadius: '0',
        }}
      > 
    
        <Box sx={{ width: '80%', maxWidth: 400 }}>
          <Typography 
            className='Title' 
            component="h1" 
            variant="h5" 
            align="center" 
            gutterBottom 
            sx={{ fontFamily: 'Montserrat', fontWeight: '600', fontSize: '25px' }}
          >
            Login
          </Typography>

          <Box component="form" onSubmit={formik.handleSubmit} sx={{ mt: 3 }}>
            <StyledTextField
              className="EmailId"
              margin="normal"
              required
              fullWidth
              label="Email id"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
              autoComplete="email"
              autoFocus
              variant="outlined"
            />
            <StyledTextField
              margin="normal"
              required
              fullWidth
              label="Password"
              type="password"
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
              autoComplete="current-password"
              variant="outlined"
            />

            <Link href="#" variant="body2" sx={{ display: 'block', textAlign: 'right', mt: 1 }}>
              Forgot Password?
            </Link>

            <Box sx={{ display: 'flex', alignItems: 'center', mt: 2, mb: 2 }}>
              <Checkbox 
                name="remember" 
                color="primary" 
                checked={formik.values.remember} 
                onChange={formik.handleChange} 
              />
              <Typography variant="body2">Remember Me</Typography>
            </Box>

            <StyledButton type="submit" fullWidth variant="contained">
              Login
            </StyledButton>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

// export default AdminPage;
