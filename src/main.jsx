import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { createRoot } from 'react-dom/client'
import './globle.css'
import App from './App.jsx'
import CountryCard from './CountryCard.jsx'
import Error from './Error.jsx'


createRoot(document.getElementById('root')).render(
  <Router>
    <Routes>
      <Route path="/" element={<App />} />
      {/* <Route path="/country" element={< CountryCard />} /> */}
      <Route path="/:country" element={< CountryCard />} />
      <Route path="*" element={< Error />} />
    </Routes>
  </Router>
)
