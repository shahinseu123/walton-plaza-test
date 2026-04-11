"use client";
import { useState } from "react";

export function ProductTabs({ product }: { product: any }) {
  const [activeTab, setActiveTab] = useState("specifications");

  // Define which data keys from your API map to which tab
  const tabs = [
    { id: "specifications", label: "Specifications", data: product.productAttributes },
    { id: "details", label: "Detailed Description", data: product.detailedDescriptions },
    { id: "service", label: "Service & Warranty", data: product.serviceAndDeliveries },
  ];

  return (
    <div className="w-full">
      {/* Tab Headers */}
      <div className="flex border-b border-gray-200 gap-8">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`pb-4 text-sm font-medium transition-all relative ${
              activeTab === tab.id
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="py-8">
        {tabs.find((t) => t.id === activeTab)?.data ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4">
            {tabs
              .find((t) => t.id === activeTab)
              ?.data.map((item: any, idx: number) => (
                <div key={idx} className="flex justify-between border-b border-gray-100 py-3">
                  <span className="text-gray-500 font-medium">{item.enLabel}</span>
                  <span className="text-gray-900 text-right">
                    {item.values.map((v: any) => v.enName).join(", ")}
                  </span>
                </div>
              ))}
          </div>
        ) : (
          <p className="text-gray-400 italic">No information available for this section.</p>
        )}
      </div>
    </div>
  );
}