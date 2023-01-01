import React, { useState } from 'react';
import '../css/read.css';
import useAuth from '../hooks/useAuth';
import moment from '../api/moment';
import { applicant, exchange } from '../models';

const URL_BUCKET = 'http://localhost:3000/companys';

const ReadMoreReadLess = ({ limit, job }) => {
  const { auth } = useAuth();

  const ad = job.no_advertisement;

  const [isReadMoreShow, setIsReadMoreShow] = useState(false);
  const [isShown, setIsShown] = useState(false);
  const [message, setMessage] = useState('');
  const [first, setFirst] = useState('');
  const [last, setLast] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const toggleBtn = () => {
    setIsReadMoreShow((prevState) => !prevState);
  };

  const handleClick = (event) => {
    setIsShown((current) => !current);
  };

  const reset = () => {
    setFirst('');
    setLast('');
    setEmail('');
    setPhone('');
    setMessage('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (auth?.no_user) {
      try {
        await applicant(ad, auth?.no_user, message);
        reset();
        handleClick();
      } catch (err) {
        console.log(err);
      }
    } else {
      try {
        await exchange(first, last, email, phone, message, ad);
        reset();
        handleClick();
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <div className="read-more-read-less">
      <div>
        <div className="details__top">
          <img src={`${URL_BUCKET}/${job.logo}`} alt="" />
          <div>
            <h1>{job.company}</h1>
          </div>
          <button>
            {job.statut ? 'Available' : "Too late, sorry isn't available"}
          </button>
        </div>

        <div className="job__details">
          <div className="about__job">
            <div>
              <h6>
                {moment(job.date_posted).fromNow()} - {job.job_hour_price}
                Euro/heure
              </h6>
              <h1>
                {job.job_title} - {job.job_type}
              </h1>
              <span>{job.company_address}</span>
            </div>
            <button className="btn" onClick={handleClick}>
              {isShown ? 'Close' : 'Apply'}
            </button>
          </div>
        </div>
      </div>
      {isShown && (
        <div>
          <form
            name="mon-formulaire1"
            onSubmit={handleSubmit}
            className="container"
          >
            <div className="mb-3 p-2 w-50">
              <label htmlFor="exampleFormControlInput1" className="form-label">
                Nom(s)
              </label>
              <input
                type="text"
                defaultValue={auth?.first ? auth?.first : first}
                onChange={(e) => {
                  setFirst(e.target.value);
                }}
                className="form-control"
                id="exampleFormControlInput1"
                placeholder="first name"
              />
            </div>
            <div className="mb-3 p-2 w-50">
              <label htmlFor="exampleFormControlInput2" className="form-label">
                Prénom(s)
              </label>
              <input
                type="text"
                defaultValue={auth?.last ? auth?.last : last}
                onChange={(e) => {
                  setLast(e.target.value);
                }}
                className="form-control"
                id="exampleFormControlInput2"
                placeholder="last name"
              />
            </div>

            <div className="mb-3 p-2 w-50">
              <label htmlFor="exampleFormControlInput3" className="form-label">
                Email address
              </label>
              <input
                type="email"
                defaultValue={auth?.email ? auth?.email : email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                className="form-control"
                id="exampleFormControlInput3"
                placeholder="name@example.com"
              />
            </div>
            <div className="mb-3 p-2 w-50">
              <label htmlFor="exampleFormControlInput4" className="form-label">
                Phone
              </label>
              <input
                type="text"
                defaultValue={auth?.phone ? auth?.phone : phone}
                onChange={(e) => {
                  setPhone(e.target.value);
                }}
                className="form-control"
                id="exampleFormControlInput4"
                placeholder="+336987898734"
              />
            </div>
            <div className="mb-3 p-2 w-100">
              <label
                htmlFor="exampleFormControlTextarea1"
                className="form-label"
              >
                Vos motivations :
              </label>
              <textarea
                className="form-control"
                id="exampleFormControlTextarea1"
                onChange={(e) => setMessage(e.target.value)}
                rows="3"
                cols="40"
                defaultValue={
                  message ? message : 'Vous pouvez saisir ici un message.'
                }
              ></textarea>
            </div>
            <p>
              <input type="submit" className="btn btn-info" value="Envoyer" />
            </p>
          </form>
        </div>
      )}
      {!isShown && (
        <div>
          {isReadMoreShow ? (
            <p className="job__desc">{job.job_desc}</p>
          ) : (
            <p className="job__desc">{job.job_desc.substr(0, limit) + '...'}</p>
          )}

          {isReadMoreShow ? (
            <div className="content">
              <div className="requirements">
                <h1>Requirements</h1>
                <ul className="requirement__item">
                  {job.requirements.split('.').map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>

              <div className="responsibility">
                <h1>What you will do ?</h1>
                <p>{job.responsibility}</p>

                <ol type="1" className="responsibility__item">
                  {job.responsability.split('.').map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ol>
              </div>
            </div>
          ) : null}
        </div>
      )}
      {!isShown && (
        <button className="btn" onClick={toggleBtn}>
          {isReadMoreShow ? 'Read Less' : 'Read More'}
        </button>
      )}
    </div>
  );
};

export default ReadMoreReadLess;
