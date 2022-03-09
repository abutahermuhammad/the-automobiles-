import React from 'react';
import { Container, Nav, Navbar, NavDropdown, Button } from 'react-bootstrap';
import { toURLString } from '../../../../utils/url.utils';
import { TiShoppingCart } from "react-icons/ti";
import { RiUser3Fill } from "react-icons/ri";
import { FaUserAlt } from "react-icons/fa";
import NavCartData from "../NavCartData";
import { NavLink } from 'react-router-dom';

const NavigationPrimary = ({title, products, loggedin, user, signoutHandler}) => {
  return (
    <>
    
        <Navbar bg="black" expand="lg"  className="am_navigation_primary shadow" variant="primary">
            <Container>

                {/* Navigation Menu Toggler */}
                <Navbar.Toggle  className='am_toggler ms-0 me-3 text-primary' variant="outline-primary" as={Button} aria-controls="amPrimaryNav" />

                {/* Navbar Brand */}
                <Navbar.Brand href="/" className="text-primary me-auto">{title}</Navbar.Brand>


                <Navbar.Collapse id="amPrimaryNav">
                    {/* Primary Menu */}
                    <Nav className="mx-auto">
                        <NavLink className="nav-link" to="/shop">Shop</NavLink>
                        <NavDropdown title="Categories" menuVariant='dark' id="basic-nav-dropdown">
                            {products && products?.map(item=> (
                                <NavDropdown.Item key={`NMC${item._id}`} href={`/shop/${toURLString(item?.categorie)}`}>{item?.categorie}</NavDropdown.Item>
                            ))}
                            
                        </NavDropdown>
                        <NavLink className="nav-link" to="/track-order">Order Track</NavLink>
                    </Nav>
                </Navbar.Collapse>
            
                {/* Cart Dropdown */}
                <NavDropdown align="end" menuVariant='dark' title={<TiShoppingCart />}>
                    <NavCartData />
                </NavDropdown>

                {/* Logged out state */}
                { !loggedin && !user.email && (
                    <NavDropdown align="end" menuVariant='dark' title={<RiUser3Fill/>}>
                        <NavLink style={{width: 100}} className="nav-link" to={`/login`}>Log in</NavLink>
                        <NavLink style={{width: 100}} className="nav-link" to={`/register`}>Register</NavLink>
                    </NavDropdown>
                )}

                {/* Logged in state */}
                {loggedin && user.email && (
                    <NavDropdown 
                        menuVariant='dark' 
                        align="end"
                        title={ (user?.photoURL) ? 
                            <img className='border border-2 border-primary rounded-circle' src={user?.photoURL} alt={user.displayName} style={{borderRadius: 50}} width={26} height={26} /> 
                            : (<FaUserAlt/>)} 
                    >
                        <NavDropdown.Item>
                            <span style={{fontSize: 14}}>Signed in as: </span><br />
                            <p><strong>
                                {user?.displayName}
                            </strong></p>
                        </NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavLink className="nav-link" to={`/dashboard`}>Dashboard</NavLink>
                        <NavLink className="nav-link" to={`/dashboard/orders`}>Order</NavLink>
                        <NavLink className="nav-link" to={`/dashboard/setting`}>Setting</NavLink>

                        <NavDropdown.Item className='text-primary' onClick={() => signoutHandler()} >Log out</NavDropdown.Item>
                    </NavDropdown>
                )}
            
            </Container>
        </Navbar>
    </>
  )
}

export default NavigationPrimary