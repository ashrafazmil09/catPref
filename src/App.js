import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import WebRoutes from "./routes/web";
import './App.css';

function App() {
  return (
    <Router basename="/catPref">
      <WebRoutes />
    </Router>
  );
}

export default App;