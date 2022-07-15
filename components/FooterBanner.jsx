import React from 'react';
import Link from 'next/link';
import { urlFor } from '../lib/client';

const FooterBanner = ({banner}) => {
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
            <button type='button'>{banner.buttonText}</button>
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