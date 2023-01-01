import React, { useState } from 'react';

const Card = ({ limit, app }) => {
  console.log(app);
  const [isReadMoreShow, setIsReadMoreShow] = useState(false);

  const toggleBtn = () => {
    setIsReadMoreShow((prevState) => !prevState);
  };

  return (
    <div className="read-more-read-less">
      <div className="">
        <div className="details__top"></div>

        <div className="job__details">
          <div className="about__job">
            <div>
              <h1>
                {app.job_title} - {app.job_type} - {app.company}
              </h1>
              <span>
                {app.statut
                  ? 'Wait response'
                  : "Sorry, if aren't received an email for enterprise..."}
              </span>
            </div>
          </div>
        </div>
        <div>
          {isReadMoreShow ? (
            <p className="job__desc">{app.motivation}</p>
          ) : (
            <p className="job__desc">
              {app.motivation.substr(0, limit) + '...'}
            </p>
          )}
        </div>
      </div>
      {app.motivation.length > limit ? (
        <button className="btn" onClick={toggleBtn}>
          {isReadMoreShow ? 'Read Less' : 'Read More'}
        </button>
      ) : null}
    </div>
  );
};

export default Card;
