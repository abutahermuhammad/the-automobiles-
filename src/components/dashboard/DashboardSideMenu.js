import { Link, useLocation } from 'react-router-dom'
import { ListGroup } from 'react-bootstrap'
import useAuth from '../../hooks/useAuth'
import { FaListAlt, FaShoppingCart, FaCoffee, FaCreditCard } from "react-icons/fa";
import { ImExit } from "react-icons/im";


const DashboardSideMenu = ({ role }) => {
    const tempLocation = useLocation();
    const path = tempLocation['pathname'].split('/');
    const location = path[path.length - 1];
    const { signoutHandler } = useAuth();

    return (
        <>
            <ListGroup className="am_dashboard_sidebar" as="ul" defaultActiveKey={`#orders`}>
                <ListGroup.Item as="li" id="orders">
                    <Link to={`/dashboard/orders`} className="d-flex align-items-center">
                        <FaListAlt />
                        <span className="ps-3">Orders</span>
                    </Link>
                </ListGroup.Item>
                
                {role === 'admin' && (
                    <ListGroup.Item as="li">
                        <Link to={`/dashboard/products`} className="d-flex align-items-center">
                            <FaShoppingCart/>
                            <span className="ps-3">Products</span>
                        </Link>
                    </ListGroup.Item>
                )}
                <ListGroup.Item as="li">
                    <Link to={`/dashboard/reviews`} className="d-flex align-items-center">
                        <FaCoffee />
                        <span className="ps-3">Reviews</span>
                    </Link>
                </ListGroup.Item>
                <ListGroup.Item as="li">
                    <Link to={`/dashboard/payments`} className="d-flex align-items-center">
                        <FaCreditCard/>
                        <span className="ps-3">Payments</span>
                    </Link>
                </ListGroup.Item>

                {role === 'admin' && (
                    <ListGroup.Item as="li">
                        <Link to={`/dashboard/users`} className="d-flex align-items-center">
                            <FaShoppingCart/>
                            <span className="ps-3">Users</span>
                        </Link>
                    </ListGroup.Item>
                )}
                <ListGroup.Item as="li" onClick={() => signoutHandler()} className="d-flex align-items-center">
                    <ImExit />
                    <span className="ps-3">Logout</span>
                </ListGroup.Item>
            </ListGroup>
        </>
    )
}

export default DashboardSideMenu
