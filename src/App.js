// IMPORTING STYLES

import "./style/general.css"
import 'aos/dist/aos.css';
import 'nprogress/nprogress.css'
import 'react-loading-skeleton/dist/skeleton.css'

// IMPORT PACKAGES

import { useEffect, useState } from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Aos from 'aos';

// IMPORT COMPONENTS

import NavigationBar from "./components/navbar.jsx"
import ScrollToTop from "./components/scrolltop";
import Footer from "./components/footer.jsx"

// IMPORT PAGES

import Home from "./pages/home.jsx"
import Blog from "./pages/blog.jsx"
import Projects from "./pages/projects";

export default function App() {

  Aos.init()

  return (
    <Router>
      <div className="wrap">
        <div className="wrapper">
          <NavigationBar/>
          <ScrollToTop/>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/projects" element={<Projects />} />
          </Routes>
        </div>
        <Footer/>
      </div>
    </Router>
  )

}
