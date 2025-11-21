import React, { useState, useEffect  } from 'react'

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
     <h2>Experience</h2>
      <form>

        {jobs.map((job, index) => (
          <div key={index}>
              <label>
              Company name
              <input
                type='text'
                placeholder='company'
                value={job.company ?? ""}
                onChange={(e) => 
                  handleJobsChange(index, "company", e.target.value)
                }
                
              />
            </label>


            <label>
              Position
              <input
                type='text'
                placeholder='position'
                value={job.position ?? ""}
                onChange={(e) => 
                  handleJobsChange(index, "position", e.target.value)
                }
                
              />
            </label>


            <label>
              Responsabilities
              <input
                type='text'
                placeholder='responsabilities'
                value={job.responsability ?? ""}
                onChange={(e) => 
                  handleJobsChange(index, "responsability", e.target.value)
                }
                
              />
            </label>

            <label>
              Start date
              <input
                type='date'
                value={job.start ?? ""}
                onChange={(e) => 
                  handleJobsChange(index, "start", e.target.value)
                }
                
              />
            </label>

            <label>
              Leave Date
              <input
                type='date'
                value={job.end ?? ""}
                onChange={(e) => 
                  handleJobsChange(index, "end", e.target.value)
                }
                
              />
            </label>            


              <button
                type='button'
                onClick={() => removeJob(index)}
                style={{ marginLeft: "8px", color: "red" }}
              >
                Remove
              </button>


          </div>
        ))}

        <button type="button" onClick={addJob}>
          Add
        </button>
      </form>
    </div>
  )
}  

export default Experience 
