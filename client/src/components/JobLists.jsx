import React, { useEffect, useState } from 'react';
import { getAds } from '../models/index';
import ReadMoreReadLess from './ReadMoreLess';
import '../css/job.css';

const JobLists = () => {
  const [jobData, setJobData] = useState([]);

  useEffect(() => {
    fetchAds();
  }, []);

  const fetchAds = async () => {
    const advertisements = await getAds();
    setJobData(advertisements.data);
  };

  return (
    <div className="container">
      {jobData.map((job, index) => (
        <ReadMoreReadLess limit={100} job={job} key={index} />
      ))}
    </div>
  );
};

export default JobLists;
