import React, { useState, useEffect } from "react";
import InsightItem from "../components/insightitem";
import axios from "axios";

export default function Insights() {
  const [timeframe, setTimeframe] = useState("24h");
  const [insights, setInsights] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const timeframeOptions = [
    { value: "1h", label: "Hourly" },
    { value: "6h", label: "Last 6 Hours" },
    { value: "24h", label: "Daily" },
    { value: "weekly", label: "Weekly" },
    { value: "monthly", label: "Monthly" },
  ];

  // Parse fertilizer prediction string into individual insights
  const parseFertilizerPrediction = (predictionText) => {
    if (!predictionText) return [];

    // Split by pipe character and clean up
    const items = predictionText.split("|").map(item => item.trim()).filter(Boolean);

    return items.map(item => {
      // Extract title (first few words before colon)
      const colonIndex = item.indexOf(":");
      const title = colonIndex > 0 
        ? item.substring(0, colonIndex).trim() 
        : item.substring(0, 30);

      // Extract description (rest of text after colon)
      const description = colonIndex > 0 
        ? item.substring(colonIndex + 1).trim() 
        : item;

      return {
        title: title || "Insight",
        description: description || item,
      };
    });
  };

  // Fetch insights from backend
  useEffect(() => {
    const fetchInsights = async () => {
      setLoading(true);
      setError(null);

      try {
        const url = `https://smart-soil-ml-api-production.up.railway.app/insights/sensor/SENSOR001/${timeframe}`;
        console.log("Fetching insights from:", url);

        const response = await axios.get(url);
        console.log("Received response:", response.data);

        const data = response.data;

        // Parse the predictions array
        let insightsList = [];

        if (data.predictions && Array.isArray(data.predictions)) {
          // Process each prediction
          data.predictions.forEach(prediction => {
            if (prediction.fertilizer_prediction) {
              const parsed = parseFertilizerPrediction(prediction.fertilizer_prediction);
              insightsList = [...insightsList, ...parsed];
            }
          });
        }

        console.log("Parsed insights:", insightsList);
        setInsights(insightsList.length > 0 ? insightsList : getDefaultInsights());
      } catch (err) {
        console.error("Error fetching insights:", err);
        setError(err.message || "Failed to fetch insights");
        setInsights(getDefaultInsights());
      } finally {
        setLoading(false);
      }
    };

    fetchInsights();
  }, [timeframe]);

  const getDefaultInsights = () => [
    { 
      title: "pH Level", 
      description: "Soil pH is within acceptable range for most crops." 
    },
    { 
      title: "Moisture Level", 
      description: "Soil moisture is optimal for current growth stage." 
    },
    { 
      title: "Nitrogen", 
      description: "Nitrogen levels are adequate. Monitor for changes." 
    },
    { 
      title: "Phosphorus", 
      description: "Phosphorus availability is good for root development." 
    },
    { 
      title: "Potassium", 
      description: "Potassium levels support plant health and immunity." 
    },
  ];

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