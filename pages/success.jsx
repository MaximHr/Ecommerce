import React, {useEffect, useState} from 'react';
import Link from 'next/link';
import {BsBagCheckFill} from 'react-icons/bs'
import { useStateContext } from '../context/StateContext';
import { runFireWorks } from '../lib/utils';

const Success = () => {
    const {setCartItems, setTotalPrice, setTotalQuantity} = useStateContext();

    useEffect(() => {
      setCartItems([]);
      setTotalPrice(0);
      setTotalQuantity(0);
      runFireWorks();
    }, []);

    return (
    <div className='success-wrapper'>
        <div className="success">
          <p className='icon'>
            <BsBagCheckFill />
          </p>
          <h2>Thank you for your order !</h2>
          {/* <p className='email-msg'>Check your email inbox for the receipt</p> */}
          {/* <p className='description'></p> */}
          <Link href='/'>
            <button type='button' className='btn' style={{width: '300px'}}>
              Continue Shopping
            </button>
          </Link>
        </div>
    </div>
  )
}

export default Success;