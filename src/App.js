import React, { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

function App() {
  // Data for PDR comparison across topologies and queue types
  const pdrData = [
    {
      name: "Star",
      DropTail: 99.99,
      RED: 99.99,
      CoDel: 99.99,
      FQ_CoDel: 99.99,
      PIE: 99.99,
    },
    {
      name: "Ring",
      DropTail: 1.23,
      RED: 6.6,
      CoDel: 3.14,
      FQ_CoDel: 12.06,
      PIE: 1.23,
    },
    {
      name: "Mesh",
      DropTail: 5.56,
      RED: 5.69,
      CoDel: 5.67,
      FQ_CoDel: 5.82,
      PIE: 5.68,
    },
  ];

  // Data for Delay comparison across topologies and queue types
  const delayData = [
    {
      name: "Star",
      DropTail: 2.09,
      RED: 2.09,
      CoDel: 2.09,
      FQ_CoDel: 2.09,
      PIE: 2.09,
    },
    {
      name: "Ring",
      DropTail: 5.67,
      RED: 86.5,
      CoDel: 102.37,
      FQ_CoDel: 123.28,
      PIE: 5.67,
    },
    {
      name: "Mesh",
      DropTail: 280.78,
      RED: 229.59,
      CoDel: 188.79,
      FQ_CoDel: 179.82,
      PIE: 218.91,
    },
  ];

  // Data for Throughput comparison across topologies and queue types
  const throughputData = [
    {
      name: "Star",
      DropTail: 43.83,
      RED: 43.83,
      CoDel: 43.83,
      FQ_CoDel: 43.83,
      PIE: 43.83,
    },
    {
      name: "Ring",
      DropTail: 2.61,
      RED: 2.75,
      CoDel: 1.31,
      FQ_CoDel: 5.12,
      PIE: 2.61,
    },
    {
      name: "Mesh",
      DropTail: 4.32,
      RED: 4.32,
      CoDel: 4.32,
      FQ_CoDel: 4.32,
      PIE: 4.32,
    },
  ];

  // Data for fairness comparison (Max/Min throughput ratio)
  const fairnessData = [
    {
      name: "Star",
      DropTail: 1.25,
      RED: 1.25,
      CoDel: 1.25,
      FQ_CoDel: 1.25,
      PIE: 1.25,
    },
    {
      name: "Ring",
      DropTail: 2.6,
      RED: 143.08,
      CoDel: 545.5,
      FQ_CoDel: 1.43,
      PIE: 2.6,
    },
    {
      name: "Mesh",
      DropTail: 3.71,
      RED: 2.63,
      CoDel: 2.72,
      FQ_CoDel: 2.03,
      PIE: 2.68,
    },
  ];

  // Data for packet loss comparison across topologies and queue types
  const packetLossData = [
    { name: "Star", DropTail: 0, RED: 0, CoDel: 0, FQ_CoDel: 0, PIE: 0 },
    {
      name: "Ring",
      DropTail: 98.77,
      RED: 93.39,
      CoDel: 96.86,
      FQ_CoDel: 87.92,
      PIE: 98.77,
    },
    {
      name: "Mesh",
      DropTail: 94.43,
      RED: 94.09,
      CoDel: 94.09,
      FQ_CoDel: 94.18,
      PIE: 93.94,
    },
  ];

  // Data for overall algorithm performance across all topologies
  const overallPerformanceData = [
    {
      name: "PDR (%)",
      DropTail: 35.59,
      RED: 37.43,
      CoDel: 36.27,
      FQ_CoDel: 39.29,
      PIE: 35.63,
    },
    {
      name: "Delay (ms)",
      DropTail: 96.18,
      RED: 106.06,
      CoDel: 97.75,
      FQ_CoDel: 101.73,
      PIE: 75.56,
    },
    {
      name: "Throughput (Mbps)",
      DropTail: 16.92,
      RED: 16.97,
      CoDel: 16.49,
      FQ_CoDel: 17.76,
      PIE: 16.92,
    },
    {
      name: "Packet Loss (%)",
      DropTail: 64.4,
      RED: 62.49,
      CoDel: 63.65,
      FQ_CoDel: 60.7,
      PIE: 64.24,
    },
  ];

  // State to track which metric is being displayed
  const [activeMetric, setActiveMetric] = useState("pdr");

  // Helper function to get the appropriate data for the current metric
  const getDataForMetric = () => {
    switch (activeMetric) {
      case "pdr":
        return pdrData;
      case "delay":
        return delayData;
      case "throughput":
        return throughputData;
      case "fairness":
        return fairnessData;
      case "packetLoss":
        return packetLossData;
      case "overall":
        return overallPerformanceData;
      default:
        return pdrData;
    }
  };

  // Helper function to get title for the current metric
  const getTitleForMetric = () => {
    switch (activeMetric) {
      case "pdr":
        return "Packet Delivery Ratio (PDR, %)";
      case "delay":
        return "Delay (ms)";
      case "throughput":
        return "Throughput (Mbps)";
      case "fairness":
        return "Flow Fairness (Max/Min Throughput Ratio)";
      case "packetLoss":
        return "Packet Loss (%)";
      case "overall":
        return "Overall Algorithm Performance (All Topologies)";
      default:
        return "Packet Delivery Ratio (PDR, %)";
    }
  };

  // Helper function to get observation for the current metric
  const getObservationForMetric = () => {
    switch (activeMetric) {
      case "pdr":
        return "Yıldız topolojisinde tüm algoritmalar mükemmel performans gösterirken, FQ_CoDel halka topolojisinde en yüksek PDR değerini (%12.06) sağlıyor.";
      case "delay":
        return "DropTail ve PIE halka topolojisinde en düşük gecikme değerlerine (5.67 ms) sahip. FQ_CoDel örgü topolojisinde en düşük gecikmeyi (179.82 ms) sağlasa da diğer topolojilere göre çok daha yüksek.";
      case "throughput":
        return "FQ_CoDel, halka topolojisinde en yüksek verim değerine (5.12 Mbps) sahip ve tüm topolojilerde en iyi ortalama verimi (17.76 Mbps) sağlıyor.";
      case "fairness":
        return "Düşük değerler daha adil bant genişliği dağılımını gösterir. FQ_CoDel, tüm topolojilerde en adil dağılımı sağlıyor. Halka topolojisinde FQ_CoDel (1.43) ile CoDel (545.5) ve RED (143.08) arasında çok büyük fark var.";
      case "packetLoss":
        return "Yıldız topolojisinde hiç paket kaybı yaşanmazken, halka ve örgü topolojilerinde yüksek paket kayıpları görülüyor. FQ_CoDel halka topolojisinde en düşük paket kaybına (%87.92) sahip.";
      case "overall":
        return "FQ_CoDel, en yüksek ortalama PDR (%39.29) ve verim (17.76 Mbps) ile en iyi genel performansı gösteriyor. PIE ise en düşük ortalama gecikmeye (75.56 ms) sahip.";
      default:
        return "";
    }
  };

  return (
    <div
      className="app-container"
      style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}
    >
      <h1
        style={{
          fontSize: "24px",
          fontWeight: "bold",
          marginBottom: "24px",
          textAlign: "center",
        }}
      >
        Performance Comparison of Network Topologies with Queueing Algorithms in
        NS3 Simulation
      </h1>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginBottom: "16px",
        }}
      >
        <div
          className="button-group"
          style={{
            display: "inline-flex",
            border: "1px solid #ccc",
            borderRadius: "4px",
            overflow: "hidden",
          }}
        >
          {[
            "pdr",
            "delay",
            "throughput",
            "fairness",
            "packetLoss",
            "overall",
          ].map((metric) => (
            <button
              key={metric}
              style={{
                padding: "8px 16px",
                fontSize: "14px",
                fontWeight: "500",
                border: "none",
                borderRight: "1px solid #ccc",
                background: activeMetric === metric ? "#3b82f6" : "white",
                color: activeMetric === metric ? "white" : "#333",
                cursor: "pointer",
              }}
              onClick={() => setActiveMetric(metric)}
            >
              {metric === "pdr"
                ? "PDR"
                : metric === "delay"
                ? "Delay"
                : metric === "throughput"
                ? "Throughput"
                : metric === "fairness"
                ? "Fairness"
                : metric === "packetLoss"
                ? "Packet Loss"
                : "Overall"}
            </button>
          ))}
        </div>
      </div>

      <div style={{ marginBottom: "32px" }}>
        <h2
          style={{ fontSize: "20px", fontWeight: "600", marginBottom: "16px" }}
        >
          {getTitleForMetric()}
        </h2>
        <div style={{ height: "400px" }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={getDataForMetric()}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="DropTail" fill="#8884d8" />
              <Bar dataKey="RED" fill="#82ca9d" />
              <Bar dataKey="CoDel" fill="#ffc658" />
              <Bar dataKey="FQ_CoDel" fill="#ff8042" />
              <Bar dataKey="PIE" fill="#0088FE" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div
          style={{
            marginTop: "16px",
            backgroundColor: "#f3f4f6",
            padding: "12px",
            borderRadius: "8px",
          }}
        >
          <p style={{ fontSize: "14px" }}>
            <strong>Gözlem:</strong> {getObservationForMetric()}
          </p>
        </div>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "24px",
          marginTop: "32px",
        }}
      >
        <div
          style={{
            backgroundColor: "white",
            borderRadius: "8px",
            boxShadow: "0 1px 3px rgba(0,0,0,0.12)",
            padding: "16px",
          }}
        >
          <h3
            style={{
              fontSize: "18px",
              fontWeight: "600",
              marginBottom: "12px",
            }}
          >
            Topology Impact
          </h3>
          <ul
            style={{
              paddingLeft: "20px",
              listStyleType: "disc",
              margin: "0",
              lineHeight: "1.6",
            }}
          >
            <li>
              <strong>Star Topology:</strong> Tüm algoritmalarda mükemmel
              performans. Merkezi yapı çarpışmaları önlüyor.
            </li>
            <li>
              <strong>Ring Topology:</strong> Yüksek çarpışma oranları ve
              sınırlı bağlantı yolları. Algoritma seçimi önemli.
            </li>
            <li>
              <strong>Mesh Topology:</strong> Halka topolojisinden daha iyi,
              ancak yıldız topolojisinden oldukça kötü performans.
            </li>
          </ul>
        </div>

        <div
          style={{
            backgroundColor: "white",
            borderRadius: "8px",
            boxShadow: "0 1px 3px rgba(0,0,0,0.12)",
            padding: "16px",
          }}
        >
          <h3
            style={{
              fontSize: "18px",
              fontWeight: "600",
              marginBottom: "12px",
            }}
          >
            Algorithm Evaluation
          </h3>
          <ul
            style={{
              paddingLeft: "20px",
              listStyleType: "disc",
              margin: "0",
              lineHeight: "1.6",
            }}
          >
            <li>
              <strong>FQ_CoDel:</strong> En yüksek PDR ve verim. Halka
              topolojisinde en adil bant genişliği dağılımı (1.43 Max/Min
              oranı).
            </li>
            <li>
              <strong>PIE:</strong> Düşük gecikme sağlıyor (75.56 ms ortalama),
              tüm topolojilerde ortalama performans.
            </li>
            <li>
              <strong>RED:</strong> Orta düzeyde performans, tıkanıklık
              kontrolünde makul bir denge.
            </li>
            <li>
              <strong>CoDel:</strong> Örgü topolojisinde iyi sonuçlar, ancak
              halka topolojisinde adillik bakımından en kötü performansı
              gösteriyor (545.5 Max/Min oranı).
            </li>
            <li>
              <strong>DropTail:</strong> En basit ve yıldız topolojisinde
              etkili, karmaşık topolojilerde yetersiz.
            </li>
          </ul>
        </div>
      </div>

      <div
        style={{
          backgroundColor: "white",
          borderRadius: "8px",
          boxShadow: "0 1px 3px rgba(0,0,0,0.12)",
          padding: "16px",
          marginTop: "24px",
        }}
      >
        <h3
          style={{ fontSize: "18px", fontWeight: "600", marginBottom: "12px" }}
        >
          Conclusions and Recommendations
        </h3>
        <ol style={{ paddingLeft: "20px", margin: "0", lineHeight: "1.6" }}>
          <li>
            <strong>Topology Selection:</strong> Mümkünse yıldız topolojisi
            tercih edilmeli. Merkezi yapı belirgin performans avantajı sağlıyor.
          </li>
          <li>
            <strong>Algorithm Selection:</strong> Karmaşık topolojilerde (halka,
            örgü) FQ_CoDel tercih edilmeli. Özellikle halka topolojisinde adil
            bant genişliği dağılımı için FQ_CoDel diğer tüm algoritmalardan çok
            daha iyi.
          </li>
          <li>
            <strong>Resource Efficiency:</strong> Basit topolojilerde (yıldız)
            DropTail yeterli olabilir, daha az işlem gücü gerektiriyor.
          </li>
          <li>
            <strong>Fairness and Performance Balance:</strong> Adil bant
            genişliği dağılımı için FQ_CoDel, düşük gecikme için PIE tercih
            edilebilir.
          </li>
        </ol>
      </div>
    </div>
  );
}

export default App;
