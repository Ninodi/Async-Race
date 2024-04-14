import React from 'react'
import { NavLink } from 'react-router-dom'

function Header() {
  return (
    <div className='header'>
        <NavLink to={'/'}>Garage View</NavLink>
        <NavLink to={'/winners'}>Winners View</NavLink>
    </div>
  )
}

export default Header