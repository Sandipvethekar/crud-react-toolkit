import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { updateUser } from '../userDetails';  // Ensure this import is correct

const Update = () => {
    const [updateData, setUpdateData] = useState(null); // Initialize as null
    const { id } = useParams(); // Get id from URL params
    const { users, loading } = useSelector((state) => state.app); // Assuming users are in state.app
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (id && users) {
            const singleUser = users.find((ele) => ele.id === id); // Use find to get a single object instead of filter
            if (singleUser) {
                setUpdateData(singleUser); // Set the user data to state
            }
        }
    }, [id, users]); // Re-run the effect when id or users change

  
    if (loading) {
        return <h2>Loading.....</h2>;
    }

    if (!updateData) {
        return <h2>User not found</h2>;
    }

    // Handle form submission (just for example)
    const handleSubmit = (e) => {
        e.preventDefault();
        if (updateData) {
            dispatch(updateUser(updateData)); // Dispatch update action
            navigate("/read"); // Navigate after successful update
            console.log(updateData); // Log updated data for debugging
        }
    };

    const handleGenderChange = (gender) => {
        setUpdateData({
            ...updateData,
            gender: gender,
        });
    };

    return (
        <form className="w-50 mx-auto" onSubmit={handleSubmit}>
            <h3 className="my-2">Edit the Data</h3>
            <div className="mb-3">
                <label htmlFor="name" className="form-label">Name</label>
                <input
                    type="text"
                    className="form-control"
                    name="name"
                    value={updateData.name || ''} // Directly access properties since it's no longer an array
                    onChange={(e) => setUpdateData({ ...updateData, name: e.target.value })}
                />
            </div>

            <div className="mb-3">
                <label htmlFor="email" className="form-label">Email address</label>
                <input
                    type="email"
                    className="form-control"
                    name="email"
                    value={updateData.email || ''}
                    onChange={(e) => setUpdateData({ ...updateData, email: e.target.value })}
                />
            </div>

            <div className="mb-3">
                <label htmlFor="age" className="form-label">Age</label>
                <input
                    type="text"
                    className="form-control"
                    name="age"
                    value={updateData.age || ''}
                    onChange={(e) => setUpdateData({ ...updateData, age: e.target.value })}
                />
            </div>

            <div className="form-check">
                <input
                    className="form-check-input"
                    type="radio"
                    name="gender"
                    value="MALE"
                    checked={updateData.gender === "Male"} // Correctly check if 'Male' is selected
                    onChange={() => handleGenderChange('Male')} // Update the gender to 'Male'
                />
                <label className="form-check-label">
                    Male
                </label>
            </div>

            <div className="form-check">
                <input
                    className="form-check-input"
                    type="radio"
                    name="gender"
                    value="FEMALE"
                    checked={updateData.gender === "Female"} // Correctly check if 'Female' is selected
                    onChange={() => handleGenderChange('Female')} // Update the gender to 'Female'
                />
                <label className="form-check-label">
                    Female
                </label>
            </div>

            <button type="submit" className="btn btn-outline-dark">Update</button>
        </form>
    );
};

export default Update;
