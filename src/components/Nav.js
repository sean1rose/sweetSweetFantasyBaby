import React from 'react';
import {NavLink} from 'react-router-dom';

// NavLink is the same as Link - both render an anchor tag, but navlink allows you to change css on active link
const Nav = () => (
  <ul className='nav'>
    <li><NavLink exact activeClassName='active' to='/'>Home</NavLink></li>
    <li><NavLink exact activeClassName='active' to='/battle'>Battle</NavLink></li>
    <li><NavLink activeClassName='active' to='/roster'>Roster</NavLink></li>
    <li><NavLink activeClassName='active' to='/schedule'>Schedule</NavLink></li>
  </ul>
);

export default Nav;