import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  faCheck,
  faTimes,
  faInfoCircle,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { register } from '../models';
import '../css/register.css';
import Navbar from '../components/Navbar';

const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const EMAIL_REGEX =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const Register = () => {
  const firstRef = useRef();
  const errRef = useRef();

  const navigate = useNavigate();
  //const location = useLocation();
  const from = (role) => {
    if (parseInt(role) === 0) return '/admin';
    if (parseInt(role) === 1) return '/recruiter';
    if (parseInt(role) === 2) return '/applicant';
    return '/';
  };

  const [first, setFirst] = useState('');
  const [last, setLast] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [matchpass, setMatchPass] = useState('');
  const [email, setEmail] = useState('');
  const [role] = useState('applicant');

  const [firstFocus, setFirstFocus] = useState(false);
  const [lastFocus, setLastFocus] = useState(false);
  const [phoneFocus, setPhoneFocus] = useState(false);
  const [passwordFocus, setPasswordFocus] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [validFirst, setValidFirst] = useState(false);
  const [validLast, setValidLast] = useState(false);
  const [validPhone, setValidPhone] = useState(false);
  const [validPassword, setValidPassword] = useState(false);
  const [validMatchpassword, setValidMatchPassword] = useState(false);
  const [validEmail, setValidEmail] = useState(false);

  const [errMsg, setErrMsg] = useState('');

  useEffect(() => {
    firstRef.current.focus();
  }, []);

  useEffect(() => {
    setValidFirst(USER_REGEX.test(first));
  }, [first]);

  useEffect(() => {
    setValidLast(USER_REGEX.test(last));
  }, [last]);

  useEffect(() => {
    setValidEmail(EMAIL_REGEX.test(email));
  }, [email]);

  useEffect(() => {
    setValidPassword(PWD_REGEX.test(password));
    setValidMatchPassword(password === matchpass);
  }, [password, matchpass]);

  useEffect(() => {
    setErrMsg('');
  }, [first, last, phone, password, matchpass]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const v1 = EMAIL_REGEX.test(email);
    const v2 = PWD_REGEX.test(password);

    if (!v1 || !v2 || !role) {
      setErrMsg('Invalid Entry');
      return;
    }

    try {
      await register({
        first,
        last,
        password,
        email,
        phone,
        role,
      });
      navigate(from(role), { replace: true });
    } catch (err) {
      if (!err.response) {
        setErrMsg('No Server Response');
      } else {
        setErrMsg('Registration Failed');
      }
      errRef.current.focus();
    }
  };

  return (
    <div className="formContainer">
      <Navbar />
      <div className="formWrapper">
        <span className="logo">Los Crakos Jobs</span>
        <p
          ref={errRef}
          className={errMsg ? 'errmsg' : 'offscreen'}
          aria-live="assertive"
        >
          {errMsg}
        </p>
        <span className="title">Register</span>
        <form onSubmit={handleSubmit}>
          <label htmlFor="first" className="label">
            Nom(s):
            <FontAwesomeIcon
              icon={faCheck}
              className={validFirst ? 'valid' : 'hide'}
            />
            <FontAwesomeIcon
              icon={faTimes}
              className={validFirst || !first ? 'hide' : 'invalid'}
            />
          </label>
          <input
            type="text"
            placeholder="Your name"
            id="first"
            ref={firstRef}
            onChange={(e) => setFirst(e.target.value)}
            value={first}
            aria-invalid={validFirst ? 'false' : 'true'}
            aria-describedby="firstnote"
            className="input"
            onFocus={() => setFirstFocus(true)}
            onBlur={() => setFirstFocus(false)}
          />
          <p
            id="firstnote"
            className={
              firstFocus && first && !validFirst ? 'instructions' : 'offscreen'
            }
          >
            <FontAwesomeIcon icon={faInfoCircle} />
            4 to 24 characters.
            <br />
            Must begin with a letter.
            <br />
            Letters, numbers, underscores, hyphens allowed.
          </p>

          <label htmlFor="last" className="label">
            Prénom(s):
            <FontAwesomeIcon
              icon={faCheck}
              className={validLast ? 'valid' : 'hide'}
            />
            <FontAwesomeIcon
              icon={faTimes}
              className={validLast || !last ? 'hide' : 'invalid'}
            />
          </label>
          <input
            type="text"
            placeholder="Your last name"
            id="last"
            onChange={(e) => setLast(e.target.value)}
            value={last}
            aria-invalid={validLast ? 'false' : 'true'}
            aria-describedby="lastnote"
            className="input"
            onFocus={() => setLastFocus(true)}
            onBlur={() => setLastFocus(false)}
          />
          <p
            id="lastnote"
            className={
              lastFocus && last && !validLast ? 'instructions' : 'offscreen'
            }
          >
            <FontAwesomeIcon icon={faInfoCircle} />
            4 to 24 characters.
            <br />
            Must begin with a letter.
            <br />
            Letters, numbers, underscores, hyphens allowed.
          </p>

          <label htmlFor="phone" className="label">
            Phone:
            <FontAwesomeIcon
              icon={faCheck}
              className={validEmail ? 'valid' : 'hide'}
            />
            <FontAwesomeIcon
              icon={faTimes}
              className={validPhone || !phone ? 'hide' : 'invalid'}
            />
          </label>
          <input
            type="text"
            placeholder="Your number"
            id="phone"
            className="input"
            onChange={(e) => setPhone(e.target.value)}
            value={phone}
            aria-invalid={validPhone ? 'false' : 'true'}
            aria-describedby="phonenote"
            onFocus={() => setPhoneFocus(true)}
            onBlur={() => setPhoneFocus(false)}
          />
          <p
            id="phonenote"
            className={
              phoneFocus && phone && !validPhone ? 'instructions' : 'offscreen'
            }
          >
            <FontAwesomeIcon icon={faInfoCircle} />
            example of valid phone
            <br />
            +331029304930
            <br />
            0034239834038
          </p>

          <label htmlFor="email" className="label">
            Email:
            <FontAwesomeIcon
              icon={faCheck}
              className={validEmail ? 'valid' : 'hide'}
            />
            <FontAwesomeIcon
              icon={faTimes}
              className={validEmail || !email ? 'hide' : 'invalid'}
            />
          </label>
          <input
            type="email"
            placeholder="email"
            id="email"
            className="input"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            aria-invalid={validEmail ? 'false' : 'true'}
            aria-describedby="emailnote"
            onFocus={() => setEmailFocus(true)}
            onBlur={() => setEmailFocus(false)}
          />
          <p
            id="emailnote"
            className={
              emailFocus && email && !validEmail ? 'instructions' : 'offscreen'
            }
          >
            <FontAwesomeIcon icon={faInfoCircle} />
            example of valid email
            <br />
            my.ownsite@ourearth.org
            <br />
            mysite@you.me.net
          </p>

          <label htmlFor="password" className="label">
            Password:
            <FontAwesomeIcon
              icon={faCheck}
              className={validPassword ? 'valid' : 'hide'}
            />
            <FontAwesomeIcon
              icon={faTimes}
              className={validPassword || !password ? 'hide' : 'invalid'}
            />
          </label>
          <input
            type="password"
            placeholder="password"
            id="password"
            className="input"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            aria-invalid={validPassword ? 'false' : 'true'}
            aria-describedby="pwdnote"
            onFocus={() => setPasswordFocus(true)}
            onBlur={() => setPasswordFocus(false)}
          />

          <p
            id="pwdnote"
            className={
              passwordFocus && !validPassword ? 'instructions' : 'offscreen'
            }
          >
            <FontAwesomeIcon icon={faInfoCircle} />
            8 to 24 characters.
            <br />
            Must include uppercase and lowercase letters, a number and a special
            character.
            <br />
            Allowed special characters:{' '}
            <span aria-label="exclamation mark">!</span>{' '}
            <span aria-label="at symbol">@</span>{' '}
            <span aria-label="hashtag">#</span>{' '}
            <span aria-label="dollar sign">$</span>{' '}
            <span aria-label="percent">%</span>
          </p>

          <label htmlFor="matchpass" className="label">
            Repeat password:
            <FontAwesomeIcon
              icon={faCheck}
              className={validMatchpassword && matchpass ? 'valid' : 'hide'}
            />
            <FontAwesomeIcon
              icon={faTimes}
              className={
                validMatchpassword || !validMatchpassword ? 'hide' : 'invalid'
              }
            />
          </label>
          <input
            type="password"
            placeholder="repeat password"
            className="input"
            onChange={(e) => setMatchPass(e.target.value)}
            value={matchpass}
            aria-invalid={validMatchpassword ? 'false' : 'true'}
            aria-describedby="confirmnote"
            onFocus={() => setMatchFocus(true)}
            onBlur={() => setMatchFocus(false)}
          />

          <p
            id="confirmnote"
            className={
              matchFocus && !validMatchpassword ? 'instructions' : 'offscreen'
            }
          >
            <FontAwesomeIcon icon={faInfoCircle} />
            Must match the first password input field.
          </p>

          <button
            className="signIn"
            disabled={!validEmail || !validPassword ? true : false}
          >
            Register
          </button>
        </form>
        <p>
          You do have an account ? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
