import React, { useState, useEffect } from 'react';
import './Header.css'

const Header = (props) => {
  

  const handleSubmit = (event) => {
    event.preventDefault();
    props.performSearch(event.target.firstChild.value);
  }

  return(
    <div className='header'>
      <form onSubmit={handleSubmit}>
        <input type='text' />
        <input type='submit' />
      </form>
    </div>
  )
}

export default Header;