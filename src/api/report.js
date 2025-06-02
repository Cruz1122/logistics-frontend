import axios from "axios";

const API_URL =
  import.meta.env.VITE_GATEWAY_URL ||
  "https://logistics-backend-n3be.onrender.com";

  // Function to download a delivery report
export const downloadReport = async (deliveryId) => {
  const token = localStorage.getItem("token");
  try {
    const response = await axios.get(
      `${API_URL}/reports/reports/delivery-report/${deliveryId}`,
      {
        headers: { Authorization: `Bearer ${token}` },
        responseType: "blob", // Important for downloading files
      }
    );
    
    // Create a URL for the blob and trigger a download
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `reporte_${deliveryId}.pdf`);
    document.body.appendChild(link);
    link.click();
  } catch (error) {
    console.error("Error downloading report:", error);
  }
};
