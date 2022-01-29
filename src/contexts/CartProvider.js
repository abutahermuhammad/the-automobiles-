import { createContext, useEffect, useState } from "react"


// Creating Auth Context
export const CartContext = createContext();

// Cart Provider
const CartProvider = ({children}) => {
    const allContext = Cart();

    return (
        <CartContext.Provider value={allContext}>
            {children}
        </CartContext.Provider>
    );
}
export default CartProvider;


const Cart = () => {
    const [cart, setCart] = useState([]);
    const [total, setTotal] = useState(0);
    const [vat, setVat] = useState(0);
    const [subTotal, setSubTotal] = useState(0);

    const setLocalStorage = (name, data) => localStorage.setItem(name, JSON.stringify(data));
    const getLocalStorage = (name) => localStorage.getItem(name);

    /**
     * This hook get fired after the page loading finised.
     * Here checking previus cart data in the localstorage.
     * When previous cart data available, adding it to the `cart` state.
     */
    useEffect(()=> {
        if (cart.length <= 0) {
            let cartData = JSON.parse(getLocalStorage('cart'));
            if (cartData) {
                setCart(cartData);

                updateSubTotal(cartData);
                updateTotal();
            }
            
        }
    }, []);
    useEffect(()=> {
        updateTotal();
    }, [subTotal]);


    /**
     * Here checking the data availability in the cart state with id. 
     * It returns boolean value based on data availability.
     * `true` if available or else `false`.
     */
    function isItemExist(id) { 
        let temp = false;

        if (cart.length > 0 ) {
            for (var n = 0; n < cart.length; n++) {
                if (cart[n]._id === id) {
                    temp = true;
                } else {
                    temp = false;
                }
            }
        }

        return temp;
    }

    /**
     * setToCart 
     * This handler add items in the cart.
     * Firtly, it check for product availablity in the cart. 
     * If available? Increase the quantity. or else add as new item.
     * @param {*} _id 
     * @param {*} title 
     * @param {*} price 
     */
    const setToCart = async (_id, title, price) => {
        let is = isItemExist(_id);  // Existance statues

        if (is) {
            let tempCart = cart;

            for (var i = 0; i < tempCart.length; i++) {
                if (tempCart[i]._id === _id) {
                    tempCart[i].quantity += 1;
                }
            }

            setCart(tempCart);
        }

        if (!is) {
            const temp = {
                _id,
                title,
                price,
                quantity: 1
            }

            setCart([
                ...cart,
                temp
            ])
        }

        setLocalStorage('cart', cart);
        updateSubTotal(cart);
    };

    /**
     * This functio will calculate and update cart total.
     * @param {*} c 
     */
    let updateSubTotal = (c) => {
        let temp = 0;
        c.forEach(item => {
            temp = temp + (item.price * item.quantity);
        })
        
        setSubTotal(temp);
    }

    /**
     * updateTotal
     * This function update the total price of the cart.
     */
    const updateTotal = () => {
        let tempTotal = 0;

        tempTotal = subTotal + vat;

        setTotal(tempTotal)
    }

    const removeFromCart = () => setCart({});

    /**
     * clearCart
     * This function clears the cart.
     */
    const clearCart = () => {
        setCart({});  // Cleaning the state. 
        setLocalStorage('cart', []);  // Cleaning the storage.

    };

    return {
        cart,
        subTotal,
        vat,
        total,
        setToCart,
        removeFromCart,
        clearCart
    }
}
