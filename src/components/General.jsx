
import React, { useState, useEffect } from 'react'

const General = ({ data, onChange}) => {
  const [form, setForm] = useState({
    name: data.name || "",
    position: data.position || "",
    email: data.email || "",
    number: data.number || "",
    linkedin: data.linkedin || "",
    summary: data.summary || "",
   
  });

  useEffect(() => {
    setForm({
      name: data.name || "",
      position: data.position || "",
      email: data.email || "",
      number: data.number || "",
      linkedin: data.linkedin || "",
      summary: data.summary || "",
    });
  }, [data]);
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Actualiza en local
    setForm(prev => ({ ...prev, [name]: value }));
    
    // Enviamos el cambio al componente padre (Build)
    onChange("general", name, value);
  };

 


  return (
<div>
<form>
      <h2 className="form-title">General</h2>
      <div className="form-control">

      <div  >
      <label className="form-label">
        Name
      </label>
        <input
          type='text'
          name='name'
          value={form.name ?? ""}
          onChange={handleChange}
          className="form-input"
        />
      </div>

     
      <div >
      <label className="form-label">
        Position
      </label>
        <input
          type='text'
          name='position'
          value={form.position ?? ""}
          onChange={handleChange}
          className="form-input"
        />
      </div>

      
      <div  >
      <label className="form-label">
        Email
      </label>
        <input
          type='text'
          name='email'
          value={form.email ?? ""}
          onChange={handleChange}
          className="form-input"
        />
      </div>

    
      <div  >
      <label className="form-label">
        Number
      </label>
        <input
          type='number'
          name='number'
          value={form.number ?? ""}
          onChange={handleChange}
          className="form-input"
        />
      </div>

     
      <div  >
      <label className="form-label">
        Linkedin
      </label>
        <input
          type='text'
          name='linkedin'
          value={form.linkedin ?? ""}
          onChange={handleChange}
          className="form-input"
        />
      </div>

      
      <div  >
      <label className="form-label">
        Summary
      </label>
        <input
          type='text'
          name='summary'
          value={form.summary ?? ""}
          onChange={handleChange}
          className="form-input"
        />
      </div>

      </div>

    

    </form>


</div>
    
  );
};

export default General
