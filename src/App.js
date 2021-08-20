import React, { useState } from 'react';
import './App.css';
import Login from './components/Login';
import Logout from './components/Logout';
import Homepage from './pages/Homepage';


function App() {
  const [user, setUser] = useState({ Ne: "" });

  const updateUser = user => {
    setUser(user);
  }


  return (
    <div>
      {user.Ne === ""
        ? <header className="header"><Login updateUser={updateUser} /></header>
        : <>
          <header className="header">
            <p>Signed in as {user.Ts.Ne} <Logout /></p>
          </header>
          <Homepage user={user} />
        </>}
    </div>
  );
}

export default App;
