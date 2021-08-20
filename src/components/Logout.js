import React from 'react';
import { GoogleLogout } from 'react-google-login';

const Logout = () => {
    const responseGoogle = () => {
        window.location.reload();
    }

    return (
        <GoogleLogout
            clientId={process.env.REACT_APP_CLIENT_ID}
            buttonText="Logout"
            onLogoutSuccess={responseGoogle}
        />
    )
}

export default Logout;