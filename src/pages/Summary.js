import React, { useState, useEffect, useRef } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import NutrientsDashboard from "../components/nutrientChart";
import "react-circular-progressbar/dist/styles.css";
import api from "../api";

const Summary = () => {
  const [timeframe, setTimeframe] = useState("daily");
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [gridHeight, setGridHeight] = useState(0);

  const gridRef = useRef(null);
  const nutrientsRef = useRef(null);

  useEffect(() => {
    if (!gridRef.current) return;

    const observer = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (entry && entry.contentRect) {
        setGridHeight(entry.contentRect.height);
      }
    });

    observer.observe(gridRef.current);
    return () => observer.disconnect();
  }, []);

  const timeframeOptions = [
    { value: "hourly", label: "Hourly" },
    { value: "six-hours", label: "Last 6 Hours" },
    { value: "daily", label: "Daily" },
    { value: "weekly", label: "Weekly" },
    { value: "monthly", label: "Monthly" },
  ];

  const defaultStats = {
    temperature: 24,
    ph: 6.5,
    humidity: 72,
    moisture: 40,
    nutrients: {
      nitrogen: 65,
      phosphorous: 40,
      potassium: 50,
    },
  };

  const displayStats = stats || defaultStats;

  const gaugeData = [
    { label: "Temperature", value: displayStats.temperature, unit: "°C", max: 50 },
    { label: "pH", value: displayStats.ph, unit: "", max: 14 },
    { label: "Humidity", value: displayStats.humidity, unit: "%", max: 100 },
    { label: "Moisture", value: displayStats.moisture, unit: "%", max: 100 },
  ];

  return (
    <div className="bg-background min-h-screen p-8">
      {/* Header */}
      <div className="bg-accent p-6 rounded-lg mb-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-primary">Summary of Sensor Data</h2>
            <p className="text-gray-600">
              Summary of the data collected — {
                timeframeOptions.find(opt => opt.value === timeframe)?.label
              }
            </p>
          </div>
          <div className="flex items-center gap-3">
            <label htmlFor="timeframe" className="font-semibold text-primary">
              Timeframe:
            </label>
            <select
              id="timeframe"
              value={timeframe}
              onChange={(e) => setTimeframe(e.target.value)}
              disabled={loading}
              className="px-4 py-2 border-2 border-primary rounded-lg bg-white text-primary font-semibold cursor-pointer hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition"
            >
              {timeframeOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {loading && <p className="mt-3 text-sm text-primary font-medium">Loading data...</p>}
        {error && <p className="mt-3 text-sm text-red-600 font-medium">Error: {error}</p>}
      </div>
      

      {/* Gauges + Nutrients side by side */}
      <div className="flex flex-col md:flex-row justify-between gap-10 items-start">
        {/* Gauges Grid */}
        <div ref={gridRef} className="grid md:w-1/2 p-10 grid-cols-2 gap-10">
          {gaugeData.map((item, idx) => (
            <div key={idx} className="flex flex-col items-center justify-center">
              <div className="w-full m-5">
                <CircularProgressbar
                  value={item.value}
                  maxValue={item.max}
                  text={`${item.value}${item.unit}`}
                  styles={buildStyles({
                    pathColor: "#E18600",
                    textColor: "#3E5D2D",
                    trailColor: "#F6F1E3",
                  })}
                />
              </div>
              <p className="mt-2 font-semibold text-primary">{item.label}</p>
            </div>
          ))}
        </div>

        {/* Nutrients Chart - same height as gauges */}
        <div
          ref={nutrientsRef}
          className="relative flex md:w-1/2 w-full items-center p-10"
          style={{ height: gridHeight ? `${gridHeight}px` : "auto" }}
        >
          <NutrientsDashboard nutrients={displayStats.nutrients} />
        </div>
      </div>
    </div>
  );
};

export default Summary;
