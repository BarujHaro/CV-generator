import React, { useState, useEffect  } from 'react'
import { CirclePlus } from 'lucide-react';
import { Trash } from 'lucide-react';

const Experience = ({ data, onChange }) => {
 
  const [jobs, setJobs] = useState(
      data.jobs || []
    );


    useEffect(() => {
      setJobs(data.jobs || []);
    }, [data]);

    const handleJobsChange = (index, field, value) => {
      const updated = [...jobs];
      updated[index][field] = value;
      setJobs(updated);
      onChange("experience", "jobs", updated);
    };

    const addJob = () => {
      const updated = [...jobs, {
        company: "",
        position: "",
        responsability: "",
        start: "",
        end: ""   
      }];
      setJobs(updated);
      onChange("experience", "jobs", updated);
    };

    const removeJob = (index) => {
      const updated = jobs.filter((_, i) => i !== index);
      setJobs(updated);
      onChange("experience", "jobs", updated);
    };



  return (
    <div>

      <form>
        <h2 className="form-title">Experience</h2>
        {jobs.map((job, index) => (
          <div  className="form-control" key={index}>
            <div  >
              <label className="form-label">
              Company name
              </label>
              <input
                type='text'
                placeholder='company'
                value={job.company ?? ""}
                onChange={(e) => 
                  handleJobsChange(index, "company", e.target.value)
                }
                className="form-input"
              />
            
            </div>


            <div>
              <label className="form-label">
                Position
              </label>
                <input
                  type='text'
                  placeholder='position'
                  value={job.position ?? ""}
                  onChange={(e) => 
                    handleJobsChange(index, "position", e.target.value)
                  }
                  className="form-input"
                />
            </div>

            

            <div>
              <label className="form-label">
                Responsabilities
                </label>
                <input
                  type='text'
                  placeholder='responsabilities'
                  value={job.responsability ?? ""}
                  onChange={(e) => 
                    handleJobsChange(index, "responsability", e.target.value)
                  }
                  className="form-input"
                />
            </div>

            


            <div>
              <label className="form-label">
                Start date
              </label>
                <input
                  type='date'
                  value={job.start ?? ""}
                  onChange={(e) => 
                    handleJobsChange(index, "start", e.target.value)
                  }
                  className="form-input"
                />
            </div>

            


            <div >
              <label className="form-label">
                Leave Date
              </label> 
                <input
                  type='date'
                  value={job.end ?? ""}
                  onChange={(e) => 
                    handleJobsChange(index, "end", e.target.value)
                  }
                  className="form-input"
                />
            </div>

                       

 
              <button type="button" onClick={() => removeJob(index)} className="icon-btn">
                <Trash size={30}  color="var(--del)"/>
              </button>


          </div>
        ))}
 
 
      <button type="button" onClick={addJob} className="icon-plus-btn">
        <CirclePlus size={34}  color="var(--accent)"/>
      </button>


      </form>
    </div>
  )
}  

export default Experience 
