'use client';

import FilterCourts from './FilterCourts';
import MapSection from './MapSection';
import AllCourts from './AllCourts';

export default function Courts() {
  return (
    <main>
      <FilterCourts />
      <MapSection />
      <AllCourts />
    </main>
  );
} 