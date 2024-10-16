import React, { useEffect, useState } from 'react'
import Api from '../../Api/api'
import Heading from '../ReuseableComponents/Heading';
import { NavLink } from 'react-router-dom';
const Show = () => {
    const [data, setData] = useState([]);
    useEffect(() => {
        Api.fetchData()
            .then((res) => {
                console.log(res.data)
                setData(res.data);
            }).catch((err) => {
                console.log(err);
            });
    }, [])

    const DeleteData = (id) => {

        Api.deleteData(id).then((res) => {
            console.log("Data Delete", res);
            setData(data.filter(item => item.id !== id))
        }).catch((err) => {
            console.log(err)
        })
    }

    return (
        <>
            <div className="row">
                <div className="col-md-12">
                    <Heading title="Show Data" />
                </div>
            </div>
            <table className="table mt-5">
                <thead>
                    <tr>
                        <th scope="col">Id</th>
                        <th scope="col">Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Phone</th>
                        <th scope="col">Age</th>
                        <th scope="col">Image</th>
                        <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data.length > 0 ? data.map((item, index) => (
                            <tr key={index}>
                                <th scope="row">{index + 1}</th>
                                <td>{item.name}</td>
                                <td>{item.email}</td>
                                <td>{item.phone}</td>
                                <td>{item.age}</td>
                                <td>
                                    <img src={item.image ? `http://localhost:5072/images/${item.image}` : ''} style={{ width: '50px', height: '50px' }} />
                                </td>
                                <td>
                                    <NavLink className='btn btn-warning text-white' to={`/editData/${item.id}`}>Edit</NavLink>
                                    <button className='btn btn-danger ms-2' onClick={() => DeleteData(item.id)}>Delete</button>
                                </td>
                            </tr>
                        )) : (
                            <tr>
                                <td colSpan="6" className='text-center'>No Data Available</td>
                            </tr>
                        )
                    }
                </tbody>

            </table>
        </>
    )
}

export default Show