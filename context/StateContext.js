import React, {useState, useEffect, useContext, createContext} from 'react';
import {toast} from 'react-hot-toast';

const Context = createContext();

export const StateContext = ({children}) => {
    const [showCart, setShowCart] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [totalQuantity, setTotalQuantity] = useState(0);
    const [qty, setQty] = useState(1);

    const onAdd = (product, quantity) => {
        const checkProductInCart = cartItems.find(item => item._id == product._id);
        
        setTotalPrice(prev => prev + (product.price * quantity));
        setTotalQuantity(prev => prev + quantity);

        if(checkProductInCart) {   
            const updatedCartItems = cartItems.map(item => {
                if(item._id == product._id) {
                    return {
                        ...item,
                        quantity: item.quantity + quantity
                        
                    }
                }
            })
            setCartItems(updatedCartItems);
        } else {
            product.quantity = quantity;
            setCartItems([...cartItems, {...product}]);
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
        const index = cartItems.findIndex((product) => product._id === item._id);
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
            onRemove
        }}>
            {children}
        </Context.Provider>
    )
}

export const useStateContext = () => useContext(Context);