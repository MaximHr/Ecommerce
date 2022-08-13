import React, {useState, useEffect, useContext, createContext} from 'react';
import {toast} from 'react-hot-toast';

const Context = createContext();

export const StateContext = ({children}) => {
    const [showCart, setShowCart] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [totalQuantity, setTotalQuantity] = useState(0);
    const [qty, setQty] = useState(1);
    const [clickedSize, setClickedSize] = useState(0);
    
    const [toggleThemes, setToggleThemes] = useState(false);

    const getSize = (index) => {
        setClickedSize(index);
    }

    const onAdd = (product, quantity) => {
        let individualProducts = [];
        let checkProductInCart = [];
        let correctIndex = 0;
        
        if(product.size) {
            for(let i = 0;i < product.size.length; i++) {
                individualProducts.push({...product, yourSize : product.size[i], _id: product._id + Math.random() * 1000})
            }
            
            correctIndex = clickedSize;

            checkProductInCart = cartItems.find(item => item._id == individualProducts[correctIndex]._id);
        
        }
        if(!product.size) {
            individualProducts.push(product);

            correctIndex = 0;

            checkProductInCart = cartItems.find(item => item._id == individualProducts[correctIndex]._id);

            setClickedSize(0);
        }

        console.log(individualProducts, clickedSize);
        
        
        setTotalPrice(prev => prev + (individualProducts[correctIndex].price * quantity));
        setTotalQuantity(prev => prev + quantity);

        // if this tshirt is already in the cart
        if(checkProductInCart) {   
            
            const updatedCartItems = cartItems.map(item => {
                if(item._id == individualProducts[correctIndex]._id) {
                    return {
                        ...item,
                        quantity: item.quantity + quantity,
                        // yourSize: clickedSize
                        
                    }
                } else {
                    return {
                        ...item
                    }
                }
            })
            console.log(updatedCartItems)
            setCartItems(updatedCartItems);

        } else {
            //if this tshirt is not bought yet
            individualProducts[correctIndex].yourSize = correctIndex;
            individualProducts[correctIndex].quantity = quantity;
            
            setCartItems([...cartItems, individualProducts[correctIndex]]);
            console.log(cartItems)
        }
        toast.success(`${qty} ${product.title} added to the cart!`)
    }


    const incQty = () => {
        setQty((prev) => prev + 1);
    }
    const decQty = () => {
        setQty((prev) => {
            if(prev - 1 < 1) return 1;
            return prev - 1;
        });
    }
    const toggleCartItemQuantity = (item, value) => {
        const index = cartItems.findIndex((product) => product._id === item._id );
        const newCartItems = [...cartItems];

        if(value == 'dec') {
            if(item.quantity > 1) {
                newCartItems.map(cartItem => {
                    if(cartItem._id === item._id) {
                        cartItem.quantity = item.quantity - 1;
                    }
                })
                setCartItems([...newCartItems]);
                setTotalPrice(prev => prev - item.price);
                setTotalQuantity(prev => prev - 1);
            }

        } else if(value == 'inc') {
            console.log(item)
            newCartItems.map(cartItem => {
                if(cartItem._id === item._id) {
                    cartItem.quantity = item.quantity + 1;
                }
            })
            setCartItems([...newCartItems]);
            setTotalPrice(prev => prev + item.price);
            setTotalQuantity(prev => prev + 1);
        }
    }

    const onRemove = (product) =>{ 
        const newCartItems = cartItems.filter((item) => item._id !== product._id);
        setTotalPrice(prev => prev - product.price * product.quantity)
        setTotalQuantity(prev => prev - product.quantity)
        setCartItems(newCartItems)
    }
    return(
        <Context.Provider value={{
            showCart,
            cartItems,
            totalPrice,
            totalQuantity,
            qty,
            incQty,
            decQty,
            onAdd,
            setShowCart,
            toggleCartItemQuantity,
            onRemove,
            setCartItems,
            setTotalPrice,
            setTotalQuantity,
            clickedSize,
            getSize,
            toggleThemes,
            setToggleThemes
        }}>
            {children}
        </Context.Provider>
    )
}

export const useStateContext = () => useContext(Context);