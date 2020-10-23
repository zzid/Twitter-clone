import React, { useState, useEffect } from 'react';
import AppRouter from 'components/Router';
import { authService } from '../firebaseAPI';

function App() {
  const [ init, setInit ] = useState(false);
  const [ userObject, setUserObject ] = useState(null);

  useEffect(() => {
    authService.onAuthStateChanged((user)=>{
      if(user){
        /* 1 */
        setUserObject({
          displayName: user.displayName,
          uid: user.uid,
          updateProfile: (args) => user.updateProfile(args),
        });
        // setUserObject(user);
      }else {
        setUserObject(null);
      }
      setInit(true);
    })
  }, []);
  const refreshUser = () => {
    /* 1 */
    setUserObject({
      displayName: authService.currentUser.displayName,
      uid: authService.currentUser.uid,
      updateProfile: (args) => authService.currentUser.updateProfile(args),
    });
    // setUserObject(Object.assign({}, authService.currentUser));
  }
  return (
    <>
      { init ? (
      <AppRouter 
        refreshUser={refreshUser}
        isLoggedIn={Boolean(userObject)} 
        userObject={userObject}
      />): 'initializing...'
      }
    </>
  );
}

export default App;