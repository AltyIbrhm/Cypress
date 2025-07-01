import React from 'react';

const JobDescription = ({ description, responsibilities, requirements, niceToHave }) => {
  return (
    <div className="job-description" data-cy="job-description">
      <div className="description-text" data-cy="description-text">
        {description}
      </div>
      
      <div className="responsibilities" data-cy="responsibilities">
        <h3>Key Responsibilities:</h3>
        <ul>
          {responsibilities.map((responsibility, index) => (
            <li key={index} data-cy={`responsibility-${index}`}>{responsibility}</li>
          ))}
        </ul>
      </div>
      
      <div className="requirements" data-cy="requirements">
        <h3>Required Skills & Qualifications:</h3>
        <ul>
          {requirements.map((requirement, index) => (
            <li key={index} data-cy={`requirement-${index}`}>{requirement}</li>
          ))}
        </ul>
      </div>
      
      {niceToHave && (
        <div className="nice-to-have" data-cy="nice-to-have">
          <h3>Nice to Have:</h3>
          <ul>
            {niceToHave.map((item, index) => (
              <li key={index} data-cy={`nice-to-have-${index}`}>{item}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default JobDescription; 