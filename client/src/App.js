import React from 'react';
import Register from './pages/Register';
import Login from './pages/Login';
import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './components/Home';
import Lounge from './components/Lounge';
import Admin from './components/Admin';
import Users from './pages/Users';
import Missing from './components/Missing';
//import RequiredAuth from './components/RequiredAuth';
import UserProfile from './components/UserProfile';
import Advertisements from './pages/Advertisements';
import useAuth from './hooks/useAuth';
import Apply from './components/Apply';

function App() {
  const { auth } = useAuth();
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* public routes */}
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="/" element={<Home />} />

        <Route
          path="admin"
          element={auth ? auth?.role ? <Admin /> : <Missing /> : <Missing />}
        />
        <Route
          path="admin/users"
          element={auth ? auth?.role ? <Users /> : <Missing /> : <Missing />}
        />
        <Route
          path="advertisements"
          element={
            auth ? auth?.role ? <Advertisements /> : <Missing /> : <Missing />
          }
        />

        {/* we want to protect these routes */}

        <Route
          path="applicant"
          element={auth ? !auth?.role ? <Lounge /> : <Missing /> : <Missing />}
        />
        <Route
          path="profile/:no_user"
          element={
            auth ? !auth?.role ? <UserProfile /> : <Missing /> : <Missing />
          }
        />
        <Route
          path="apply"
          element={auth ? !auth?.role ? <Apply /> : <Missing /> : <Missing />}
        />

        {/* catch all */}
        <Route path="*" element={<Missing />} />
      </Route>
    </Routes>
  );
}

export default App;
