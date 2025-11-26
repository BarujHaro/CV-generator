import { Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType } from "docx";
import { saveAs } from "file-saver";

const generateWordDocument = (data) => {
  // Adaptar datos (similar a tu PDF)
  const adaptedData = {
    general: {
      name: data?.general?.name || "",
      email: data?.general?.email || "",
      phone: data?.general?.number || "",
      linkedin: data?.general?.linkedin || "",
      summary: data?.general?.summary || "",
      position: data?.general?.position || ""
    },
    experience: {
      jobs: data?.experience?.jobs || []
    },
    education: {
      school: data?.education?.school || "",
      degree: data?.education?.degree || "",
      graduated: data?.education?.graduated || "",
      certifications: data?.education?.certifications || []
    },
    skills: {
      skills: data?.skills?.skills || []
    }
  };

  const sections = [];

  // HEADER - Más espacio después del header
  sections.push(
    new Paragraph({
      children: [
        new TextRun({
          text: adaptedData.general.name || "Your Name",
          bold: true,
          size: 32,
        }),
      ],
      alignment: AlignmentType.CENTER,
      spacing: { after: 620 },  
    })
  );

  if (adaptedData.general.position) {
    sections.push(
      new Paragraph({
        children: [
          new TextRun({
            text: adaptedData.general.position,
            bold: true,
            size: 26,
       
          }),
        ],
        alignment: AlignmentType.CENTER,
        spacing: { after: 620 },  
      })
    );
  }

  // CONTACT INFO
  const contactInfo = [];
  if (adaptedData.general.email) contactInfo.push(adaptedData.general.email);
  if (adaptedData.general.phone) contactInfo.push(adaptedData.general.phone);
  if (adaptedData.general.linkedin) contactInfo.push(adaptedData.general.linkedin);

  if (contactInfo.length > 0) {
    sections.push(
      new Paragraph({
        children: [
          new TextRun({
            text: contactInfo.join(" | "),
            size: 20,
          }),
        ],
        alignment: AlignmentType.CENTER,
        spacing: { after: 820 },  
      })
    );
  }

  // PROFESSIONAL SUMMARY  
  if (adaptedData.general.summary) {
    sections.push(
      new Paragraph({
        text: "PROFESSIONAL SUMMARY",
        heading: HeadingLevel.HEADING_1,
        spacing: { before: 600, after: 300 }, 
      }),
      new Paragraph({
        children: [
          new TextRun({
            text: adaptedData.general.summary,
            size: 22,
          }),
        ],
        spacing: { after: 620 },  
      })
    );
  }

  // EXPERIENCE  
  if (adaptedData.experience.jobs.length > 0) {
  sections.push(
    new Paragraph({
      children: [
        new TextRun({
          text: "EXPERIENCE",
          bold: true,
          size: 26,  
          color: "000000",  
        }),
      ],
      heading: HeadingLevel.HEADING_1,
      spacing: { before: 600, after: 300 },
    })
  );

    adaptedData.experience.jobs.forEach((job, index) => {
      sections.push(
        new Paragraph({
          children: [
            new TextRun({
              text: job.position || "",
              bold: true,
              size: 22,
            }),
            new TextRun({
              text: `\t${job.start} - ${job.end || "Present"}`,
              bold: true,
              size: 22,
              
            }),
          ],
          spacing: { after: 170 }, 
        }),
        new Paragraph({
          children: [
            new TextRun({
              text: job.company || "",
              italics: true,
              size: 20,
            }),
          ],
          spacing: { after: 170 },  
        })
      );

      if (job.responsability) {
        sections.push(
          new Paragraph({
            children: [
              new TextRun({
                text: job.responsability,
                size: 20,
              }),
            ],
            spacing: { after: 300 }, 
          })
        );
      }
 
      if (index < adaptedData.experience.jobs.length - 1) {
        sections.push(
          new Paragraph({
            spacing: { after: 200 }, 
          })
        );
      }
    });
  }

  // EDUCATION - Más espacio antes de la sección
  if (adaptedData.education.school || adaptedData.education.degree) {
  sections.push(
    new Paragraph({
      children: [
        new TextRun({
          text: "EDUCATION",
          bold: true,
          size: 26, // Tamaño similar al PDF
          color: "000000", // Negro puro
        }),
      ],
      heading: HeadingLevel.HEADING_1,
      spacing: { before: 650, after: 300 },
    })
  );

    sections.push(
      new Paragraph({
        children: [
          new TextRun({
            text: adaptedData.education.degree || "",
            bold: true,
            size: 22,
          }),
          new TextRun({
            text: adaptedData.education.graduated ? `\t${adaptedData.education.graduated}` : "",
            bold: true,
            size: 22,
           
          }),
        ],
        spacing: { after: 170 },  
      }),
      new Paragraph({
        children: [
          new TextRun({
            text: adaptedData.education.school || "",
            size: 20,
          }),
        ],
        spacing: { after: 300 }, 
      })
    );

    // CERTIFICATIONS - Con más espacio
    if (adaptedData.education.certifications.length > 0) {
      sections.push(
        new Paragraph({
            children: [
                       new TextRun({
             text: "Certifications:",
          bold: true,
          size: 26,  
          color: "000000",  
                       })
            ],
      
          heading: HeadingLevel.HEADING_2,
          spacing: { before: 300, after: 150 },  
        })
      );

      adaptedData.education.certifications.forEach((cert) => {
        sections.push(
          new Paragraph({
            children: [
              new TextRun({
                text: `• ${cert.name}`,
                size: 20,
              }),
            ],
            spacing: { after: 170 },  
          })
        );
      });
    }
  }

  // SKILLS - Más espacio antes
if (adaptedData.skills.skills.length > 0) {
  sections.push(
    new Paragraph({
      children: [
        new TextRun({
          text: "SKILLS",
          bold: true,
          size: 26,  
          color: "000000",  
        }),
      ],
      heading: HeadingLevel.HEADING_1,
      spacing: { before: 650, after: 300 },
    })
  );

    adaptedData.skills.skills.forEach((skill) => {
      sections.push(
        new Paragraph({
          children: [
            new TextRun({
              text: `• ${skill.name}`,
              size: 20,
            }),
          ],
          spacing: { after: 160 },
        })
      );
    });
  }

 
  const doc = new Document({
    styles: {
      paragraphStyles: [
        {
          id: "Heading1",
          name: "Heading 1",
          basedOn: "Normal",
          next: "Normal",
          quickFormat: true,
          run: {
            font: "Helvetica",
            size: 26, // 12pt * 2 = 24
            bold: true,
            color: "000000",
          },
          paragraph: {
            spacing: { after: 300 },
          },
        },
        {
          id: "Heading2",
          name: "Heading 2",
          basedOn: "Normal",
          next: "Normal",
          quickFormat: true,
          run: {
            font: "Helvetica",
            size: 22,
            bold: true,
            color: "000000",
          },
        },
        {
          id: "Normal",
          name: "Normal",
          quickFormat: true,
          run: {
            font: "Helvetica",
            size: 20, 
          },
        },
      ],
    },
    sections: [
      {
        properties: {},
        children: sections,
      },
    ],
  });
 
  Packer.toBlob(doc).then((blob) => {
    saveAs(blob, `${adaptedData.general.name || "cv"}.docx`);
  });
};

export default generateWordDocument;