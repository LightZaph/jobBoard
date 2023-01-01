import React, { useState } from 'react';
import { updateUser } from '../models';
import ApplicantNav from './ApplicantNav';

const UserProfile = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const [first, setFirst] = useState('');
  const [last, setLast] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let confirm = window.confirm(
        'Voulez-vous vraiment effectuer cette action ?'
      );

      if (confirm) {
        await updateUser(user?.no_user, first, last, password, email, phone);
        alert('mot de passe modifier');
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <ApplicantNav />

      <div className="wrapper">
        <div className="details__wrapper mt-5">
          <form name="mon-formulaire1" onSubmit={handleSubmit} method="get">
            <div className="mb-3">
              <label htmlFor="exampleFormControlInput1" className="form-label">
                Nom(s)
              </label>
              <input
                type="text"
                defaultValue={user?.first ? user?.first : first}
                onChange={(e) => {
                  setFirst(e.target.value);
                }}
                className="form-control"
                id="exampleFormControlInput1"
                placeholder="first name"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleFormControlInput2" className="form-label">
                Prénom(s)
              </label>
              <input
                type="text"
                defaultValue={user?.last ? user?.last : last}
                onChange={(e) => {
                  setLast(e.target.value);
                }}
                className="form-control"
                id="exampleFormControlInput2"
                placeholder="last name"
              />
            </div>

            <div className="mb-3">
              <label htmlFor="exampleFormControlInput3" className="form-label">
                Email address
              </label>
              <input
                type="email"
                defaultValue={user?.email ? user?.email : email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                className="form-control"
                id="exampleFormControlInput3"
                placeholder="name@example.com"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleFormControlInput4" className="form-label">
                Phone
              </label>
              <input
                type="text"
                defaultValue={user?.phone ? user?.phone : phone}
                onChange={(e) => {
                  setPhone(e.target.value);
                }}
                className="form-control"
                id="exampleFormControlInput4"
                placeholder="+330987898734"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleFormControlInput5" className="form-label">
                Modifier le mot de passe
              </label>
              <input
                type="text"
                defaultValue={user?.password ? user?.password : password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                className="form-control"
                id="exampleFormControlInput5"
                placeholder="Your password"
              />
            </div>
            <p>
              <input
                type="submit"
                className="btn btn-info"
                value="Mettre à jour"
              />
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default UserProfile;
