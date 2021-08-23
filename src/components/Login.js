import React from 'react';
import { GoogleLogin } from 'react-google-login';


const Login = ({ updateUser }) => {
    const responseGoogle = (response) => {
        updateUser(response);
    }

    return (
        <GoogleLogin
            clientId={process.env.REACT_APP_CLIENT_ID}
            buttonText="Login"
            onSuccess={responseGoogle}
            onFailure={(res) => console.log(res)}
            isSignedIn={true}
            cookiePolicy={'single_host_origin'}
            scope="https://www.googleapis.com/auth/drive.file"
        />
    )
}

export default Login;