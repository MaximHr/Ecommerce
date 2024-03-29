import React, {useState} from 'react';
import {client, urlFor} from '../../lib/client';
import {AiOutlineMinus, AiOutlinePlus, AiFillStar, AiOutlineStar} from 'react-icons/ai'
import {Product} from '../../components';
import { useStateContext } from '../../context/StateContext';

const ProductDetails = ({product, simularProducts}) => {
  const {image, title, details, price, reviews, stars, size} = product;
  const [index, setIndex] = useState(0);
  const {decQty, incQty, qty, onAdd, setShowCart, clickedSize, getSize, toggleThemes} = useStateContext();

  return (
    <div>
    <div className="product-detail-container">
      <div>
        <div className="image-container">
          <img src={urlFor(image && image[index])} className="product-detail-image" alt=""/>
        </div>
        <div className="small-images-container">
          {image?.map((item, i) => (
            <img 
              key={i}
              alt=""
              src={urlFor(item)}
              className={i === index ? `small-image selected-image` : `small-image`}
              onMouseEnter={() => setIndex(i)}
            />
          ))}
        </div>
      </div>

      <div className="product-detail-desc">
        <h1 style={toggleThemes ? {color: 'rgb(255, 255, 255)'} : {} }>{title}</h1>
        <div className="reviews">
          <div style={toggleThemes ? {color: 'rgb(171, 6, 4)'} : {} }>
            {
              stars === 1 ? (
                <>
                  <AiFillStar />
                  <AiOutlineStar />
                  <AiOutlineStar />
                  <AiOutlineStar />
                  <AiOutlineStar />
                </>

              ) : stars === 2 ? (
                <>
                  <AiFillStar />
                  <AiFillStar />
                  <AiOutlineStar />
                  <AiOutlineStar />
                  <AiOutlineStar />
                </>
              ) : stars === 3 ? (
                <>
                  <AiFillStar />
                  <AiFillStar />
                  <AiFillStar />
                  <AiOutlineStar />
                  <AiOutlineStar />
                </>
              ) : stars === 4 ? (
                <>
                  <AiFillStar />
                  <AiFillStar />
                  <AiFillStar />
                  <AiFillStar />
                  <AiOutlineStar />
                </>
              ) : (
                <>
                  <AiFillStar />
                  <AiFillStar />
                  <AiFillStar />
                  <AiFillStar />
                  <AiFillStar />
                </>
              )
            }
          </div>
          <p>
            ({reviews})
          </p>
        </div>
        <h4 style={toggleThemes ? {color: 'rgb(255, 255, 255)'} : {} }>Details: </h4>
        <p>{details}</p>
        <p className="price" style={toggleThemes ? {color: 'rgb(171, 6, 4)'} : {} }>{price} USD</p>
        <div className="quantity">
          <h3 style={toggleThemes ? {color: 'rgb(255, 255, 255)'} : {} }>Quantity:</h3>
          <p className="quantity-desc">
            <span className="minus" onClick={decQty}><AiOutlineMinus /></span>
            <span className="num">{qty}</span>
            <span className="plus" onClick={incQty}><AiOutlinePlus /></span>
          </p>
        </div>
        {
          size ? (
        <div className='sizes-container'>
          <h3 style={toggleThemes ? {color: 'rgb(255, 255, 255)'} : {} }>Size: </h3>
          <div className="sizes">
            {
              size?.map((s ,index) => {
                return(
                  <div 
                    style={toggleThemes ? {color: 'rgb(255, 255, 255)'} : {} }
                    key={index}
                    onClick={() => getSize(index)} 
                    className={`size ${clickedSize === index ? 'clicked' : ''} ${toggleThemes ? 'dark' : ''}`}>
                      {s}
                    </div>
                )
              })
            }
          </div>
        </div>
          ) : (<></>)
        }
        
        <div className="buttons" >
          <button style={toggleThemes ? {color: 'rgb(171, 6, 4)'} : {} } type="button" className="add-to-cart" onClick={() => {
            onAdd(product, qty);
          }}>Add to Cart</button>
          <button type="button" style={toggleThemes ? {backgroundColor: 'rgb(171, 6, 4)'} : {} } className="buy-now" onClick={() => {
            onAdd(product, qty);
            setShowCart(true);
          }}>Buy Now</button>
        </div>
      </div>
    </div>
    <div className='maylike-products-wrapper'>
        <h2>You May Also Like</h2>
        <div className='marquee'>
          <div className='maylike-products-container'>
            
            {
              simularProducts.map((item) => {
                return(
                  <Product key={item._id} product={item} />
                )
              })
            }
          </div>
        </div>
    </div>
  </div>
  )
}

export const getStaticPaths = async() => {
  const query = `*[_type == "product"] {
    slug {
      current
    }
  }
  `;

  const products = await client.fetch(query);

  const paths = products.map(product => ({
    params: {
      slug: product.slug.current
    }
  }))
  return {
    paths,
    fallback: 'blocking'
  }
}

export const getStaticProps = async({params:{slug}}) => {
  const query = `*[_type == "product" && slug.current=='${slug}'][0]`;
  const product = await client.fetch(query);
  console.log(product.sort)
  const queryProducts = `*[_type == "product" && sort == '${product.sort}']`;
  const simularProducts = await client.fetch(queryProducts);

  return {
    props: { 
      product, 
      simularProducts
    }
  }
}

export default ProductDetails;