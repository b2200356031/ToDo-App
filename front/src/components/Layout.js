import React, { useState, useEffect } from 'react';
import { Link as RouterLink, Outlet } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';

const Layout = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('jwtToken');
    setIsAuthenticated(!!token);
  }, []);

  return (
    <>
      <AppBar position="static">
        <Toolbar>

          <Box sx={{ flexGrow: 1 }}>
          {!isAuthenticated ? (
              <>
                <Button color="inherit" component={RouterLink} to="/">
              Home
            </Button>
              </>
            ) : (
              <>
              <Button color="inherit" component={RouterLink} to="/todo">
                ToDo
              </Button>
              <Button color="inherit" component={RouterLink} to="/filter">
                Filter
              </Button>
              </>
            )}
            
          </Box>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            ToDo
          </Typography>
          <Box>
            {!isAuthenticated ? (
              <>
                <Button color="inherit" component={RouterLink} to="/login">
                  Login
                </Button>
                <Button color="inherit" component={RouterLink} to="/register">
                  Register
                </Button>
              </>
            ) : (
              <Button color="inherit" component={RouterLink} to="/logout">
                Logout
              </Button>
            )}
          </Box>
        </Toolbar>
      </AppBar>
      <Container component="main" sx={{ mt: 4 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          {children}
          <Outlet />
        </Box>
      </Container>
    </>
  );
};

export default Layout;