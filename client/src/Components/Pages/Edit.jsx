import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Api from '../../Api/api';
import Heading from '../ReuseableComponents/Heading';

const Edit = () => {
    const data = {
        name: "",
        email: "",
        phone: "",
        age: "",
        file: ""
    }
    const { id } = useParams();
    const [getUser, setGetUser] = useState([])
    const [formData, setFormData] = useState(data)

    const inputHandle = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const fileHandle = (e) => {
        setFormData({ ...formData, file: e.target.files[0] });
    }

    useEffect(() => {
        Api.dataById(id)
            .then((res) => {
                setGetUser(res.data);
                setFormData({
                    name: res.data.name,
                    email: res.data.email,
                    phone: res.data.phone,
                    age: res.data.age,
                    file: res.data.image
                });
            }).catch((err) => {
                console.log(err);
            })
    }, [id])

    const formSubmit = (e) => {
        e.preventDefault();
        const data = new FormData();
        data.append("name", formData.name);
        data.append("email", formData.email);
        data.append("phone", formData.phone);
        data.append("age", formData.age);
        data.append("file", formData.file);
        Api.updateData(id, data);
    }

    return (
        <>
            <div className="row">
                <div className="col-md-12">
                    <Heading title="Update Data" />
                </div>
            </div>

            <div className="row">
                <div className="col-md-12">
                    {
                        getUser ?
                            <form method='POST' onSubmit={formSubmit} encType='multipart/form-data'>
                                <div className="form-group mb-2">

                                    <input type="text" onChange={inputHandle} value={formData.name} className="form-control" name='name' id="name" placeholder="Name" />
                                    <input type="hidden" name="id" value={id} />
                                </div>
                                <div className="form-group mb-2">
                                    <input type="email" onChange={inputHandle} value={formData.email} readOnly className="form-control" name='email' id="email" placeholder="Email" />
                                </div>
                                <div className="form-group mb-2">
                                    <input type="text" onChange={inputHandle} className="form-control" value={formData.phone} name='phone' id="phone" placeholder="Phone Number" />
                                </div>
                                <div className="form-group mb-2">
                                    <input type="number" onChange={inputHandle} className="form-control" value={formData.age} name='age' id="age" placeholder="Age" />
                                </div>
                                <div className="form-group mb-2">
                                <img src={`http://localhost:5072/images/${formData.file}`} style={{ width: '50px', height: '50px' }} className='my-2' />
                                    <input type="file" className="form-control" onChange={fileHandle} name='file' id="image" />
                                </div>
                                <div className="form-group mb-2">
                                    <button type='submit' className="btn btn-primary">Update Data</button>
                                </div>
                            </form>
                            :
                            <h1>Loading...</h1>
                    }
                </div>
            </div>
        </>
    )
}

export default Edit