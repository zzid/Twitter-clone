import NewTwitt from "components/NewTwitt";
import TwittFactory from "components/TwittFactory";
import { dbService } from "firebaseAPI";
import React, { useState, useEffect } from "react";

const Home = ({userObject})=>{
    const [newTwittes, setNewTwittes] = useState([]);

    useEffect(() => {
        dbService.collection("twitter-clone").onSnapshot(snapshot => {
            const twittesArray = snapshot.docs.map(doc=> ({
                id:doc.id,
                ...doc.data()
            }))
            setNewTwittes(twittesArray);
        })
    }, [])

    return (
        <div>
            <TwittFactory userObject={userObject} />
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