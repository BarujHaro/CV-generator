

import React, { useState, useEffect} from 'react'

const Education = ({ data, onChange }) => {

  const [form, setForm] = useState({
    school: data.school || "",
    degree: data.degree || "",
    graduated: data.graduated || ""
  });
  const [certifications, setCertifications] = useState(
    data.certifications || []
  );

  useEffect(() => {
    setForm({
      school: data.school || "",
      degree: data.degree || "",
      graduated: data.graduated || ""
    });
    setCertifications(data.certifications || []);

  }, [data]);
    

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Actualiza en local
    setForm(prev => ({ ...prev, [name]: value }));
    
    // Enviamos el cambio al componente padre (Build)
    onChange("education", name, value);
  };


  const handleCertificationChange = (index, value) => {
    const updated = [...certifications];
    updated[index].name = value;
    setCertifications(updated);
    onChange("education", "certifications", updated);
  };

  const addCertification = () => {
    const updated = [...certifications, {name: ""}];
    setCertifications(updated);
    onChange("education", "certifications", updated);
  };

    const removeCertification = (index) => {
    const updated = certifications.filter((_, i) => i !== index);
    setCertifications(updated);
    onChange("education", "certifications", updated);
  };



  return (
<div>
<form>
      <h2>Education</h2>
      <label>
        school Name
        <input
          type='text'
          name='school'
          value={form.school ?? ""}
          onChange={handleChange}
          
        />
      </label>

      <label>
        Degree name
        <input
          type='text'
          name='degree'
          value={form.degree ?? ""}
          onChange={handleChange}
          
        />
      </label>

      <label>
        Graduation date
        <input
          type='date'
          name='graduated'
          value={form.graduated ?? ""}
          onChange={handleChange}
          
        />
      </label>


      <h3>Certifications</h3>

      {certifications.map((cert, index) => (
        <div key={index}>
          <label>
            Certificate
            <input
              type="text"
              value={cert.name ?? ""}
              placeholder="Certification name"
              onChange={(e) =>
                handleCertificationChange(index, e.target.value)
              }
            />
          </label>
            <button
              type="button"
              onClick={() => removeCertification(index)}
              style={{ marginLeft: "8px", color: "red" }}
            >
              Remove
            </button>
        </div>


      ))}



      <button type="button" onClick={addCertification}>
        Add
      </button>
    </form>


</div>
    
  )
}

export default Education 
