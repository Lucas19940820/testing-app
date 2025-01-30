import React from "react";
import { useNavigate } from "react-router-dom";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import logo from "./logo.jpg"; // Import the logo image

export default function Result({ userDetails, score }) {
  const navigate = useNavigate();

  // Generate the issuing date (today) and expiry date (one year later)
  const issuingDate = new Date();
  const expiryDate = new Date();
  expiryDate.setFullYear(issuingDate.getFullYear() + 1);

  const formatDate = (date) => {
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  const generateCertificate = () => {
    const certificate = document.querySelector("#certificate");
    html2canvas(certificate).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("landscape");
      pdf.addImage(imgData, "PNG", 10, 10, 270, 190);
      pdf.save("Certificate.pdf");
    });
  };

  const goToUserForm = () => {
    navigate("/");
  };

  return (
    <div className="result">
      <h2>Your Score: {score}%</h2>
      {score >= 70 ? (
        <div>
          <div id="certificate" className="certificate">
            <div className="certificate-container">
              {/* LOGO */}
              <div className="certificate-header">
                <img src={logo} alt="CWC Logo" className="certificate-logo" />
              </div>

              {/* TITLE */}
              <h1 className="certificate-title">CERTIFICATE OF ACHIEVEMENT</h1>
              <p className="certificate-subtitle"><strong>THIS CERTIFIES THAT</strong></p>
              
              {/* USER DETAILS */}
              <h2 className="certificate-name">{userDetails.name}</h2>
              <p className="certificate-id">{userDetails.idNumber}</p>
              <p>Has completed the following training:</p>
              <p><strong>Regulation 280 of the National Road Traffic Act 93 of 1996</strong></p>
              <p>Unit Standard: <strong>123259</strong></p>
              <p>Convey dangerous goods by road</p>
              <p><strong>NQF Level 3</strong></p>

              {/* FOOTER (DATES & SIGNATURES) */}
              <div className="certificate-footer">
                <div className="certificate-info">
                  <p><strong>Issue Date:</strong> {formatDate(issuingDate)}</p>
                  <p><strong>Exp Date:</strong> {formatDate(expiryDate)}</p>
                  <p><strong>DOT Number PRDP (D) 2024/255</strong></p>
                  <p><strong>TETA Ref No:</strong> TETA21-1368</p>
                </div>
                <div className="certificate-signatures">
                  <p><strong>Assessor No:</strong> Teta-ASSR09-2438</p>
                  <p>Assessor Signature: __________</p>
                  <p>Admin Signature: __________</p>
                </div>
              </div>
            </div>
          </div>
          <button onClick={generateCertificate}>Download Certificate</button>
        </div>
      ) : (
        <p>Sorry, you did not pass. Try again!</p>
      )}
      <button onClick={goToUserForm} className="back-button">
        Back to UserForm
      </button>
    </div>
  );
}
