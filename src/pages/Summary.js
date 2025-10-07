import React from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
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

function StatWidget({ label, value, unit }) {
  return (
    <div className="rounded-2xl shadow-md p-4 bg-white border-l-4 border-accent">
      <p className="text-gray-500">{label}</p>
      <h2 className="text-2xl font-bold text-accent">
        {value} <span className="text-sm">{unit}</span>
      </h2>
    </div>
  );
}


  return (
    <div className="bg-background min-h-screen p-8">
      {/* Header */}
      <div className="bg-accent p-6 rounded-lg mb-6">
        <h2 className="text-2xl font-bold text-primary">Summary of Sensor Data</h2>
        <p className="text-gray-600">Summary of the data collected the last 24 hours</p>
      </div>

      {/* Gauges */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
        {[
          { label: "Temperature", value: stats.temperature, unit: "°C" },
          { label: "pH", value: stats.ph },
          { label: "Humidity", value: stats.humidity, unit: "%" },
          { label: "Moisture", value: stats.moisture, unit: "%" },
        ].map((item, idx) => (
          <div key={idx} className="flex flex-col items-center">
            <div className="w-32 h-32">
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

      {/* Nutrients */}
      <div className="bg-accent p-6 rounded-lg">
        <h3 className="text-lg font-semibold text-primary mb-4">Nutrients</h3>
        <div className="flex justify-around">
          {Object.entries(stats.nutrients).map(([key, value]) => (
            <div key={key} className="flex flex-col items-center">
              <StatWidget label={key} value={value} unit="ppm" />
              <div className="w-6 h-40 bg-background rounded-full relative overflow-hidden">
                <div
                  className="absolute bottom-0 w-full bg-secondary"
                  style={{ height: `${value}%` }}
                />
              </div>
              <p className="mt-2 text-sm capitalize text-primary">{key}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Summary;
