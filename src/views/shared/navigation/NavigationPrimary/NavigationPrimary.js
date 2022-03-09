import React from 'react';
import { Container, Nav, Navbar, NavDropdown, Button } from 'react-bootstrap';
import { toURLString } from '../../../../utils/url.utils';
import { TiShoppingCart } from "react-icons/ti";
import { RiUser3Fill } from "react-icons/ri";
import { FaUserAlt } from "react-icons/fa";
import NavCartData from "../NavCartData";

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
                        <Nav.Link href="shop">Shop</Nav.Link>
                        <NavDropdown title="Categories" id="basic-nav-dropdown">
                            {products && products?.map(item=> (
                                <NavDropdown.Item key={`NMC${item._id}`} href={`/shop/${toURLString(item?.categorie)}`}>{item?.categorie}</NavDropdown.Item>
                            ))}
                            
                        </NavDropdown>
                    </Nav>

                    <Nav className="ml-auto">
                        

                        {/* Logged in state */}
                        {loggedin && user.email && (
                            <NavDropdown 
                                align={{ lg: 'end' }}
                                title={ (user?.photoURL) ? 
                                    <img src={user?.photoURL} alt={user.displayName} style={{borderRadius: 50}} width={26} height={26} /> 
                                    : (<FaUserAlt/>)} 
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
                    </Nav>
                </Navbar.Collapse>
                
                            
                {/* Cart Dropdown */}
                <NavDropdown align="end" title={<TiShoppingCart />}>
                    <NavCartData />
                </NavDropdown>

                {/* Logged out state */}
                { !loggedin && !user.email && (
                    <NavDropdown align="end" clasaName="" title={<RiUser3Fill/>}>
                        <NavDropdown.Item href={`/login`}>Log in</NavDropdown.Item>
                        <NavDropdown.Item href={`/register`}>Register</NavDropdown.Item>
                    </NavDropdown>
                )}
                
            </Container>
        </Navbar>
    </>
  )
}

export default NavigationPrimary