import React from 'react';
import './Averagestats.css';

const AverageStats = () => {
  return (
    <div className="average-stats-container">
      <div className="stat-item">
        <div className="stat-title">Average Mark</div>
        <div className="stat-value">07.36</div>
      </div>
      <div className="stat-item">
        <div className="stat-title">Attendance</div>
        <div className="stat-value">23/29</div>
      </div>
    </div>
  );
};

export default AverageStats;