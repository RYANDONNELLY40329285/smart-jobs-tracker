import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  ArcElement
} from "chart.js";
import { Bar, Doughnut } from "react-chartjs-2";

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  ArcElement
);

function AnalyticsChart({ analytics }) {
  if (!analytics) return null;

  // BAR (Applications breakdown)
const barData = {
  labels: ["Total", "Interviews", "Offers"],
  datasets: [
    {
      label: "Applications",
      data: [
        analytics.totalApplications,
        analytics.interviews,
        analytics.offers
      ],
      backgroundColor: [
        "#6b7280", // grey
        "#3b82f6", // blue
        "#10b981"  // green
      ],
      borderRadius: 6
    }
  ]
};

  //  DOUGHNUT (conversion)
 const doughnutData = {
  labels: ["Responses", "No Response"],
  datasets: [
    {
      data: [
        parseFloat(analytics.responseRate),
        100 - parseFloat(analytics.responseRate)
      ],
      backgroundColor: [
        "#10b981", // green (response)
        "#374151"  // dark grey (no response)
      ],
      borderWidth: 0
    }
  ]
};

  return (
    <div style={{ marginTop: "30px" }}>
      <h2> Analytics</h2>

      <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
        <div style={{ width: "400px" }}>
          <Bar data={barData} />
        </div>

        <div style={{ width: "300px" }}>
          <Doughnut data={doughnutData} />
        </div>
      </div>
    </div>
  );
}

export default AnalyticsChart;