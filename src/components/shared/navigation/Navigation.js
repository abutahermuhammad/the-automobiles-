import { Button, Col, Container, Nav, Navbar, NavDropdown, Row, Stack } from "react-bootstrap";
import { TiShoppingCart } from "react-icons/ti";
import { RiUser3Fill } from "react-icons/ri";
import { Link } from "react-router-dom";
import useAuth from '../../../hooks/useAuth';
import NavCartData from "./NavCartData";
import useCart from "../../../hooks/useCart";
import { useEffect, useState } from "react";
import { FaUserAlt } from "react-icons/fa";
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
            <Navbar bg="black" expand="lg" className="shadow" variant="primary">
                <Container>
                    {/* Navbar Brand */}
                    <Navbar.Brand href="/" className="text-primary">The Automobiles</Navbar.Brand>

                    {/* Navigation Menu Toggler */}
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />


                    <Navbar.Collapse id="basic-navbar-nav">
                        {/* Primary Menu */}
                        <Nav className="mx-auto">
                            <Nav.Link href="shop">Shop</Nav.Link>
                            <NavDropdown title="Categories" id="basic-nav-dropdown">
                                {products && products?.map(item=> (
                                    <NavDropdown.Item key={`NMC${item._id}`} href={`/shop/${toURLString(item?.categorie)}`}>{item?.categorie}</NavDropdown.Item>
                                ))}
                                
                            </NavDropdown>
                        </Nav>

                        <Nav className="ml-auto">
                            {/* Logged out state */}
                            { !loggedin && !user.email && (
                                <NavDropdown title={<RiUser3Fill/>} id="basic-nav-dropdown">
                                    <NavDropdown.Item href={`/login`}>Log in</NavDropdown.Item>
                                    <NavDropdown.Item href={`/register`}>Register</NavDropdown.Item>
                                </NavDropdown>
                            )}

                            {/* Logged in state */}
                            {loggedin && user.email && (
                                <NavDropdown 
                                    title={ (user?.photoURL) ? 
                                        <img src={user?.photoURL} alt={user.displayName} style={{borderRadius: 50}} width={26} height={26} /> 
                                        : (<FaUserAlt/>)} 
                                    id="basic-nav-dropdown"
                                >
                                    <NavDropdown.Item>
                                        <span style={{fontSize: 14}}>Signed in as: </span><br />
                                        <p><strong>
                                            {user?.displayName}
                                        </strong></p>
                                    </NavDropdown.Item>
                                    <NavDropdown.Divider />
                                    <NavDropdown.Item href={`/dashboard`}>Dashboard</NavDropdown.Item>
                                    <NavDropdown.Item href={`/dashboard/orders`}>Order</NavDropdown.Item>
                                    <NavDropdown.Item href={`/dashboard/setting`}>Setting</NavDropdown.Item>

                                    <NavDropdown.Item onClick={() => signoutHandler()} >Log out</NavDropdown.Item>
                                </NavDropdown>
                            )}
                                
                            
                            <NavDropdown align={{ lg: 'end' }} title={<TiShoppingCart />} id="basic-nav-dropdown">
                                <NavCartData />
                            </NavDropdown>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    );
};

export default Navigation;


