import React from 'react';
import { Page, Text, View, Document, StyleSheet, Font } from '@react-pdf/renderer';

// Opcional: Registrar fuentes (recomendado para consistencia)
Font.register({
  family: 'Helvetica',
  fonts: [
    { src: 'https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-regular-webfont.ttf' },
    { src: 'https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-bold-webfont.ttf', fontWeight: 'bold' },
  ],
});
const FONT_SIZES = {
  title: 28,
  subtitle: 18,
  text: 14
};
const MB_SIZES = {
  sec: 16,
  big: 10,
  med: 6
};
// Crear estilos
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    padding: 30,
    fontFamily: 'Helvetica',

  },
  header: {
    marginBottom: 15,
    textAlign: 'center',
  },
  name: {
    fontSize: FONT_SIZES.title,
    marginBottom: MB_SIZES.big,
    marginTop: 5,
    fontWeight: 'bold',
  },
  position: {
    fontSize: FONT_SIZES.subtitle,
    marginBottom: MB_SIZES.big,
    color: '#333333',
  },
  contactInfo: {
    fontSize: FONT_SIZES.text,
    marginBottom: MB_SIZES.big,
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  contactItem: {
    marginHorizontal: MB_SIZES.med,
  },
  section: {
    marginBottom: MB_SIZES.sec,
  },
  sectionTitle: {
    fontSize: FONT_SIZES.subtitle,
    fontWeight: 'bold',
    marginBottom: MB_SIZES.big,
    paddingBottom: MB_SIZES.med,
    borderBottom: '1pt solid #000000',
  },
  job: {
    marginBottom: MB_SIZES.big,
  },
  jobHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: MB_SIZES.med,
  },
  jobPosition: {
    fontSize: FONT_SIZES.text,
    fontWeight: 'bold',
  },
  jobCompany: {
    fontSize: FONT_SIZES.text,
    fontStyle: 'italic',
  },
  jobDate: {
    fontSize: FONT_SIZES.text,
    color: '#666666',
  },
  jobDescription: {
    fontSize: FONT_SIZES.text,
    marginBottom: 5,
  },
  educationItem: {
    marginBottom: MB_SIZES.big,
  },
  educationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: MB_SIZES.med,
  },
  educationDegree: {
    fontSize: FONT_SIZES.text,
    fontWeight: 'bold',
  },
  educationSchool: {
    fontSize: FONT_SIZES.text,
  },
  educationDate: {
    fontSize: FONT_SIZES.text,
    color: '#666666',
  },
  skillList: {
    marginLeft: MB_SIZES.big,
  },
  skillItem: {
    fontSize: FONT_SIZES.text,
    marginBottom: MB_SIZES.med,
  },
  summary: {
    fontSize: FONT_SIZES.text,
    lineHeight: 1.4,
    textAlign: 'justify',
  },
  certificationList: {
    marginLeft: MB_SIZES.big,
  },
  certificationItem: {
    fontSize: FONT_SIZES.text,
    marginBottom: MB_SIZES.med,
  }
});

const PDFCV = ({ data }) => {
  // Adaptar datos (similar a tu CVPrint actual)
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

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* HEADER */}
        <View style={styles.header}>
          <Text style={styles.name}>
            {adaptedData.general.name || "Your Name"}
          </Text>
          {adaptedData.general.position && (
            <Text style={styles.position}>
              {adaptedData.general.position}
            </Text>
          )}
          <View style={styles.contactInfo}>
            {adaptedData.general.email && (
              <Text style={styles.contactItem}>{adaptedData.general.email}</Text>
            )}
            {adaptedData.general.phone && (
              <Text style={styles.contactItem}>{adaptedData.general.phone}</Text>
            )}
            {adaptedData.general.linkedin && (
              <Text style={styles.contactItem}>{adaptedData.general.linkedin}</Text>
            )}
          </View>
        </View>

        {/* SUMMARY */}
        {adaptedData.general.summary && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>PROFESSIONAL SUMMARY</Text>
            <Text style={styles.summary}>{adaptedData.general.summary}</Text>
          </View>
        )}

        {/* EXPERIENCE */}
        {adaptedData.experience.jobs.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>EXPERIENCE</Text>
            {adaptedData.experience.jobs.map((job, index) => (
              <View key={index} style={styles.job}>
                <View style={styles.jobHeader}>
                  <Text style={styles.jobPosition}>{job.position}</Text>
                  <Text style={styles.jobDate}>
                    {job.start} - {job.end || "Present"}
                  </Text>
                </View>
                <Text style={styles.jobCompany}>{job.company}</Text>
                {job.responsability && (
                  <Text style={styles.jobDescription}>{job.responsability}</Text>
                )}
              </View>
            ))}
          </View>
        )}

        {/* EDUCATION */}
        {(adaptedData.education.school || adaptedData.education.degree) && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>EDUCATION</Text>
            <View style={styles.educationItem}>
              <View style={styles.educationHeader}>
                <Text style={styles.educationDegree}>{adaptedData.education.degree}</Text>
                {adaptedData.education.graduated && (
                  <Text style={styles.educationDate}>{adaptedData.education.graduated}</Text>
                )}
              </View>
              <Text style={styles.educationSchool}>{adaptedData.education.school}</Text>
            </View>
            
            {/* CERTIFICATIONS */}
            {adaptedData.education.certifications.length > 0 && (
              <View style={styles.certificationList}>
                <Text style={{ fontSize: 11, fontWeight: 'bold', marginTop: 5, marginBottom: 3 }}>
                  Certifications:
                </Text>
                {adaptedData.education.certifications.map((cert, index) => (
                  <Text key={index} style={styles.certificationItem}>
                    • {cert.name}
                  </Text>
                ))}
              </View>
            )}
          </View>
        )}

        {/* SKILLS */}
        {adaptedData.skills.skills.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>SKILLS</Text>
            <View style={styles.skillList}>
              {adaptedData.skills.skills.map((skill, index) => (
                <Text key={index} style={styles.skillItem}>
                  • {skill.name}
                </Text>
              ))}
            </View>
          </View>
        )}
      </Page>
    </Document>
  );
};

export default PDFCV;