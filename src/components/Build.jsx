import React from 'react'
import { useState} from 'react'
import { pdf } from '@react-pdf/renderer';
import PDFCV from './PDFCV.jsx';
import General from './General.jsx'
import Education from './Education.jsx'
import Experience from './Experience.jsx'
import Skills from './Skill.jsx'
import BtnCategory from './commonCom/Btn-category.jsx'
import Preview from './Preview.jsx'

const Build = () => {
    const [section, setSection] = useState("general");
    const [isGenerating, setIsGenerating] = useState(false);

    const [cvData, setCvData] = useState({
        general: {
            name: "",
            position: "",
            email: "",
            number: "",
            linkedin: "",
            summary: ""
        },
        education: {
            school: "",
            graduated: "",
            degree: "",
            certifications: []
        },
        experience: {
            jobs: []
        },
        skills: {
            skills: []
        }
    });

 
    // Función para generar y descargar PDF
    const generatePDF = async () => {
        setIsGenerating(true);
        try {
            const blob = await pdf(<PDFCV data={cvData} />).toBlob();
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = `${cvData.general.name || 'CV'}.pdf`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(url);
        } catch (error) {
            console.error('Error generating PDF:', error);
            alert('Error generating PDF. Please try again.');
        } finally {
            setIsGenerating(false);
        }
    };


    //Recibe datos del formulario hijo
    const handleInputChange = (section, field, value) => {
        setCvData(prev => ({ //setter para guardar datos
            ...prev,   //copia el valor anterior de cvdata 
            [section]: {
                ...prev[section], //actualiza una parte dek estado global sin borrar el resto
                [field]: value
            }
        }));
    };

    const restart = () => {
    setCvData({
        general: {
            name: "",
            position: "",
            email: "",
            number: "",
            linkedin: "",
            summary: ""
        },
        education: {
            school: "",
            graduated: "",
            degree: "",
            certifications: []
        },
        experience: {
            jobs: []
        },
        skills: {
            skills: []
        }
    });
    };

    return (

        <div>
            <div>
                <BtnCategory title="General" onClick={() => setSection("general")}/>
                <BtnCategory title="Education" onClick={() => setSection("education")}/>
                <BtnCategory title="Experience" onClick={() => setSection("experience")}/>
                <BtnCategory title="Skills" onClick={() => setSection("skills")}/>
            </div>

            <div>
                {section === "general" && 
                <General 
                    data={cvData.general}
                    onChange={handleInputChange}
                />
                }
                {section === "education" && 
                <Education 
                    data={cvData.education}
                    onChange={handleInputChange}
                />
                }
                {section === "experience" && 
                <Experience 
                    data={cvData.experience}
                    onChange={handleInputChange}
                />
                }
                {section === "skills" && 
                <Skills 
                    data={cvData.skills}
                    onChange={handleInputChange}
                />
                }
            </div>

            <div>
                <Preview data={cvData}/>
            </div>


            <div>
                <button onClick={restart}>
                    restart
                </button>
                <button onClick={generatePDF}>
                    Download PDF
                </button>
            </div>

        
        </div>
    )
} 

export default Build
