import React, {useState} from 'react';
import {Product, FooterBanner, HeroBanner} from '../components';
import {client} from '../lib/client';
import {BiSearch} from 'react-icons/bi';
import { type } from 'os';

const Index = ({products, bannerData}) => {
    const [moveLine, setMoveLine] = useState(1);
    const [searchText, setSearchText] = useState('');

    const typeHandler = (e) => {
        setSearchText(e.target.value);
    }

    return(
        <div>
            <HeroBanner banner={bannerData && bannerData[0]}/>
            <div className='products-heading'>
                <h2>Our Products</h2>
            </div>
            <div className='sort-products'>   
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
                <div className='search-bar'>
                    <input 
                        type="text" 
                        value={searchText}
                        onChange={typeHandler}
                        className='input' 
                        placeholder='Metallica, Pantera...' 
                    />
                    <BiSearch />
                </div>
            </div>
            
            <div className='products-container'>
               {
                products?.map(product => {
                    return(
                        <Product 
                            key={product._id} 
                            moveLine={moveLine} 
                            product={product}
                            searchText={searchText} 
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

export default Index;