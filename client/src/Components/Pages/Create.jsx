import React, { useState } from 'react'
import Heading from '../ReuseableComponents/Heading'
import Api from '../../Api/api'

const Create = () => {
    const data = {
        name: "",
        email: "",
        phone: "",
        age: "",
        file: ""
    }

    const [formData, setFormData] = useState(data)

    const inputHandle = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const fileHandle = (e) => {
        setFormData({ ...formData, file: e.target.files[0] });
    }

    const formSubmit = (e) => {
        e.preventDefault();
        const data = new FormData();
        data.append("name",formData.name);
        data.append("email",formData.email);
        data.append("phone", formData.phone);
        data.append("age", formData.age);
        data.append("file", formData.file);
        Api.insertData(data);
    }

    return (
        <>
            <div className="row">
                <div className="col-md-12">
                    <Heading title="Insert Data" />
                </div>
            </div>

            <div className="row">
                <div className="col-row">
                    <div className="col-md-12">
                        <form method='POST' onSubmit={formSubmit} encType='multipart/form-data'>
                            <div className="form-group mb-2">
                                <input type="text" onChange={inputHandle} className="form-control" name='name' id="name" placeholder="Name" />
                            </div>
                            <div className="form-group mb-2">
                                <input type="email" onChange={inputHandle} className="form-control" name='email' id="email" placeholder="Email" />
                            </div>
                            <div className="form-group mb-2">
                                <input type="text" onChange={inputHandle} className="form-control" name='phone' id="phone" placeholder="Phone Number" />
                            </div>
                            <div className="form-group mb-2">
                                <input type="number" onChange={inputHandle} className="form-control" name='age' id="age" placeholder="Age" />
                            </div>
                            <div className="form-group mb-2">
                                <input type="file" className="form-control" onChange={fileHandle} name='file' id="image" />
                            </div>
                            <div className="form-group mb-2">
                                {/* <Button btnText="Insert Data" /> */}
                                <button type='submit' className="btn btn-primary">Insert Data</button>
                            </div>
                        </form>


                    </div>
                </div>
            </div>
        </>
    )
}

export default Create