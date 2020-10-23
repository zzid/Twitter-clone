import React, {useState} from 'react';
import { dbService, storageService } from "firebaseAPI";
import {v4 as uuidv4} from 'uuid';

const TwittFactory = ({ userObject }) => {
  const [attachment, setAttachment] = useState("");
  const [newTwitt, setNewTwitt ] = useState("");

  // const getNewTwittes = async()=>{
  //     const dbTwittes = await dbService.collection("twitter-clone").get(); 

  //     dbTwittes.forEach(document=>{
  //         const newTwittesObject = {
  //             ...document.data(),
  //             id : document.id,
  //         }
  //         setNewTwittes(prev=>[newTwittesObject, ...prev]); // update 
  //          // set have prev! >> so can change easily. to pass func to setFunc
  //     });
  // }
  
  const onSubmit = async (event) => {
    event.preventDefault();
    let attchmentUrl ='';
    // await dbService.collection("twitter-clone").add({
    //     text : newTwitt,
    //     createdAt : Date.now(),
    //     creatorId : userObject.uid,
    // });
    // setNewTwitt('');
    if (attachment !== ''){
      const attachmentRef = storageService.ref().child(`${userObject.uid}/${uuidv4()}`)
      const response = await attachmentRef.putString(attachment, "data_url");
      attchmentUrl = await response.ref.getDownloadURL();
    }
    await dbService.collection("twitter-clone").add({
      text : newTwitt,
      createdAt : Date.now(),
      creatorId : userObject.uid,
      attchmentUrl
    });
    setNewTwitt("");
    setAttachment("");
  };
  const onChange = (event) => {
      const { target : {value} , } = event;
      setNewTwitt(value);
  }
  /* file reader API for thumbnail(?) */
  /* onFileChange, onClearAttachment */
  const onFileChanage = (event) => {
    const {
      target : {files} ,
    } = event;
    const imgFile = files[0];
    const reader = new FileReader();
    reader.onloadend = (finishedEvent) => {
      const {
        currentTarget : { result },
      } = finishedEvent
      setAttachment(result)
      console.log()
    }
    reader.readAsDataURL(imgFile);
  }
  const onClearAttachment = () => {
    setAttachment("")
  }
  return(
    <form onSubmit={onSubmit}>
      <input value={newTwitt} onChange={onChange} type='text' placeholder="What's on your mind?" maxLength={123}></input>
      <input type='file' accept='image/*' onChange={onFileChanage}/>
      <input type='submit' value='twitter'/>
      {attachment && 
      <div>
        <img src={attachment} width="50px" height="50px" alt="img"/>
        <button onClick={onClearAttachment}>Clear</button>
      </div>}
    </form>
  )
}

export default TwittFactory;