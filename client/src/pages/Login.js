import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

import '../css/login.css';
import useAuth from '../hooks/useAuth';
import { login } from '../models';

const Login = () => {
  const { setAuth } = useAuth();
  const userRef = useRef();
  const errRef = useRef();

  const navigate = useNavigate();

  //location.state?.from?.pathname || "/"
  const [user, setUser] = useState('');
  const [pwd, setPwd] = useState('');
  const [errMsg, setErrMsg] = useState('');

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg('');
  }, [user, pwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await login(user, pwd);
      const no_user = response.data.no_user;
      const first = response.data.first;
      const phone = response.data.phone;
      const last = response.data.last;
      const access_token = response.data.token;
      const email = user;
      setAuth({
        no_user,
        first,
        last,
        email,
        phone,
        password: pwd,
        access_token,
        role: response.data.role,
        login: true,
      });
      setUser('');
      setPwd('');
      if (response.data.role) navigate('/admin', { replace: true });
      else navigate('/applicant', { replace: true });
    } catch (err) {
      if (!err.response) {
        setErrMsg('No Server Response');
      } else if (err.response.status === 400) {
        setErrMsg('Missing Username or Password');
      } else if (err.response.status === 401) {
        setErrMsg('Wrong password and username!');
      } else if (err.response.status === 404) {
        setErrMsg('User Not Found!');
      } else {
        setErrMsg('Login Failed');
      }
      errRef.current.focus();
    }
  };

  return (
    <div className="formContainerLogin">
      <Navbar />
      <div className="formWrapperLogin">
        <span className="logo">Los Crakos Jobs</span>
        <span className="title">Login</span>
        <p
          ref={errRef}
          className={errMsg ? 'errmsg logRed' : 'offscreen logRed'}
          aria-live="assertive"
        >
          {errMsg}
        </p>
        <form className="form" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="email"
            className="user"
            required
            ref={userRef}
            onChange={(e) => setUser(e.target.value)}
            value={user}
          />
          <input
            type="password"
            placeholder="password"
            className="user"
            required
            onChange={(e) => setPwd(e.target.value)}
            value={pwd}
          />
          <button className="sign">Sign in!</button>
        </form>
        <p className="logRed">
          You do have an account ?<Link to="/register">Register</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
