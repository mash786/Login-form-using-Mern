import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom'; // Import BrowserRouter, Routes, and Route
import App from './App';
import AboutUs from './AboutUs'; // Import your AboutUs component

ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} /> {/* Define your root route */}
      <Route path="/about-us" element={<AboutUs />} /> {/* Define the /about-us route */}
    </Routes>
  </BrowserRouter>,
  document.getElementById('root')
);


export default App;
