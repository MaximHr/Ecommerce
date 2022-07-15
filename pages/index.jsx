import React from 'react';
import {Product, FooterBanner, HeroBanner} from '../components';
import {client} from '../lib/client';

const index = ({products, bannerData}) => {
    return(
        <div>
            <HeroBanner banner={bannerData && bannerData[0]}/>
            <div className='products-heading'>
                <h2>Our Products</h2>
            </div>
            <div className='products-container'>
               {
                products?.map(product => {
                    return(
                        <Product key={product._id} product={product}/>
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