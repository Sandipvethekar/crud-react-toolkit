import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createUser } from '../userDetails';
import { useNavigate } from 'react-router-dom';
import { HashLoader } from 'react-spinners';  // Import HashLoader

const Create = () => {
    const [users, setUsers] = useState({});
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading } = useSelector((state) => state.app);  // Get loading state from Redux

    const getUserData = (e) => {
        setUsers({ ...users, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(createUser(users));
        navigate("/read");
    };

    return (
        <>
            {loading ? (
                <div className="spinner-container">
                    <HashLoader
                        cssOverride={{ display: 'block', margin: 'auto' }}
                        size={50}
                        speedMultiplier={1}
                    />
                </div>
            ) : (
                <form className="w-50 mx-auto" onSubmit={handleSubmit}>
                    <h3 className='my-2'>Fill the Data</h3>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Name</label>
                        <input type="text" className="form-control" name="name" onChange={getUserData} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email address</label>
                        <input type="email" className="form-control" name="email" onChange={getUserData} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="age" className="form-label">Age</label>
                        <input type="text" className="form-control" name="age" onChange={getUserData} />
                    </div>
                    <div className="form-check">
                        <input className="form-check-input" type="radio" name="gender" value="Male" onChange={getUserData} />
                        <label className="form-check-label">Male</label>
                    </div>
                    <div className="form-check">
                        <input className="form-check-input" type="radio" name="gender" value="Female" onChange={getUserData} />
                        <label className="form-check-label">Female</label>
                    </div>
                    <button type="submit" className="btn btn-outline-dark">Submit</button>
                </form>
            )}
        </>
    );
};

export default Create;
