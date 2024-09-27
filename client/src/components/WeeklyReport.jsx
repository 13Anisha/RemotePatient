import React from 'react';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import patientImage from '../assets/Patient1.jpeg'; 

const WeeklyReport = () => {
  const weeklyData = {
    ECG: [120, 130, 110, 140, 135, 145, 138],
    EEG: [50, 55, 52, 53, 56, 54, 58],
    sp02: [98, 97, 96, 95, 94, 93, 92],
    BP: ["120/80", "122/81", "118/79", "119/80", "121/82", "117/78", "123/83"],
    "Body Temp": [36.5, 36.6, 36.7, 36.5, 36.4, 36.6, 36.5],
    Humidity: [40, 42, 41, 43, 39, 38, 37],
    "Env Temp": [22, 23, 22.5, 24, 23.5, 21, 22]
  };

  const patientInfo = {
    name: "John Doe",
    age: 45,
    gender: "Male",
    height: "5'9\"",
    weight: "75 kg",
    doctor: "Dr. Jane Smith"
  };

  const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  const healthStatus = 2;

  const getRiskLevel = (status) => {
    switch (status) {
      case 1: return "Safe";
      case 2: return "High Blood Pressure";
      case 3: return "Low Blood Pressure";
      case 4: return "High Sugar";
      case 5: return "Low Sugar";
      case 6: return "Low Oxygen Levels";
      case 7: return "High Temperature";
      case 8: return "High Heartbeat";
      case 9: return "High Risk";
      default: return "Unknown";
    }
  };

  const handleDownloadPDF = async () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text('Weekly Health Analysis Report', 10, 10);

    if (patientImage) {
      const img = new Image();
      img.src = patientImage;
      img.onload = () => {
        doc.addImage(img, 'JPEG', 150, 10, 40, 40);
        generatePDF(doc);
      };
    } else {
      generatePDF(doc);
    }
  };

  const generatePDF = (doc) => {
    doc.setFontSize(14);
    doc.text(`Patient Name: ${patientInfo.name}`, 10, 20);
    doc.text(`Age: ${patientInfo.age}`, 10, 30);
    doc.text(`Gender: ${patientInfo.gender}`, 10, 40);
    doc.text(`Height: ${patientInfo.height}`, 10, 50);
    doc.text(`Weight: ${patientInfo.weight}`, 10, 60);
    doc.text(`Attending Doctor: ${patientInfo.doctor}`, 10, 70);
    doc.setLineWidth(0.5);
    doc.line(10, 75, 200, 75);

    let yOffset = 85;

    Object.keys(weeklyData).forEach((parameter) => {
      doc.setFontSize(14);
      doc.text(parameter, 10, yOffset);
      yOffset += 10;

      const tableData = weeklyData[parameter].map((value, index) => [daysOfWeek[index], value.toString()]);
      doc.autoTable({
        head: [['Day', `${parameter} Value`]],
        body: tableData,
        startY: yOffset,
        margin: { left: 10, right: 10 },
        styles: { fontSize: 10 },
      });
      yOffset = doc.lastAutoTable.finalY + 10;
    });

    const riskLevel = getRiskLevel(healthStatus);
    doc.setFontSize(16);
    doc.text('Health Risk Assessment:', 10, yOffset + 20);
    doc.setFontSize(14);
    doc.text(`Risk Level: ${riskLevel}`, 10, yOffset + 30);
    doc.save('week-analysis.pdf');
  };

  return (
    <div>
      <button 
        onClick={handleDownloadPDF} 
        style={{ backgroundColor: '#378f68', color: 'white', padding: '10px 20px', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
      >
        Download Week Analysis as PDF
      </button>
    </div>
  );
};

export default WeeklyReport;
