import React, { useState } from 'react';
import { Box, Container, DialogActions, FormControl, FormHelperText, InputLabel, OutlinedInput, TextField, Typography } from '@mui/material';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { LoadingButton } from '@mui/lab';
import theme from 'src/themes/theme';

export default function Login() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  // form validation schema
  const validationSchema = yup.object().shape({
    username: yup.string()
      .max(25, 'Too Long!')
      .required('Please enter your name'),
    password: yup.string()
      .min(8, 'Password must be at least 8 characters')
      .required('Please enter your password'),
  });

  // formik hook
  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      submitLogin(values);
    },
  });

  // async function submit form 
  const submitLogin = async (values) => {
    setLoading(true);
    
    // try {
    //   const response = await fetch('/api/login', {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify(values),
    //   });

    //   const data = await response.json();

    //   if (data.error) {
    //     setError(data.error);
    //   }
    //   else {
    //     window.location.href = '/';
    //   }
    // } catch (error) {
    //   setError(error);
    // }
    setLoading(false);
  }

  return (
    <Box>
      <Container>
        <Box
          pt={10}
          pb={10}
          sx={{
            maxWidth: '500px',
            width: '100%',
            margin: '0 auto',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Typography component="h3" variant='h3' mb={1}>Login</Typography>
          <Typography component="p" variant='p' mb={2}>Please login for continue shopping</Typography>
          <form onSubmit={formik.handleSubmit} style={{width: '100%'}}>
            <FormControl error={formik.touched.username && Boolean(formik.errors.username)} fullWidth margin="dense">
              <InputLabel htmlFor="username">Username</InputLabel>
              <OutlinedInput
                autoFocus
                margin="dense"
                id="username"
                type="text"
                fullWidth
                name="username"
                label="Username"
                value={formik.values.username}
                onChange={formik.handleChange}
                aria-describedby="username-error-text"
                error={formik.touched.username && Boolean(formik.errors.username)}
              />
              {
                formik.touched.username && formik.errors.username && (
                  <FormHelperText id="name-error-text">{formik.errors.username}</FormHelperText>
                )
              }
            </FormControl>
            <FormControl error={formik.touched.password && Boolean(formik.errors.password)} fullWidth margin="dense">
              <InputLabel htmlFor="password">Password</InputLabel>
              <OutlinedInput
                margin="dense"
                id="password"
                type="password"
                fullWidth
                name="password"
                label="Password"
                value={formik.values.password}
                onChange={formik.handleChange}
                aria-describedby="password-error-text"
                error={formik.touched.password && Boolean(formik.errors.password)}
              />
              {
                formik.touched.password && formik.errors.password && (
                  <FormHelperText id="password-error-text">{formik.errors.password}</FormHelperText>
                )
              }
            </FormControl>
            <DialogActions sx={{flexDirection: 'column', justifyContent: 'flex-end', alignItems: 'flex-end'}}>
              <LoadingButton variant='contained' type="submit" loading={loading}>Submit</LoadingButton>
              {
                error && (
                  <Typography variant="body1" color="error" component="p" mt={1}>Something was wrong, please try again!</Typography>
                )
              }
            </DialogActions>
          </form>
        </Box>
      </Container>
    </Box>
  );
};