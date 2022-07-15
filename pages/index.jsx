import React, {useState} from 'react';
import {Product, FooterBanner, HeroBanner} from '../components';
import {client} from '../lib/client';

const index = ({products, bannerData}) => {
    const [moveLine, setMoveLine] = useState(1);
    return(
        <div>
            <HeroBanner banner={bannerData && bannerData[0]}/>
            <div className='products-heading'>
                <h2>Our Products</h2>
            </div>
            <div className="types">
                <h2 onClick={() => setMoveLine(1)}>All</h2>
                <h2 onClick={() => setMoveLine(2)}>Clothing</h2>
                <h2 onClick={() => setMoveLine(3)}>Accessories</h2>
                <div className="line" style={
                    moveLine === 1 ? {left: '20px'} :
                    moveLine === 2 ? {left: '125px'} :
                    moveLine === 3 ? {left: '290px'} : {}
                }></div>
            </div>
            <div className='products-container'>
               {
                products?.map(product => {
                    return(
                        <Product 
                            key={product._id} 
                            moveLine={moveLine} 
                            product={product} 
                        />
                    )
                })
               }
            </div>
            <FooterBanner banner={bannerData && bannerData[1]}/>
        </div>
    )
}

export const getServerSideProps = async() => {
    const productQuery = '*[_type=="product"]';
    const products = await client.fetch(productQuery);

    const bannerQuery = '*[_type=="banner"]';
    const bannerData = await client.fetch(bannerQuery);

    return {
        props: {products, bannerData}
    }
}

export default index;