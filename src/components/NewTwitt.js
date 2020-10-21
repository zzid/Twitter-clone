import { dbService, storageService } from 'firebaseAPI';
import React, { useState } from 'react';

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
        <div>
            {
                editing ? (
                <>
                <form onSubmit={onSubmit}>
                    <input
                        type="text"
                        placeholder="Edit Your twitt"
                        value={editedNewTwitt}
                        onChange={onChange}
                        required
                    />
                    <input type='submit' value='update twitt' />
                </form>
                <button onClick={toggleEditing}>Cancel</button>
                </>)
                :
                (<>
                <h4>{newTwittObject.text}</h4>
                {newTwittObject.attchmentUrl && <img src={newTwittObject.attchmentUrl} width="50px" height="50px" alt='img'/>}
                {
                    isOwner ?
                        <>
                            <button onClick={onDeleteClick}>Delete</button>
                            <button onClick={toggleEditing}>Edit</button>
                        </>
                        : <></>
                }
                </>)
            }
        </div>
    )
}

export default NewTwitt;    