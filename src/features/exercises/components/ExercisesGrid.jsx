import React from 'react';

export default function ExercisesGrid({ children }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-8">
      {children}
    </div>
  );
}