import React from 'react'

const Preview = ({data}) => {



  return (
    <div className='preview-info'>
        <h2>Preview</h2>
        {data.general.name ? (
            <h3>{data.general.name}</h3>
        ):(
            <h3>Name</h3>
        )}

        {data.general.position && <div><h4>{data.general.position}</h4></div>}
  
        <div className='info-contact'>
          {data.general.email && <div><p>{data.general.email}</p></div>}
          {data.general.number && <div><p>{data.general.number}</p></div>}
          {data.general.linkedin && <div><p>{data.general.linkedin}</p></div>}
        </div>
        {data.general.summary && <div><p>{data.general.summary}</p></div>}
    
        <h3>Education</h3>

         <div className="education-row">
          {data.education.school && <div className='pre-edu'><p>{data.education.school}</p></div>}
          {data.education.graduated && <div className='ed-date'><p>{data.education.graduated}</p></div>}
         </div>
          {data.education.degree && <div><p>{data.education.degree}</p></div>}
          {data.education.certifications &&
          data.education.certifications.length > 0 && (
            <div>
              <h4>Certifications</h4>
              <ul>
                {data.education.certifications.map((cert, index) => (
                  <li key={index}>{cert.name}</li>
                ))}
              </ul>
            </div>

          )}
    
        <h3>Experience</h3>
          {data.experience.jobs &&
          data.experience.jobs.length > 0 && (
            <div>
           
                {data.experience.jobs.map((job, index) => (
                  <div key={index} className="my-job">
                    <div className="job-header">
                      <p className="company">{job.company}</p>
                      <p className="job-dates">{job.start} — {job.end}</p>
                    </div>

                    <p className="job-position">{job.position}</p>
                    <p className="job-resp">{job.responsability}</p>
                  </div>

                  
                ))}
              
            </div>

          )}  




        <h3>Skills</h3>
          {data.skills.skills && data.skills.skills.length >0 && (
            <div>
              {data.skills.skills.map((skill, index) => (
                <ul key={index}>
                  <li >{skill.name}</li>
                </ul>
              ))}
            </div>
          )}


      
    </div>
  )
}

export default Preview
