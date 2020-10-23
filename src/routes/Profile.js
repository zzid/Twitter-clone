import React, { useState } from "react";
import { useHistory } from 'react-router-dom';
import { authService } from "../firebaseAPI";

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
      <div className="container">
        <form onSubmit={onSubmit} className="profileForm">
          <input
            type='text'
            onChange={onChange}
            placeholder='Display name'
            value={newDisplayName}
            autoFocus
            className="formInput"
          />
          <input
            type="submit"
            value="Update Profile"
            className="formBtn"
            style={{
              marginTop: 10,
            }}
          />
        </form>
        <span className="formBtn cancelBtn logOut" onClick={onLogOutClick}>
          Log Out
        </span>
    </div>
    )
}