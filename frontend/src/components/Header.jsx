import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className='sticky-header'>
      <span>InnovativeStack Task</span>
      <div className='header-links'>
        <Link to='/'>Home</Link>
        <Link to='/about'>About</Link>
      </div>
    </header>
  );
};

export default Header;
