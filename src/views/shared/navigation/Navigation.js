import { Button, Col, Container, Nav, Navbar, NavDropdown, Row, Stack } from "react-bootstrap";
import { Link } from "react-router-dom";
import useAuth from '../../../hooks/useAuth';
import useCart from "../../../hooks/useCart";
import NavigationPrimary from './NavigationPrimary/NavigationPrimary';
import NavigationSecondary from './NavigationSecondary/NavigationSecondary';
import { useEffect, useState } from "react";
import { toURLString } from "../../../utils/url.utils";


const Navigation = () => {
    const { loggedin, user, signoutHandler } = useAuth();
    const { clearCart } = useCart();
    const [products, setProducts] = useState([]);

    useEffect(()=> {
        let url = `${process.env.REACT_APP_API_URI}/product`;

        fetch(url)
        .then(res=> res.json())
        .then(data=> setProducts(data.data));
    }, [])

    // console.log('products: ', products);
    return (
        <>
        <header className='am_navigation'>
            {/* Secondary Navbar */}
            <NavigationSecondary />

            <NavigationPrimary 
                title="The Automobiles" 
                products={products}
                loggedin={loggedin}
                user={user}
                signoutHandler={signoutHandler}
            />
        </header>
        </>
    );
};

export default Navigation;


