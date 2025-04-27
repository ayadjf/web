import React from 'react';

import Create from './components/Create'; 
import './App.css';
import Sidebar from './components/Sidebar';

const App = () => {
  return (
    <div className="dashboard">
      <Sidebar />
      <div className="dashboard--content">
        <Create/>
      </div>
    </div>
  );
};

export default App;
