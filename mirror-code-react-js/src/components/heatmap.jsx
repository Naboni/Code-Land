import React, { useEffect } from 'react';
import CalendarHeatmap from 'react-calendar-heatmap';
import './react-heatmap.css';

import 'react-calendar-heatmap/dist/styles.css';

const today = new Date();

export default function Heatmap({ solutions }) {
  const heatmapData = Array(365).fill(0); // Initialize the heatmapData array
  heatmapData[350] = 2;
  heatmapData[312] = 1;
  console.log(solutions);
  useEffect(() => {
    if (solutions && solutions.length > 0) {
      solutions.forEach((solution) => {
        const createdAt = new Date(solution.createdAt);
        const diffTime = Math.abs(today - createdAt);
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
        if (diffDays < 366) {
          heatmapData[diffDays]++;
          console.log('hhhhhhhhhhhhhhhh', diffDays, heatmapData[diffDays]);
        }
      });
    }
  }, [solutions, today]);

  const calendarData = getRange(366).map((index) => {
    return {
      date: shiftDate(today, -index),
      count: heatmapData[index],
    };
  });

  console.log(
    'calendarData',
    calendarData,
    calendarData.filter((data) => data.count > 0)
  );
  console.log(
    'heatmapData',
    heatmapData,
    heatmapData.filter((data) => data > 0)
  );

  return (
    <div className="react-calendar-heatmap">
      <CalendarHeatmap
        startDate={shiftDate(today, -366)}
        endDate={today}
        values={calendarData}
        classForValue={(value) => {
          if (!value) {
            return 'color-empty';
          }
          return `${value.count}` < 5 ? `color-github-${value.count}` : `color-github-5`;
        }}
        showWeekdayLabels={false}
      />
    </div>
  );
}

function shiftDate(date, numDays) {
  const newDate = new Date(date);
  newDate.setDate(newDate.getDate() + numDays);
  return newDate;
}

function getRange(count) {
  return Array.from({ length: count }, (_, i) => i);
}
