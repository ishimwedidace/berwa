import React from 'react'
import HOME from './components/HOME'
import REGISTER from './components/REGISTER'
import REPORT from './components/REPORT'
import REPORT1 from './components/REPORT'
import EDIT from './components/EDIT'
import { BrowserRouter as Router, Routes, Route,Link } from 'react-router-dom'

function App() {
  return (
    <div>
      <Router>
        <nav className='bg-blue-500 p-4'>
          <div className="container mx-auto flex justify-between items-center">
          <ul className="flex space-x-4 text-white font-medium">
            <li>
              <Link to="/" className='hover:text-yellow-300'>Home</Link>
            </li>
            <li>
              <Link to="/register" className='hover:text-yellow-300'>Register</Link>
            </li>
            <li>
              <Link to="/report" className='hover:text-yellow-300'>Report</Link>
            </li>
            <li>
              <Link to="/report1" className='hover:text-yellow-300'>sort</Link>
            </li>
          </ul>
          </div>
        </nav>

        <Routes>
          <Route path="/" element={<HOME />} />
          <Route path="/register" element={<REGISTER />} />
          <Route path="/report" element={<REPORT />} />
          <Route path="/report1" element={<REPORT />} />
          <Route path="/EDIT/:id" element={<EDIT />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
