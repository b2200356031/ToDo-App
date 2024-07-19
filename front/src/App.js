import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignIn from './components/SignIn';
import Layout from './components/Layout';
import Register from './components/SignUp';
import Logout from './components/Logout';
import Home from './components/Home';
import Todo from './components/Todo';
import Filter from './components/Filter';
import PrivateRoute from './components/PrivateRoute';
import PublicRoute from './components/PublicRoute'; 


function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/login" element={<PublicRoute><SignIn /> </PublicRoute>} />
          <Route path="/register" element={ <PublicRoute><Register /></PublicRoute>} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/" element={<Home />} />
          <Route path="/todo"element= {<PrivateRoute> <Todo /></PrivateRoute>}/>
          <Route path="/filter" element={ <PrivateRoute> <Filter /> </PrivateRoute>}/>
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
