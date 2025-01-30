import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export default function Result({ userDetails, score }) {
  const generateCertificate = () => {
    const certificate = document.querySelector("#certificate");
    html2canvas(certificate).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF();
      pdf.addImage(imgData, "PNG", 10, 10, 190, 100);
      pdf.save("Certificate.pdf");
    });
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold">Your Score: {score}%</h2>
      {score >= 70 ? (
        <div>
          <div id="certificate" className="p-4 border rounded mt-4">
            <h2>Certificate of Achievement</h2>
            <p>This certifies that</p>
            <h3>{userDetails.name}</h3>
            <p>has successfully passed the test with a score of {score}%.</p>
          </div>
          <button
            onClick={generateCertificate}
            className="mt-4 p-2 bg-green-500 text-white rounded"
          >
            Download Certificate
          </button>
        </div>
      ) : (
        <p className="mt-4">Sorry, you did not pass. Try again!</p>
      )}
    </div>
  );
}
