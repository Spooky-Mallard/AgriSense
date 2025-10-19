import React from 'react';

// Configurable Nutrient Bar Component
const NutrientBar = ({ 
  nutrient,
  className = "" 
}) => {
  const { 
    name, 
    currentValue, 
    maxValue = 316.3,
    barColor = "bg-amber-100",
    backgroundBar = true 
  } = nutrient;

  const fillPercentage = Math.min((currentValue / maxValue) * 100, 100);

  return (
    <div className={`flex flex-col h-full items-center ${className}`}>
      {/* Bar Container */}
      <div className="relative w-full h-full">
        {/* Background Bar */}
        {backgroundBar && (
          <div className="absolute inset-x-0 bottom-0 w-1/5 h-full bg-gray-400 bg-opacity-50 rounded-full mx-auto" />
        )}
        {/* Foreground Bar */}
        <div 
          className={`absolute inset-x-0 bottom-0 w-1/4 ${barColor} rounded-full transition-all duration-500 mx-auto`}
          style={{ height: `${fillPercentage}%` }}
        />
      </div>
      
      {/* Label */}
      <span className="mt-2 text-1/4 text-green-900 text-opacity-80 font-bold font-ABeeZee text-center whitespace-nowrap">
        {name}
      </span>
    </div>
  );
};

// Main Nutrients Component with data configuration
const NutrientsDashboard = ({nutrients}) => {
  const buildNutrientConfig = (nutrientsObj) => {
    if (!nutrientsObj || typeof nutrientsObj !== 'object') {
      return [];
    }

    // Handle both object and array formats
    if (Array.isArray(nutrientsObj)) {
      return nutrientsObj;
    }

    // Convert object format: { nitrogen: 65, phosphorous: 40, potassium: 50 }
    return [
      { 
        name: "Nitrogen", 
        currentValue: nutrientsObj.nitrogen || 0, 
        maxValue: 100,
        barColor: "bg-amber-100"
      },
      { 
        name: "Phosphorous", 
        currentValue: nutrientsObj.phosphorous || 0, 
        maxValue: 100,
        barColor: "bg-amber-100"
      },
      { 
        name: "Potassium", 
        currentValue: nutrientsObj.potassium || 0, 
        maxValue: 100,
        barColor: "bg-amber-100"
      },
    ];
  };

  const nutrientsConfig = buildNutrientConfig(nutrients);

  return (
  <div className="flex flex-col w-full h-full bg-white rounded-lg shadow-sm border border-gray-100">
      {/* Title */}
      <div className="relative w-full h-[29px] top-0 font-ABeeZee font-bold text-[15px] leading-8 text-xl text-center text-green-900 text-opacity-50">
        NUTRIENTS
      </div>
      
      {/* Chart Container */}
      <div className="flex-1 flex justify-around items-end px-6">
          {nutrientsConfig.map((nutrient, index) => (
            <NutrientBar
              key={nutrient.name}
              nutrient={nutrient}
              className="flex-1 mx-3"
            />
          ))}
      </div>
      
      {/* Optional: Values Display */}
      <div className="relative top-2 left-0 right-0 flex justify-around px-8">
        {nutrientsConfig.map((nutrient) => (
          <div 
            key={nutrient.name}
            className="text-1/8 text-green-900 text-opacity-80 font-ABeeZee"
          >
            {nutrient.currentValue}
          </div>
        ))}
      </div>
    </div>
  );
};

export default NutrientsDashboard;