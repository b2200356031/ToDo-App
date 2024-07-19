import  { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Remove the token from localStorage
    localStorage.removeItem('jwtToken');
    // Redirect to the login page
    navigate('/login');
    window.location.reload()
  }, [navigate]);

  return null;
};

export default Logout;
