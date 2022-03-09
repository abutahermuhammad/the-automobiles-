import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { Container, Row, Col, Card, Table, Image, DropdownButton, Dropdown, ButtonGroup } from 'react-bootstrap'
import useAuth from '../../hooks/useAuth'


const Users = () => {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(true)
    const { user, role, loggedin } = useAuth()
    const [users, setUsers] = useState([])  // Product List.
    
    useEffect( () => {
        /**
         * Product Parser.
         */
        // fetch(`${process.env.NEXT_PUBLIC_API_SERVER}/products`)
        fetch(`${process.env.REACT_APP_API_URI}/user`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('_token')}`
            },
        })
        .then(res=> res.json())
        .then(data=> {
            console.log("Users: ", data)
            setUsers(data)
        })
    }, [])

    useEffect(() => { 

        if (!user.email || loggedin === false) {
            navigate('/login')
        } else { 
            setLoading(false)
        }
    }, [])
        
    return (
        <>
            {(users.length <= 0 && loading === true) && (<Card bg="black" text="primary"><Card.Body><Card.Text>Loading...</Card.Text></Card.Body></Card>)}
            {(users.length <= 0 && loading === false) && (<Card bg="black" text="primary"><Card.Body><Card.Text>No user found</Card.Text></Card.Body></Card>)}
            {(users.length > 0 && loading === false) && (
                <Card className="border-0 shadow">
                    <Card.Header className="bg-black text-primary">
                        <Card.Title className="pt-2 fs-4">Users</Card.Title>
                    </Card.Header>
                    <Card.Body className="p-0">
                        <Table hover>
                            <thead className="border-bottom-1">
                                <tr>
                                    <th className="ps-3">#</th>
                                    <th>Image</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th></th>
                                    <th className="text-end pe-3"></th>
                                </tr>
                            </thead>
                            <tbody className="border-top-0">
                                {users && users.map((user, i) => (
                                    <tr key={user?._id}>
                                        <td className="ps-3">{++i}</td>
                                        <td>
                                            <img src={`${user?.photoURL}`} width="45px" />
                                        </td>
                                        <td>
                                            {user?.displayName}
                                        </td>
                                        <td className="text-start pe-3">{user?.email}</td>
                                        <td>
                                            {(user?.role === 'visitor') && (
                                                <span className="badge rounded-pill bg-success">{user?.role}</span>
                                            )}
                                            
                                            {(user?.role === 'admin') && (
                                                <span className="badge rounded-pill bg-warning">{user?.role}</span>
                                            )}
                                        </td>

                                        <td>
                                            <DropdownButton variant="outline-dark" size='sm' as={ButtonGroup} title="Dropdown">
                                                <Dropdown.Item eventKey="1">Make Admin</Dropdown.Item>
                                                <Dropdown.Item eventKey="1">Make Visitor</Dropdown.Item>
                                                <Dropdown.Item eventKey="1">Make Editor</Dropdown.Item>
                                                <Dropdown.Item eventKey="2">Delete Account</Dropdown.Item>
                                            </DropdownButton>
                                        </td>
                                    </tr>
                                ))}
                                    
                            </tbody>
                        </Table>
                    </Card.Body>
                </Card>
            )}
        </>
    )
}

export default Users
