'use client';

import { useState } from 'react';

export default function FilterCourts() {
  const [filters, setFilters] = useState({
    name: '',
    location: '',
    priceRange: '',
    availability: ''
  });

  const handleFilterChange = (field, value) => {
    setFilters(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <section className="bg-custom-bg rounded-lg shadow-lg p-3 md:p-4 w-full mt-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Search by Name
          </label>
          <input
            type="text"
            placeholder="Enter court name..."
            value={filters.name}
            onChange={(e) => handleFilterChange('name', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent-yellow focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Location
          </label>
          <select
            value={filters.location}
            onChange={(e) => handleFilterChange('location', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent-yellow focus:border-transparent"
          >
            <option value="">All Locations</option>
            <option value="downtown">Downtown</option>
            <option value="uptown">Uptown</option>
            <option value="suburbs">Suburbs</option>
            <option value="airport">Airport Area</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Price Range
          </label>
          <select
            value={filters.priceRange}
            onChange={(e) => handleFilterChange('priceRange', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent-yellow focus:border-transparent"
          >
            <option value="">All Prices</option>
            <option value="low">$0 - $50</option>
            <option value="medium">$51 - $100</option>
            <option value="high">$101+</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Availability
          </label>
          <select
            value={filters.availability}
            onChange={(e) => handleFilterChange('availability', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent-yellow focus:border-transparent"
          >
            <option value="">All Times</option>
            <option value="morning">Morning (6AM-12PM)</option>
            <option value="afternoon">Afternoon (12PM-6PM)</option>
            <option value="evening">Evening (6PM-12AM)</option>
          </select>
        </div>
      </div>

      <div className="mt-6 flex justify-center">
        <button className="bg-accent-yellow text-primary-text px-6 py-2 rounded-md font-semibold hover:bg-yellow-500 transition-colors">
          Apply Filters
        </button>
      </div>
    </section>
  );
}