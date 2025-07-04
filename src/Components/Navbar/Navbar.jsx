import React from 'react'
import { NavLink } from 'react-router-dom'

export default function Navbar() {
  return (<>
        <nav className="navbar navbar-expand-lg   bg-main-light  mb-4  ">
        <div className="container ">
          <NavLink className="navbar-brand mt-2 main-color fw-bold fs-1" to="/">
         <em>Noxe</em>   
          </NavLink>
          
          <button
            className="navbar-toggler main-bg"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon  " />
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mb-auto mb-4 mb-lg-0 mt-2 pt-1 ms-4">
              <li className="nav-item">
                <NavLink className="nav-link active text-white" aria-current="page" to="/">
                  Home
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink className="nav-link text-white" to="/movies">
                  Movies
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link text-white" to="/tvshow">
                  Tvshow
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link text-white" to="/people">
                  People
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
  </>
  )
}
