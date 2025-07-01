import React from 'react';

const JobHeader = ({ title, company, location, date, salary }) => {
  return (
    <div className="job-header" data-cy="job-header">
      <h1 className="job-title" data-cy="job-title">{title}</h1>
      <div className="job-meta">
        <span className="job-date" data-cy="job-date">Date: {date}</span>
        <span className="job-company" data-cy="job-company">Company: {company}</span>
        <span className="job-location" data-cy="job-location">Location: {location}</span>
        {salary && <span className="job-salary" data-cy="job-salary">Salary: {salary}</span>}
      </div>
    </div>
  );
};

export default JobHeader; 