import React, { useEffect, useState } from 'react';
import useAuth from '../hooks/useAuth';
import { getApp } from '../models';
import ApplicantNav from './ApplicantNav';
import Card from './Card';

const Apply = () => {
  const { auth } = useAuth();

  const [app, setApp] = useState([]);

  useEffect(() => {
    fetchApp();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchApp = async () => {
    const applicants = await getApp(auth?.no_user);
    setApp(applicants.data);
  };

  return (
    <div className="wrapper">
      <ApplicantNav />
      {app.map((ap, index) => (
        <Card limit={50} app={ap} key={index} />
      ))}
    </div>
  );
};

export default Apply;
