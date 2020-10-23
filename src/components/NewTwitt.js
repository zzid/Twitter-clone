import { dbService, storageService } from 'firebaseAPI';
import React, { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPencilAlt } from "@fortawesome/free-solid-svg-icons";

const NewTwitt = ({newTwittObject, isOwner}) =>{
    const [ editing, setEditing ] = useState(false);
    const [ editedNewTwitt, setEditedNewTwitt] = useState(newTwittObject.text);
    /* delete */
    const onDeleteClick = async ()=>{
        const ok = window.confirm("Are you sure, you want to delete this twitt?");
        if (ok) {
            await dbService.doc(`twitter-clone/${newTwittObject.id}`).delete();
            await storageService.refFromURL(newTwittObject.attchmentUrl).delete();
        }
    }

    /* update */
    const toggleEditing = () => {
        setEditing(prev=> !prev);
    }
    const onSubmit = async (event) =>{
        event.preventDefault();
        await dbService.doc(`twitter-clone/${newTwittObject.id}`).update({
            text : editedNewTwitt
        });
        setEditing(false);
    }
    const onChange = (evnet) =>{
        const {
            target: {value},
        } = evnet;
        setEditedNewTwitt(value);
    }
    
  return (
    <div className="nweet">
      {
        editing ? (
        <>
        <form onSubmit={onSubmit} className="container nweetEdit">
          <input
              type="text"
              placeholder="Edit Your twitt"
              value={editedNewTwitt}
              onChange={onChange}
              autoFocus
              className="formInput"
              required
          />
          <input type='submit' value='Update twitt' className="formBtn"/>
        </form>
        <span onClick={toggleEditing} className="formBtn cancelBtn">
          Cancel
        </span>
        </>)
        :
        (<>
        <h4>{newTwittObject.text}</h4>
        {newTwittObject.attchmentUrl && <img src={newTwittObject.attchmentUrl} />}
        {
            isOwner && (
              <div class="nweet__actions">
                <span onClick={onDeleteClick}>
                  <FontAwesomeIcon icon={faTrash} />
                </span>
                <span onClick={toggleEditing}>
                  <FontAwesomeIcon icon={faPencilAlt} />
                </span>
              </div>
            )}
        </>
      )}
    </div>
  )
}

export default NewTwitt;    