import React from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import NutrientsDashboard from "../components/nutrientChart";
import "react-circular-progressbar/dist/styles.css";

const Summary = () => {
  const stats = {
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

  return (
    <div className="bg-background min-h-screen p-8">
      {/* Header */}
      <div className="bg-accent p-6 rounded-lg mb-6">
        <h2 className="text-2xl font-bold text-primary">Summary of Sensor Data</h2>
        <p className="text-gray-600">Summary of the data collected the last 24 hours</p>
      </div>

      {/* Gauges */}
        <div className="flex flex-col md:flex-row justify-between gap-10">
      {/* Left section — the 2x2 grid */}
      <div className="grid md:w-1/2 p-10 grid-cols-2 gap-10 mb-12">
        {[
          { label: "Temperature", value: stats.temperature, unit: "°C" },
          { label: "pH", value: stats.ph },
          { label: "Humidity", value: stats.humidity, unit: "%" },
          { label: "Moisture", value: stats.moisture, unit: "%" },
        ].map((item, idx) => (
          <div key={idx} className="flex flex-col items-center justify-center">
            <div className="w-full m-5">
              <CircularProgressbar
                value={item.value}
                maxValue={item.label === "pH" ? 14 : 100}
                text={`${item.value}${item.unit || ""}`}
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
    <div className="flex md:w-1/2 w-full item-center p-10">
          {/* The Chart */} 
          <NutrientsDashboard />
        </div>
       
    </div>
    </div>
  );
};

export default Summary;
