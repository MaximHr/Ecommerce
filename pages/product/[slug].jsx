import React, {useState} from 'react';
import {client, urlFor} from '../../lib/client';
import {AiOutlineMinus, AiOutlinePlus, AiFillStar, AiOutlineStar} from 'react-icons/ai'
import {Product} from '../../components';
import { useStateContext } from '../../context/StateContext';

const ProductDetails = ({product, simularProducts}) => {
  const {image, title, details, price, reviews, stars} = product;
  const [index, setIndex] = useState(0);
  const {decQty, incQty, qty, onAdd, setShowCart} = useStateContext();

  return (
    <div>
    <div className="product-detail-container">
      <div>
        <div className="image-container">
          <img src={urlFor(image && image[index])} className="product-detail-image" />
        </div>
        <div className="small-images-container">
          {image?.map((item, i) => (
            <img 
              key={i}
              src={urlFor(item)}
              className={i === index ? `small-image selected-image` : `small-image`}
              onMouseEnter={() => setIndex(i)}
            />
          ))}
        </div>
      </div>

      <div className="product-detail-desc">
        <h1>{title}</h1>
        <div className="reviews">
          <div>
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
        <h4>Details: </h4>
        <p>{details}</p>
        <p className="price">{price} USD</p>
        <div className="quantity">
          <h3>Quantity:</h3>
          <p className="quantity-desc">
            <span className="minus" onClick={decQty}><AiOutlineMinus /></span>
            <span className="num">{qty}</span>
            <span className="plus" onClick={incQty}><AiOutlinePlus /></span>
          </p>
        </div>
        <div className="buttons">
          <button type="button" className="add-to-cart" onClick={() => {
            onAdd(product, qty);
          }}>Add to Cart</button>
          <button type="button" className="buy-now" onClick={() => {
            onAdd(product, qty);
            setShowCart(true);
          }}>Buy Now</button>
        </div>
      </div>
    </div>
    <div className='maylike-products-wrapper'>
        <h2>You May Also Like</h2>
        <div className='marquee'>
          <div className='maylike-products-container track'>
            
            {
              simularProducts.map((item) => {
                return(
                  <>
                    <Product key={item._id} product={item} />
                  </>
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

  const queryProducts = '*[_type == "product"]';
  const simularProducts = await client.fetch(queryProducts);

  return {
    props: { 
      product, 
      simularProducts
    }
  }
}

export default ProductDetails;