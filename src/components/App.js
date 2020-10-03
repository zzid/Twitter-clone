import React, { useState, useEffect } from 'react';
import AppRouter from 'components/Router';
import { authService } from '../firebaseAPI';

function App() {
  const [ init, setInit ] = useState(false);
  const [ isLoggedIn, setIsLoggedIn ] = useState(false);
  
  useEffect(() => {
    authService.onAuthStateChanged((user)=>{
      if(user){
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
      setInit(true);
    })
  }, []);

  return (
    <>
      { init ? <AppRouter isLoggedIn={isLoggedIn} /> : 'initializing...'}
    </>
  );
}

export default App;
