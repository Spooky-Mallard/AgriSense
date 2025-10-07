import React from "react";
import InsightItem from "../components/insightitem";

export default function Insights() {
  const insights = [
    { title: "pH", description: "Body text for whatever you’d like to say..." },
    { title: "Moisture", description: "Body text for whatever you’d like to say..." },
    { title: "Temperature", description: "Body text for whatever you’d like to say..." },
    { title: "Nutrients", description: "Body text for whatever you’d like to say..." },
    { title: "Humidity", description: "Body text for whatever you’d like to say..." },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <h2 className="text-2xl font-bold">Today's Insights</h2>
      <p className="text-gray-600 mb-8">
        Summary of the interpretation of data received
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
        {insights.map((insight, index) => (
          <InsightItem key={index} {...insight} />
        ))}
      </div>
    </div>
  );
}
