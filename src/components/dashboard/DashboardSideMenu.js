import { Link, useLocation } from 'react-router-dom'
import { ListGroup } from 'react-bootstrap'
import useAuth from '../../hooks/useAuth'


const DashboardSideMenu = ({ role }) => {
    const tempLocation = useLocation();
    const path = tempLocation['pathname'].split('/');
    const location = path[path.length - 1];
    const { signoutHandler } = useAuth();

    return (
        <>
            <ListGroup as="ul" defaultActiveKey={`#orders`}>
                <ListGroup.Item as="li" id="orders">
                    <Link to={`/dashboard/orders`}>
                        Orders
                    </Link>
                </ListGroup.Item>
                
                {role === 'admin' && (
                    <ListGroup.Item as="li">
                        <Link to={`/dashboard/products`}>
                            Products
                        </Link>
                    </ListGroup.Item>
                )}
                <ListGroup.Item as="li">
                    <Link to={`/dashboard/reviews`}>
                        Reviews
                    </Link>
                </ListGroup.Item>
                <ListGroup.Item as="li">
                    <Link to={`/dashboard/payments`}>
                        Payments
                    </Link>
                </ListGroup.Item>

                {role === 'admin' && (
                    <ListGroup.Item as="li">
                        <Link to={`/dashboard/users`}>
                            Users
                        </Link>
                    </ListGroup.Item>
                )}
                <ListGroup.Item as="li" onClick={() => signoutHandler()}>
                    Logout
                </ListGroup.Item>
            </ListGroup>
        </>
    )
}

export default DashboardSideMenu
