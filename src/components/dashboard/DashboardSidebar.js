import React from 'react';
import { ListGroup } from 'react-bootstrap';
import { useLocation, useParams } from 'react-router-dom';

const DashboardSidebar = () => {
    const tempLocation = useLocation();
    const path = tempLocation['pathname'].split('/');
    const location = path[path.length - 1];

    return (
        <>
            <ListGroup defaultActiveKey={`#${location}`}>
                <ListGroup.Item id="orders" action href="/dashboard">
                    Orders
                </ListGroup.Item>
                <ListGroup.Item action href="/profile">
                    Profile
                </ListGroup.Item>
            </ListGroup>
        </>
    );
};

export default DashboardSidebar;
