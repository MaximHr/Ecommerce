import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useStateContext } from '../context/StateContext';
import { urlFor } from '../lib/client';

const Product = ({product: {image, title, slug, price, sort}, moveLine, searchText}) => {

  const { toggleThemes } = useStateContext();
  const [isSearched, setIsSearched] = useState(true);
  
  useEffect(() => {
    if(searchText && title) {
      setIsSearched(title.toLowerCase().includes(searchText.toLowerCase()))
    } else {
      setIsSearched(true);
    }
  }, [searchText])
  
  return (
    <div style={
      moveLine === 2 && sort === 'accessories' ? {display: 'none'} :
      moveLine === 3 && sort === 'clothing' ? {display: 'none'} :
      {} &&
      isSearched ? ({}) : ({display: 'none'})
    }>
      <Link href={`/product/${slug.current}`}>
        <div className="product-card track">
          <img 
            width={250} 
            height={250} 
            src={urlFor(image && image[0])} 
            alt={title} 
            className='product-image'
          />
          <p className="product-name">{title}</p>
          <p className="product-price" style={toggleThemes ? {color: 'white'} : {} }>{price} USD</p>

        </div>
      </Link>
    </div>
  )
}

export default Product;