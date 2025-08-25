import React from 'react';

import { ArrowLeft } from 'react-bootstrap-icons';
import { useNavigate } from 'react-router-dom';
import Interact from './interactions';
import Removed from './removed';
import Content from './content';
import UseSocilite from './usesocilite';
function Activity() {


    const navigate = useNavigate();



    return (
        <div className="bg-white " style={{ paddingBottom: 70 }}>

            <div className="d-flex align-items-center border-bottom p-2">
                <ArrowLeft
                    size={24}
                    className="me-3"
                    role="button"
                    onClick={() => navigate(-1)}
                />
                <h5 className=" fw-bold mb-0">Your Activity</h5>
            </div>

            <Interact />
            <Removed />
            <Content />
            <UseSocilite />

        </div>
    );
}

export default Activity;
