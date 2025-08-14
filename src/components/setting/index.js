import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../hook/user/useUser';
import { ArrowLeft } from 'react-bootstrap-icons'; // npm install react-bootstrap-icons
import YourAccount from './acount';
import UserSocialite from './use';
import YourContent from './contents';
import OthersInteraction from './interract'; // Assuming this is another component you might have
import SupportPage from './support';
import AppMediaSettings from './app_and_media';
function Setting() {
    const navigate = useNavigate();
    const { logout } = useUser();

    const handleLogout = () => {
        logout();
    };

    return (
        <div className="bg-white " style={{ paddingBottom: 70 }}>

            <div className="d-flex align-items-center border-bottom p-2">
                <ArrowLeft
                    size={24}
                    className="me-3"
                    role="button"
                    onClick={() => navigate(-1)}
                />
                <h5 className=" fw-bold mb-0">Settings and Activity</h5>
            </div>
            <YourAccount />
            <UserSocialite />
            <YourContent/>
            <OthersInteraction/>
            <SupportPage/>
            <AppMediaSettings/>

            <div className="list-group list-group-flush">
                <button
                    className="list-group-item list-group-item-action"
                    onClick={() => navigate('/register')}
                >
                    Add Account
                </button>

                <button
                    className="list-group-item list-group-item-action text-danger fw-semibold"
                    onClick={handleLogout}
                >
                    Logout
                </button>
            </div>
        </div>
    );
}

export default Setting;
