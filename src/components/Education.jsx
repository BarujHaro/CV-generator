import React, { useState, useEffect} from 'react'
import { CirclePlus } from 'lucide-react';
import { Trash } from 'lucide-react';


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
      <h2 className="form-title">Education</h2>
      <div className="form-control">
      <div >
        <label className="form-label">
          school Name
        </label>
          <input
            type='text'
            name='school'
            value={form.school ?? ""}
            onChange={handleChange}
            className="form-input"
          />
      </div>


      <div >
        <label className="form-label">
          Degree name
        </label>
          <input
            type='text'
            name='degree'
            value={form.degree ?? ""}
            onChange={handleChange}
            className="form-input"
          />
      </div>

      

      <div  >
        <label className="form-label">
          Graduation date
        </label>
          <input
            type='date'
            name='graduated'
            value={form.graduated ?? ""}
            onChange={handleChange}
            className="form-input"
          />
      </div>




      </div>




      <h3 className="form-title">Certifications</h3>

      {certifications.map((cert, index) => (
      
          <div className="form-control-del" key={index}>
            <input
              type="text"
              value={cert.name ?? ""}
              placeholder="Certification name"
              onChange={(e) =>
                handleCertificationChange(index, e.target.value)
              }
              className="form-input"
            />

            <button type="button" onClick={() => removeCertification(index)} className="icon-btn">
              <Trash size={30}  color="var(--del)"/>
            </button>
          </div>

 


      ))}


    

      <button type="button" onClick={addCertification} className="icon-plus-btn">
        <CirclePlus size={34}  color="var(--accent)"/>
      </button>
    </form>


</div>
    
  )
}

export default Education 
