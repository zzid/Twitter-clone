import React, { useEffect,useState } from "react";
import { useHistory } from 'react-router-dom';
import { authService, dbService } from "../firebaseAPI";

export default ({ refreshUser, userObject })=> {
    const history = useHistory();
    const [newDisplayName, setNewDisplayName] = useState(userObject.displayName);
    
    // useEffect(()=>{
    //   getMyTwittes();
    // },[]);

    const onLogOutClick = () => {
        authService.signOut()
        history.push("/");
    };

    // const getMyTwittes = async () => {
    //   const newTwittes = await dbService
    //     .collection("twitter-clone")
    //     .where("creatorId", "==", userObject.uid) // filtering, querying
    //     // .orderBy("createdAt")
    //     .get();
    // }

    const onChange = (event) => {
      const {
        target :{ value },
      } = event;
      setNewDisplayName(value);
    }

    const onSubmit = async (event) => {
      event.preventDefault();
      if (newDisplayName !== userObject.displayName) {
        await userObject.updateProfile({
          displayName: newDisplayName,
        });
        refreshUser();
      }
    }

    return(
        <>
          <form onSubmit={onSubmit}>
            <input
              type='text'
              onChange={onChange}
              placeholder='Display name'
              value={newDisplayName}
            />
            <input type='submit' value='Update Profile'/>
          </form>
          <button onClick={onLogOutClick}>Log out</button>
        </>
    )
}