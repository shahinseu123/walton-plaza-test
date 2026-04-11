"use client"
import { useState } from 'react';

 export const SortSection = () => {
  const [sortBy, setSortBy] = useState('price-asc');

  return (
    <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-100">
      <h2 className="text-xl font-semibold text-gray-800">Products</h2>
      
      <div className="flex items-center gap-4">
        <label className="text-sm font-medium text-gray-500 uppercase tracking-wider">
          Sort by:
        </label>
        
        <div className="">
          <select 
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="border-red-500 rounded-md p-2"
          >
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="rating-desc">Highest Rated</option>
            <option value="newest">Newest Arrivals</option>
          </select>
          
        </div>
      </div>
    </div>
  );
};