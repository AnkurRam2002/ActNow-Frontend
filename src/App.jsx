import { useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Auth from "./pages/Auth";

function App() {
  document.title="ActNow";

  return (
    //routing for Auth page
    <Router>
      <Routes>
        {/* <a></a> to be removed later with landing page content */}
        <Route path="/" element={<a href="/auth">CLICK ME to go to login pg:</a>} />
        <Route path="/auth" element={<Auth />} />
      </Routes>
    </Router>
  )
}

export default App
