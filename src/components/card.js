import React from "react";

export default function Card({ title, description, children }) {
  return (
    <div className="border rounded-lg p-6 bg-white shadow-sm hover:shadow-md transition">
      {children && <div className="mb-4">{children}</div>}
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-sm text-gray-600 mt-2">{description}</p>
    </div>
  );
}
