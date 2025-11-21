
import React, { useState, useEffect } from 'react'

const General = ({ data, onChange }) => {
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
      <h2>General</h2>
      <label>
        Name
        <input
          type='text'
          name='name'
          value={form.name ?? ""}
          onChange={handleChange}
          
        />
      </label>

      <label>
        Position
        <input
          type='text'
          name='position'
          value={form.position ?? ""}
          onChange={handleChange}
          
        />
      </label>

      <label>
        Email
        <input
          type='text'
          name='email'
          value={form.email ?? ""}
          onChange={handleChange}
          
        />
      </label>

      <label>
        Number
        <input
          type='number'
          name='number'
          value={form.number ?? ""}
          onChange={handleChange}
          
        />
      </label>

      <label>
        Linkedin
        <input
          type='text'
          name='linkedin'
          value={form.linkedin ?? ""}
          onChange={handleChange}
          
        />
      </label>

      <label>
        Summary
        <input
          type='text'
          name='summary'
          value={form.summary ?? ""}
          onChange={handleChange}
          
        />
      </label>

    </form>


</div>
    
  );
};

export default General
