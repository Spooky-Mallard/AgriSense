import React from "react";
import { InformationCircleIcon } from "@heroicons/react/24/outline";

export default function InsightItem({ title, description }) {
  return (
    <div className="flex flex-col items-start gap-2 max-w-xs">
      <InformationCircleIcon className="h-6 w-6 text-gray-600" />
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-sm text-gray-600">{description}</p>
    </div>
  );
}
