import React, { useState, useEffect } from 'react'

const Skills = ({ data, onChange }) => {
 
  const [skills, setSkills] = useState(
      data.skills || []
    );

    useEffect(() => {
      setSkills(data.skills || []);
    }, [data]);
 

  const handleSkillChange = (index, value) => {
    const updated = [...skills];
    updated[index].name = value;
    setSkills(updated);            
    //    section name, field inside, data to be updated    
    onChange("skills", "skills", updated);  
  };

  const addSkill = () => {
    const updated = [...skills, {name: ""}];
    setSkills(updated);
    onChange("skills", "skills", updated);
  };

    const removeSkill = (index) => {
    const updated = skills.filter((_, i) => i !== index);
    setSkills(updated);
    onChange("skills", "skills", updated);
  };


  return (
    <div>
      <h2>Skills</h2>
      <form>
        {skills.map((skill, index) => (
          <div key={index}>
            <label>
              Skill name

              <input
                type="text"
                value={skill.name ?? ""}
                placeholder="Skill"
                onChange={(e) =>
                  handleSkillChange(index, e.target.value)
                }
              />
            </label>

              <button
                type="button"
                onClick={() => removeSkill(index)}
                style={{ marginLeft: "8px", color: "red" }}
              >
                Remove
              </button>
          </div>



        ))}


        <button type="button" onClick={addSkill}>
          Add
        </button>
      </form>
    </div>
  )
} 

export default Skills 
