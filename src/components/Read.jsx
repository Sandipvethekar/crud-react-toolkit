import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { showuser, deleteUser } from '../userDetails';
import { RingLoader } from 'react-spinners';
import CustomModal from './CustomModal';
import { Link } from 'react-router-dom';

const Read = () => {
    const { users, loading, searchData } = useSelector((state) => state.app);
    const dispatch = useDispatch();
    const [id, setId] = useState();
    const [show, setShow] = useState(false);
    const [radio, setRadio] = useState("");

    useEffect(() => {
        dispatch(showuser());
    }, [dispatch]);

    if (loading) {
        return (
            <div className="spinner-container">
                <RingLoader color="#e52046" margin={2} size={60} />
            </div>
        );
    }

    // Filter users based on searchData and gender
    const filteredUsers = users
        .filter((ele) => {
            if (searchData.length === 0) {
                return ele;  // Show all users if no search term
            } else {
                return ele.name.toLowerCase().includes(searchData.toLowerCase());  // Filter by name
            }
        })
        .filter((ele) => {
            if (radio === "Male") {
                return ele.gender === radio;  // Filter by male gender
            } else if (radio === "Female") {
                return ele.gender === radio;  // Filter by female gender
            } else return ele;  // Show all users if no gender filter
        });

    return (
        <>
            {show && <CustomModal id={id} show={show} setshow={setShow} />}

            <h3 className="pt-5 text-center">All Data</h3>
            <div className='text-center'>
                <input className="form-check-input" type="radio" name='gender' checked={radio === ""} onChange={(e) => setRadio("")} />
                <label htmlFor="" className='form-check-label mx-2'>All</label>
                <input className="form-check-input" type="radio" name='gender' value="Male" checked={radio === "Male"} onChange={(e) => setRadio("Male")} />
                <label htmlFor="" className='form-check-label mx-2'>Male</label>
                <input className="form-check-input" type="radio" name='gender' value="Female" checked={radio === "Female"} onChange={(e) => setRadio("Female")} />
                <label htmlFor="" className='form-check-label mx-2'>Female</label>
                <p>Current User: {filteredUsers.length}</p> 
            </div>
            <div>
                {filteredUsers.map((user) => (
                
                    <div key={user.id} className="card w-50 mx-auto my-3">
                        <div className="card-body text-center">
                            <h5 className="card-title">{user.name}</h5>
                            <h6 className="card-subtitle mb-2 text-body-secondary">{user.email}</h6>
                            <p className="card-text">{user.gender}</p>

                            <button className="card-link btn btn-info" onClick={() => [setId(user.id), setShow(true)]}>view</button>

                            <Link to={`/edit/${user.id}`} className="card-link btn btn-warning">Edit</Link>

                            <Link onClick={() => dispatch(deleteUser(user.id))} className="card-link btn btn-danger text-dark">Delete</Link>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
};

export default Read;
