import React, {useState} from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {AiOutlineShopping} from 'react-icons/ai';
import {Cart} from './';
import { useStateContext } from '../context/StateContext';
import logoWhite from '../images/logo-white.png'
import logoBlack from '../images/logo-black.png';

const Navbar = () => {
  const {showCart, setShowCart, totalQuantity, toggleThemes, setToggleThemes} = useStateContext();

  const themeHandler = () => {
    setToggleThemes(!toggleThemes);
    if(toggleThemes) {
       document.documentElement.style.setProperty('--secondary-color', '#f02d34');
        document.documentElement.style.setProperty('--text-color', '#324d67');
        document.documentElement.style.setProperty('--background-color', '#fff');
        document.documentElement.style.setProperty('--body-color', '#fff');

    } else {
      document.documentElement.style.setProperty('--secondary-color', '#fff');
      document.documentElement.style.setProperty('--text-color', 'rgb(171, 6, 4)');
      document.documentElement.style.setProperty('--background-color', '#fff');
      document.documentElement.style.setProperty('--body-color', 'rgb(10, 10, 10)');
    }
  }
  return (
    <div className='navbar-container'>
      <div className="themes" onClick={themeHandler}>
        <div className="circle" style={toggleThemes ? {transform: 'translateX(100%)'} : {transform: 'translateX(0%)'} }></div>       
      </div>
      <Link href='/' >
        <div className='logo'> 
          <div className="logo-image-container">
            {
              toggleThemes ? (
                <Image 
                  src={logoBlack} 
                  className='logo-img' 
                  alt="Logo" 
                  objectFit='contain'
                />
              ) : (
                <Image 
                  src={logoWhite} 
                  className='logo-img' 
                  alt="Logo" 
                  objectFit='contain'
                />
              )
            }
            
          </div>
          <p style={toggleThemes ? {color: 'white'} : {} }>яБългар</p>
        </div>
       
      </Link>
      <button className='cart-icon' type='button' onClick={() => setShowCart(true)}>
        <AiOutlineShopping />
        <span className='cart-item-qty' style={toggleThemes ? {color: 'black'} : {} }>{totalQuantity}</span>
      </button>
      {
        showCart ? ( <Cart />) : <></>
      }
    </div>
  )
}

export default Navbar;