import React, { useState, useEffect } from 'react';
import AppRouter from 'components/Router';
import { authService } from '../firebaseAPI';

function App() {
  const [ init, setInit ] = useState(false);
  const [ userObject, setUserObject ] = useState(null);

  useEffect(() => {
    authService.onAuthStateChanged((user)=>{
      if(user){
        setUserObject(user);
      }
      setInit(true);
    })
  }, []);

  return (
    <>
      { init ? <AppRouter isLoggedIn={Boolean(userObject)} userObject={userObject} /> : 'initializing...'}
    </>
  );
}

export default App;
