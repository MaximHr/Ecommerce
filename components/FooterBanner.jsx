import React from 'react';
import Link from 'next/link';
import { urlFor } from '../lib/client';
import { useStateContext } from '../context/StateContext';

const FooterBanner = ({banner}) => {

  const { toggleThemes } = useStateContext();

  return (
    <div className='footer-banner-container'>
      <div className='banner-desc'>
        <div className='left'>
          <h3>{banner.largeText1}</h3>
          <h3>{banner.largeText2}</h3>
        </div>
        <div className="right">
          <h3>{banner.midText}</h3>
          <h3>{banner.desc}</h3>
          <Link href={`/product/${banner.product}`}>
            <button type='button' style={toggleThemes ? {backgroundColor: 'rgb(171, 6, 4)'} : {} }>{banner.buttonText}</button>
          </Link>
        </div>
        <img 
          className='footer-banner-image' 
          src={urlFor(banner.image)} 
          alt="Banner" 
        />
      </div>
    </div>
  )
}

export default FooterBanner;