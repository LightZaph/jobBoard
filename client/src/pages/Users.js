import React, { useEffect, useState } from 'react';
import { Modal, ModalBody, ModalHeader } from 'reactstrap';
import Navbar from '../components/AdminNav';
import { deleteUser, getUsers, register } from '../models';

const Users = () => {
  const user_ = {
    no_user: null,
    first: null,
    last: null,
    password: null,
    email: null,
    phone: null,
  };

  const [user, setUser] = useState(user_);
  const [users, setUsers] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [refreshData, setRefreshData] = useState(false);

  const deleteItem = (no_user) => {
    let confirmDelete = window.confirm('Delete item forever?');
    if (confirmDelete) {
      deleteUser(no_user);
      refresh();
    }
  };

  const addItem = async () => {
    try {
      const { first, last, password, email, phone } = user;
      await register(first, last, password, email, phone, false);
      refresh();
      toggleModal();
    } catch (error) {
      console.log(error);
    }
  };

  const openModal = () => {
    setIsOpen((current) => !current);
  };

  const toggleModal = () => {
    setIsOpen((current) => !current);
  };

  const onInputChange = (e, name) => {
    if (e.target || e.target.value) {
      const val = (e.target && e.target.value) || '';
      let _user_ = { ...user };
      _user_[`${name}`] = val;
      setUser(_user_);
    }
  };

  const refresh = () => {
    setRefreshData((current) => !current);
  };

  const closeBtn = (
    <button className="close" onClick={toggleModal}>
      <i className="fa fa-close"></i>
    </button>
  );

  useEffect(() => {
    data();
  }, [refreshData]);

  const data = async () => {
    const users = await getUsers();
    setUsers(users.data);
  };

  return (
    <>
      <Navbar />
      <div className="read-more-read-less">
        <div className="d-flex flex-wrap justify-content-between text-center m-2 mb-5">
          <p className="fs-1 btn-light">CRUD Users</p>
          <button className="btn pt-0 pb-0" onClick={openModal}>
            ADD USER
          </button>
        </div>
        <table className="table rounded bg-white table-hover table-responsive">
          <thead className="text-center">
            <tr>
              <th scope="row">#</th>
              <th>Nom(s)</th>
              <th>Prénom(s)</th>
              <th>Email</th>
              <th>Contact</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {users.map((user, index) => {
              return (
                <tr key={index}>
                  <th scope="row">{index + 1}</th>
                  <td>{user.first}</td>
                  <td>{user.last}</td>
                  <td>{user.email}</td>
                  <td>{user.phone}</td>
                  <td>
                    <div className="d-flex justify-content-between">
                      <button
                        className="btn btn-danger"
                        onClick={() => deleteItem(user.no_user)}
                      >
                        Del
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <Modal isOpen={isOpen} toggle={toggleModal}>
        <ModalHeader close={closeBtn}>
          {user.no_user ? 'Edit Item' : 'Add Item'}
        </ModalHeader>
        <ModalBody>
          <div className="mb-3">
            <label htmlFor="first" className="form-label">
              Nom(s)
            </label>
            <input
              type="text"
              value={user.first === null ? '' : user.first}
              onChange={(e) => onInputChange(e, 'first')}
              className="form-control"
              id="first"
              placeholder="Nom(s)"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="last" className="form-label">
              Prénom(s)
            </label>
            <input
              type="text"
              className="form-control"
              value={user.last === null ? '' : user.last}
              onChange={(e) => onInputChange(e, 'last')}
              id="last"
              placeholder="Prénom(s)"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Mot de passe
            </label>
            <input
              type="password"
              className="form-control"
              value={user.password === null ? '' : user.password}
              onChange={(e) => onInputChange(e, 'password')}
              id="password"
              placeholder="Mot de passe"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              value={user.email === null ? '' : user.email}
              onChange={(e) => onInputChange(e, 'email')}
              className="form-control"
              id="email"
              placeholder="adresse de messagerie"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="phone" className="form-label">
              Contact
            </label>
            <input
              type="text"
              value={user.phone === null ? '' : user.phone}
              onChange={(e) => onInputChange(e, 'phone')}
              className="form-control"
              id="phone"
              placeholder="+33098483974"
            />
          </div>

          <button className="mt-3 btn btn-success" onClick={addItem}>
            Add
          </button>
        </ModalBody>
      </Modal>
    </>
  );
};

export default Users;
