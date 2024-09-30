import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import {
  Box,
  CssBaseline,
  Grid,
  TextField,
  Button,
  Typography,
  Paper,
  Avatar,
  Card,
  CardContent,
  CardMedia,
  Divider,
  CircularProgress
} from "@mui/material";
import Sidebar from "../Sidebar";
import AppBarView from "../AppBarView";
import AddLocationIcon from "@mui/icons-material/AddLocation";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export function AddEvent() {
  const location = useLocation();
  const locationData = location?.state?.card;
  const locationDataPdf = location?.state?.pdfUrl;
  console.log(locationDataPdf);

  const parms = useParams();
  const [file, setFile] = useState(null);
  const [pdfFile, setPdfFile] = useState(null);
  const [dummyState, setDummyState] = useState(false);
  const [dummyStatePdf, setDummyStatePdf] = useState(false);
  const [loading, setLoading] = useState(false); // <-- Add state for loader

  const navigate = useNavigate();

  useEffect(() => {
    if (parms && locationData) {
      handleConvertToFile();
      handleConvertPdfFile();
    }
  }, [parms, locationData]);

  const handleConvertToFile = async () => {
    try {
      const response = await fetch(locationData?.image_url);
      if (!response.ok) throw new Error("Failed to fetch image");

      const blob = await response.blob();
      const newFile = new File([blob], "image.png", { type: blob.type });
      setFile(newFile);
    } catch (error) {
      console.error("Error fetching and converting image:", error);
    }
  };

  const handleConvertPdfFile = async () => {
    try {
      const response = await fetch(locationDataPdf);
      if (!response.ok) throw new Error("Failed to fetch image");

      const blob = await response.blob();
      const newFile = new File([blob], "content.pdf", { type: blob.type });
      setPdfFile(newFile);
    } catch (error) {
      console.error("Error fetching and converting image:", error);
    }
  };
  const initialValues = {
    placeName: parms && locationData ? locationData.title : "",
    image: null,
    pdf: null,
    description: parms && locationData ? locationData.subtitle : ""
  };

  const validationSchema = Yup.object({
    placeName: Yup.string().required("Required"),
    description: Yup.string().required("Required")
  });

  // const handleSubmit = async (values) => {
  //   console.log(values);

  //   const formData = new FormData();
  //   formData.append('placeName', values.placeName);
  //   formData.append('description', values.description);
  //   formData.append('image', values.image);
  //   formData.append('pdf', values.pdf);

  //   for (let [key, value] of formData.entries()) {
  //     console.log(`${key}: ${value instanceof File ? value.name : value}`);
  //   }

  //   if(parms && locationData){

  //   }
  //   else{
  //     let Addpayload ={
  //       PlaceName: values?.placeName,
  //       PlaceDescription:values?.description,
  //       TypeId: null,
  //       Address:null,
  //       city:null,
  //       Image:values?.image,
  //       pdf :null

  //     }
  //     console.log(values.image);

  //     axios.post(`https://demo.emeetify.com:81/tourism/places/createAdminEvent`,Addpayload)
  //     .then((response)=>{
  //       console.log(response?.data);

  //     }).catch((error)=>{
  //       console.log(error);

  //     })
  //   }
  //   try {
  //     console.log('Payload:', formData);
  //   } catch (error) {
  //     console.error('Error:', error);
  //   }
  // };

  const handleSubmit = async (values) => {
    console.log(values.pdf);
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("PlaceName", values.placeName);
      formData.append("PlaceDescription", values.description);
      formData.append("Address", null);
      formData.append("TypeId", 4);
      formData.append("city", null);
      formData.append("pdf", values?.pdf);

      if (values.image) {
        formData.append("Image", values.image);
      }

      if (parms && locationData) {
        const id = locationData?.buttons?.[0]?.payload;
        const numberId = id.slice(4);
        console.log(numberId);
        axios
          .put(
            `https://demo.emeetify.com:81/tourism/places/eventupdate/${numberId}`,
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data"
              }
            }
          )
          .then((response) => {
            console.log(response);
            if (response?.data?.status) {
              setLoading(false);
              toast.success(response.data.message);

              setTimeout(() => toast.success(response.data.message), 3000);
              navigate("/admin/events");
            }
            if (response?.data?.status === false) {
              toast.error(response?.data?.message);
            }
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        const response = await axios.post(
          `https://demo.emeetify.com:81/tourism/places/createAdminEvent`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data"
            }
          }
        );
        console.log(response.data);
        if (response?.data?.status) {
          toast.success(response.data.message);

          setTimeout(() => toast.success(response.data.message), 3000);
          navigate("/admin/events");
        }
        if (response?.data?.status === false) {
          toast.error(response?.data?.message);
        }
      }
    } catch (error) {
      console.error("Error during form submission:", error);
    }
  };

  const handleCancel = (resetForm) => {
    resetForm();
    console.log("Form cancelled");
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Sidebar />
      <AppBarView />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          bgcolor: "background.default",
          p: 3,
          marginTop: 8,
          minHeight: "100vh"
        }}
      >
        <ToastContainer />

        <Paper
          elevation={4}
          style={{
            padding: "30px",
            borderRadius: "9px",
            margin: "0 auto",
            backgroundColor: "#ffffff"
          }}
        >
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            mb={5}
          >
            <Typography
              variant="h6"
              style={{ fontWeight: 600, color: "#3f51b5" }}
            >
              {parms && locationData ? "Edit Event" : "Add Event"}
            </Typography>
          </Box>

          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ setFieldValue, resetForm, values, touched, errors }) => {
              if (parms && locationData && !dummyState) {
                values.image = file;
              }
              if (parms && locationDataPdf && !dummyStatePdf) {
                values.pdf = pdfFile;
              }

              return (
                <Form>
                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                      <Field
                        as={TextField}
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        label="Place Name"
                        name="placeName"
                        autoFocus
                        error={touched.placeName && Boolean(errors.placeName)}
                        helperText={<ErrorMessage name="placeName" />}
                        InputProps={{
                          style: {
                            borderRadius: "10px",
                            padding: "0px 8px",
                            fontSize: "14px",
                            height: "45px"
                          }
                        }}
                        sx={{ mb: 2 }}
                      />
                      <Field
                        as={TextField}
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        label="Description"
                        name="description"
                        multiline
                        rows={4}
                        error={
                          touched.description && Boolean(errors.description)
                        }
                        helperText={<ErrorMessage name="description" />}
                        InputProps={{
                          style: {
                            borderRadius: "10px"
                          }
                        }}
                      />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <input
                        accept="image/*"
                        style={{ display: "none" }}
                        id="image-upload"
                        type="file"
                        onChange={(event) => {
                          const files = event.currentTarget.files[0];
                          setFile(files);
                          setDummyState(true);
                          setFieldValue("image", files);
                        }}
                      />
                      <label htmlFor="image-upload">
                        <Button
                          variant="contained"
                          component="span"
                          fullWidth
                          sx={{
                            backgroundColor: "#5f59e4",
                            color: "#fff",
                            mt: 2,
                            borderRadius: "9px",
                            width: "150px",
                            "&:hover": {
                              backgroundColor: "#4038a0"
                            }
                          }}
                        >
                          Upload Image
                        </Button>
                      </label>

                      {values?.image && (
                        <Card
                          elevation={4}
                          sx={{
                            mt: 3,
                            borderRadius: "10px",
                            overflow: "hidden",
                            position: "relative"
                          }}
                        >
                          <CardContent>
                            <Typography
                              variant="p"
                              gutterBottom
                              sx={{
                                fontFamily: "Montserrat",
                                fontWeight: "bold",
                                color: "#3f51b5",
                                fontSize: "1.2rem"
                              }}
                            >
                              Preview image:
                            </Typography>
                            <Divider sx={{ mb: 1 }} />
                            <CardMedia
                              className="CardMediaImage"
                              component="img"
                              src={
                                values.image instanceof File
                                  ? URL.createObjectURL(values.image)
                                  : locationData?.image_url
                              }
                              alt="Selected"
                              sx={{
                                maxHeight: "200px",
                                borderRadius: "10px",
                                border: "2px solid #3f51b5",
                                transition: "transform 0.2s",
                                "&:hover": {
                                  transform: "scale(1.05)"
                                }
                              }}
                            />
                            <Typography
                              variant="body2"
                              mt={1}
                              sx={{
                                fontFamily: "Montserrat",
                                fontWeight: "medium",
                                color: "#555",
                                fontSize: "0.875rem"
                              }}
                            >
                              Selected File:{" "}
                              <strong>
                                {values.image instanceof File
                                  ? values.image.name
                                  : "No file selected"}
                              </strong>
                            </Typography>
                          </CardContent>
                        </Card>
                      )}

                      <input
                        accept="application/pdf"
                        style={{ display: "none" }}
                        id="pdf-upload"
                        type="file"
                        onChange={(event) => {
                          const file = event.currentTarget.files[0];
                          setPdfFile(file);
                          setDummyStatePdf(true);
                          setFieldValue("pdf", file);
                        }}
                      />
                      <label htmlFor="pdf-upload" className="PDFLabel">
                        <Button
                          variant="contained"
                          component="span"
                          fullWidth
                          sx={{
                            backgroundColor: "#5f59e4",
                            color: "#fff",
                            mt: 2,
                            borderRadius: "9px",
                            width: "150px",
                            "&:hover": {
                              backgroundColor: "#4038a0"
                            }
                          }}
                        >
                          Upload PDF
                        </Button>
                      </label>

                      {values.pdf && (
                        <Card>
                             {/* <CardMedia
                              className="CardMediaImage"
                              component="iframe"
                              src={
                                values.pdf instanceof File
                                  ? URL.createObjectURL(values.pdf)
                                  : `${locationDataPdf}`
                              }
                              alt="Selected"
                              sx={{
                                maxHeight: "200px",
                                borderRadius: "10px",
                                border: "2px solid #3f51b5",
                                transition: "transform 0.2s",
                                "&:hover": {
                                  transform: "scale(1.05)"
                                }
                              }}
                            /> */}
                          <Typography
                            variant="body2"
                            mt={2}
                            sx={{
                              fontFamily: "Montserrat",
                              fontWeight: "medium",
                              color: "#555",
                              fontSize: "0.875rem"
                            }}
                          >
                            Selected PDF: <strong>{values.pdf.name}</strong>
                          </Typography>
                        </Card>
                      )}
                    </Grid>
                  </Grid>

                  <Grid container spacing={3} mt={2} className="allign-btn">
                    <Grid item xs={12} sm={2}>
                      <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        disabled={loading}
                        sx={{
                          backgroundColor: "#5f59e4",
                          color: "#fff",
                          mt: 2,
                          borderRadius: "9px",
                          // height: '45px',
                          "&:hover": {
                            backgroundColor: "#4038a0"
                          }
                        }}
                      >
                        {loading ? (
                          <CircularProgress size={24} sx={{ color: " #5f58f1" }} />
                        ) : (
                          "Submit"
                        )}

                        {/* Submit */}
                      </Button>
                    </Grid>

                    <Grid item xs={4} sm={2}>
                      <Button
                        type="button"
                        fullWidth
                        variant="contained"
                        sx={{
                          backgroundColor: "#f44336",
                          color: "#fff",
                          mt: 2,
                          borderRadius: "9px",
                          // height: '45px',
                          "&:hover": {
                            backgroundColor: "#d32f2f"
                          }
                        }}
                        onClick={() => handleCancel(resetForm)}
                      >
                        Cancel
                      </Button>
                    </Grid>
                  </Grid>
                </Form>
              );
            }}
          </Formik>
        </Paper>
      </Box>
    </Box>
  );
}

// export default AddEvent;
