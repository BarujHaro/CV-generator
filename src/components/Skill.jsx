import React, { useState, useEffect } from 'react'
import { CirclePlus } from 'lucide-react';
import { Trash } from 'lucide-react';


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

      <form>
        <h2 className="form-title">Skills</h2>
        {skills.map((skill, index) => (
          <div className="form-control-del" key={index}>
              <input
                type="text"
                value={skill.name ?? ""}
                placeholder="Skill name"
                onChange={(e) =>
                  handleSkillChange(index, e.target.value)
                }
                className="form-input"
              />
           
 

              <button type="button" onClick={() => removeSkill(index)} className="icon-btn">
                <Trash size={30}  color="var(--del)"/>
              </button>
          </div>



        ))}

    
        <button type="button" onClick={addSkill} className="icon-plus-btn">
          <CirclePlus size={34}  color="var(--accent)"/>
        </button>
      </form>
    </div>
  )
} 

export default Skills 
