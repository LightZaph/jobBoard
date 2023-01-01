import React from 'react';
//import { Link } from 'react-router-dom';
import twitter from '../../assets/twitter.png'

const JobDetails = (props) => {


  return (
    <div id='timeline'>
      <a href="/">
        <li className="listing ">
          <div className="image_wrapper">
            <img src={twitter} alt="Twitter"/>
          </div>
          <div className="info">
            <span className="job_title">UX Designer</span>
            <span className="job_info">Twitter <span>&bull;</span>Paris <span>&bull;</span>1er octobre</span>
            <p className="content">Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis tempore iste totam. Cupiditate quibusdam quidem ullam maxime recusandae labore voluptatum nesciunt fugiat. Nisi consectetur explicabo aspernatur non, commodi dignissimos velit at minima quibusdam reiciendis? Excepturi sed consequatur unde, autem, similique ipsum nobis quae maxime officiis reiciendis suscipit iure fugiat rem.</p>
            
          </div>
        </li>
      </a>
    </div>
  );
};

export default JobDetails;
