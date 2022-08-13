import React from 'react';
import Link from 'next/link';
import { urlFor } from '../lib/client';
import { useStateContext } from '../context/StateContext';

const HeroBanner = ({banner}) => {
  const { toggleThemes } = useStateContext();

  return (
    <div className='hero-banner-container' style={toggleThemes ? {background: 'rgb(171, 6, 4)'} : {} }>
      <div className='firstDiv'>
        <h3>{banner.midText}</h3>
        <h1>{banner.largeText1}</h1>
        <img src={urlFor(banner.image)} alt="tshirts"  className='hero-banner-image'/>
        <div>
          <Link href={`/product/${banner.product}`}>
            <button type='button' style={toggleThemes ? {color: 'rgb(171, 6, 4)'} : {} }>{banner.buttonText}</button>
          </Link>
        </div>
        <div className="desc">
          <p className='beats-solo'>{banner.desc}</p>
        </div>
      </div>
    </div>
  )
}

export default HeroBanner;