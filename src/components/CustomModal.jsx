import React from 'react'
import "./customModal.css"
import { useSelector } from 'react-redux';

const CustomModal = ({ id, show, setshow }) => {
    const allUser = useSelector((state) => state.app.users);
    const singleUser = allUser.filter((ele) => ele.id === id);
    return (
        <div className="modalBackground">
            <div className="modalContainer">
                <h3>{singleUser[0].name}</h3>
                <h6>{singleUser[0].email}</h6>
                <h6>{singleUser[0].gender}</h6>
                <h6>{singleUser[0].age}</h6>
                <button className="btn btn-danger text-dark" onClick={() => setshow(false)}>close</button>
            </div>
        </div>
    )
}

export default CustomModal