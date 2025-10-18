import React, { useState, useEffect } from "react";
import InsightItem from "../components/insightitem";
import api from "../api";

export default function Insights() {
  const [timeframe, setTimeframe] = useState("daily");
  const [insights, setInsights] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const timeframeOptions = [
    { value: "hourly", label: "Hourly" },
    { value: "six-hours", label: "Last 6 Hours" },
    { value: "daily", label: "Daily" },
    { value: "weekly", label: "Weekly" },
    { value: "monthly", label: "Monthly" },
  ];

  // Default insights in case backend fails
  const defaultInsights = [
    { title: "pH", description: "Body text for whatever you'd like to say..." },
    { title: "Moisture", description: "Body text for whatever you'd like to say..." },
    { title: "Temperature", description: "Body text for whatever you'd like to say..." },
    { title: "Nutrients", description: "Body text for whatever you'd like to say..." },
    { title: "Humidity", description: "Body text for whatever you'd like to say..." },
  ];

  // Fetch insights from backend
  useEffect(() => {
    const fetchInsights = async () => {
      setLoading(true);
      setError(null);

      try {
        const url = `/insights?timeframe=${timeframe}`;
        console.log("Fetching insights from:", url);

        const response = await api.get(url);

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }

        const data = await response.json();
        console.log("Received insights:", data);

        // Handle both array and object response formats
        const insightsList = Array.isArray(data) 
          ? data 
          : data.insights || data.data || [];

        setInsights(insightsList.length > 0 ? insightsList : defaultInsights);
      } catch (err) {
        console.error("Error fetching insights:", err);
        setError(err.message);
        setInsights(defaultInsights);
      } finally {
        setLoading(false);
      }
    };

    fetchInsights();
  }, [timeframe]);

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      {/* Header with Timeframe Selector */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <div>
          <h2 className="text-2xl font-bold">Today's Insights</h2>
          <p className="text-gray-600 mt-1">
            Summary of the interpretation of data received —{" "}
            <span className="font-semibold text-primary">
              {timeframeOptions.find((opt) => opt.value === timeframe)?.label}
            </span>
          </p>
        </div>

        {/* Timeframe Dropdown */}
        <div className="flex items-center gap-3">
          <label htmlFor="insight-timeframe" className="font-semibold text-gray-700">
            View by:
          </label>
          <select
            id="insight-timeframe"
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

      {/* Loading and Error States */}
      {loading && (
        <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-blue-700 font-medium animate-pulse">⏳ Loading insights...</p>
        </div>
      )}

      {error && (
        <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <p className="text-yellow-700 font-medium">⚠️ {error}</p>
          <p className="text-yellow-600 text-sm mt-1">Using default insights. Check backend connection.</p>
        </div>
      )}

      {/* Insights Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
        {insights.map((insight, index) => (
          <InsightItem 
            key={index} 
            title={insight.title || `Insight ${index + 1}`}
            description={insight.description || "No data available"}
          />
        ))}
      </div>

      {/* Empty State */}
      {!loading && insights.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No insights available for this timeframe.</p>
        </div>
      )}
    </div>
  );
}