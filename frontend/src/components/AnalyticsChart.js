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

  //  SAFE BAR DATA
  const barData = {
    labels: ["Total", "Interviews", "Offers"],
    datasets: [
      {
        label: "Applications",
        data: [
          analytics.totalApplications || 0,
          analytics.interviews || 0,
          analytics.offers || 0
        ],
        backgroundColor: ["#6b7280", "#3b82f6", "#10b981"],
        borderRadius: 8,
        barThickness: 40
      }
    ]
  };

  // SAFE DOUGHNUT DATA
  const response = parseFloat(analytics.responseRate) || 0;

  const doughnutData = {
    labels: ["Responses", "No Response"],
    datasets: [
      {
        data: [response, 100 - response],
        backgroundColor: ["#10b981", "#374151"],
        borderWidth: 0,
        cutout: "70%"
      }
    ]
  };

  // 🎨 OPTIONS (clean dark theme)
  const options = {
    responsive: true,
    animation: {
      duration: 800,
      easing: "easeOutQuart"
    },
    plugins: {
      legend: {
        labels: {
          color: "#e5e5e5"
        }
      }
    },
    scales: {
      x: {
        ticks: { color: "#9ca3af" },
        grid: { color: "rgba(255,255,255,0.05)" }
      },
      y: {
        ticks: { color: "#9ca3af" },
        grid: { color: "rgba(255,255,255,0.05)" }
      }
    }
  };

  return (
    <div style={{ marginTop: "40px" }}>
      <h2>Analytics</h2>

      <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
        
        <div style={{ width: "420px" }}>
          <Bar data={barData} options={options} />
        </div>

        <div style={{ width: "300px" }}>
          <Doughnut data={doughnutData} />
        </div>

      </div>
    </div>
  );
}

export default AnalyticsChart;