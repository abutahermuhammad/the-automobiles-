import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { Container, Row, Col, Card, Table, Image } from 'react-bootstrap'
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
                                    <th className="text-end pe-3">Email</th>
                                </tr>
                            </thead>
                            <tbody className="border-top-0">
                                {users && users.map((user, i) => (
                                    <tr key={user?._id}>
                                        <td className="ps-3">{++i}</td>
                                        <td>{`${user?.img}`}</td>
                                        <td>
                                            {user?.displayName}
                                        </td>
                                        <td className="text-end pe-3">{user?.email}</td>
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
