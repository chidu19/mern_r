import React, { useState } from "react";
import BarChart from "./components/BarChart";
import PieChart from "./components/PieChart";
import Statistics from "./components/Statistics";
import TransactionList from "./components/TransactionList";
import "./App.css";

const App = () => {
  const [month, setMonth] = useState(1);

  return (
    <div className="app">
      {/* Top Section */}
      <div className="top-section">
        <h1>TransactionList</h1>
      </div>

      {/* Statistics */}
      <Statistics month={month} />

      {/* Transaction List */}
      <TransactionList month={month} />

      {/* Bar Chart */}
      <div className="chart-container">
        <BarChart month={month} />
      </div>

      {/* Pie Chart */}
      <div className="chart-container">
        <PieChart month={month} />
      </div>
    </div>
  );
};

export default App;
