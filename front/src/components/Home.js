import React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

const Home = () => {
  return (
    <Box sx={{ textAlign: 'center', mt: 4 }}>
      <Typography variant="h2" component="h1" gutterBottom>
        Welcome to MyApp
      </Typography>
      <Typography variant="h5" component="h2" gutterBottom>
        This is the home page of the application.
      </Typography>
      <Typography variant="body1">
        Use the navigation bar to sign in or register.
      </Typography>
    </Box>
  );
};

export default Home;
