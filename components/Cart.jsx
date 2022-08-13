import React, {useRef} from 'react'
import toast from 'react-hot-toast';
import { AiOutlineMinus, AiOutlinePlus, AiOutlineLeft, AiOutlineShopping} from 'react-icons/ai';
import { TiDeleteOutline} from 'react-icons/ti';
import Link from 'next/link';
import {urlFor} from '../lib/client'
import {useStateContext} from '../context/StateContext';
import shopping from '../images/shopping.png';
import Image from 'next/image';
import getStripe from '../lib/getStripe';

const Cart = () => {
  const cartRef = useRef();
  const {totalPrice, totalQuantity, cartItems, setShowCart, toggleCartItemQuantity, onRemove, toggleThemes} = useStateContext();

  const handleCheckOut = async () => {
    const stripe = await getStripe();

    const response = await fetch('/api/stripe', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(cartItems) ,
    });


    if(response.statusCode === 500) return;
    const data = await response.json();

    toast.loading('Redirecting...');

    stripe.redirectToCheckout({ sessionId: data.id });
  }


  return (
    <div className='cart-wrapper' ref={cartRef}>
      <div className="cart-container">
        <button type='button' className='cart-heading' onClick={() => setShowCart(false)}>
            <AiOutlineLeft />
            <span className="heading">Your Cart</span>
            <span className="cart-num-items">({totalQuantity} items)</span>
        </button>
        {
          cartItems.length < 1 && (
            <div className='empty-cart'>
              <Image src={shopping} alt='empty shopping bags'/>
              <h3>Your shopping bag is empty</h3>
              <Link href='/'>
                <button style={toggleThemes ? {backgroundColor: 'rgb(171, 6, 4)'} : {} } className='btn' type='button' onClick={() => setShowCart(false)}>
                  Continue Shopping
                </button>
              </Link>
            </div>
          )
        }
        <div className="product-container">
          {
            cartItems.length >= 1 && cartItems.map((item, index) => {
              return (
                <div className="product" key={item._id}>
                  <img src={urlFor(item?.image[0])} alt="" className='cart-product-image'/>
                  <div className='item-desc'>
                    <div className="flex top">
                      <h5>{item.title} ({item.size ? item.size[item?.yourSize] : ''})</h5>
                      <h4>$ {item.price}</h4>
                    </div>
                    <div className="flex bottom">  
                      <div className="quantity">
                        <p className="quantity-desc">
                          <span 
                            style={toggleThemes ? {color: 'rgb(171, 6, 4)'} : {} }
                            className="minus" 
                            onClick={() => toggleCartItemQuantity(item, 'dec')}
                            > 
                            <AiOutlineMinus />
                          </span>
                          <span className="num">{item.quantity}</span>
                          <span 
                            className="plus" 
                            onClick={() => toggleCartItemQuantity(item, 'inc')}
                          >
                              <AiOutlinePlus />
                          </span>
                        </p>
                      </div>
                      <button type='button' onClick={() => onRemove(item)} className='remove-item' style={toggleThemes ? {color: 'rgb(171, 6, 4)'} : {} }>
                        <TiDeleteOutline />
                      </button>
                    </div>
                  </div>
                </div>
              )
            })
          }
        </div>
          {
            cartItems.length >= 1 && (
              <div className="cart-bottom">
                <div className="total">
                  <h3>Subtotal: </h3>
                  <h3>${totalPrice}</h3>
                </div>
                <div className="btn-container">
                  <button style={toggleThemes ? {backgroundColor: 'rgb(171, 6, 4)'} : {} } type='button' onClick={handleCheckOut} className='btn'>
                    PAY NOW
                  </button>
                </div>
              </div>
            )
          }
      </div>
    </div>
  )
}

export default Cart;