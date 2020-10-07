import NewTwitt from "components/NewTwitt";
import { dbService } from "firebaseAPI";
import React, { useState, useEffect } from "react";

const Home = ({userObject})=>{
    const [ newTwitt, setNewTwitt ] = useState("");
    const [ newTwittes, setNewTwittes] = useState([]);
    // const getNewTwittes = async()=>{
    //     const dbTwittes = await dbService.collection("twitter-clone").get(); 

    //     dbTwittes.forEach(document=>{
    //         const newTwittesObject = {
    //             ...document.data(),
    //             id : document.id,
    //         }
    //         setNewTwittes(prev=>[newTwittesObject, ...prev]);
    //     });

    // }
    useEffect(() => {
        dbService.collection("twitter-clone").onSnapshot(snapshot => {
            const twittesArray = snapshot.docs.map(doc=> ({
                id:doc.id,
                ...doc.data()
            }))
            setNewTwittes(twittesArray);
        })
    }, [])
    const onSubmit = async (event) => {
        event.preventDefault();
        await dbService.collection("twitter-clone").add({
            text : newTwitt,
            createdAt : Date.now(),
            creatorId : userObject.uid,
        });
        setNewTwitt('');
    };
    const onChange = (event) => {
        const { target : {value} , } = event;
        setNewTwitt(value);
    }
    return (
        <div>
            <form onSubmit={onSubmit}>
                <input value={newTwitt} onChange={onChange} type='text' placeholder="What's on your mind?" maxLength={123}></input>
                <input type='submit' value='twitter'></input>
            </form>
            <div>
                {newTwittes.map(newTwitt=>(
                    <NewTwitt
                        key={newTwitt.id} 
                        newTwittObject={newTwitt}
                        isOwner={newTwitt.creatorId === userObject.uid}
                    />
                ))}
            </div>
        </div>      
    );
}
export default Home;