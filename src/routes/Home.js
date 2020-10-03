import React, { useState } from "react";

const Home = ()=>{
    const [ newTweet, setNewTweet ] = useState("");
    const onSubmit = (event) => {
        event.preventDafualt();

    };
    const onChange = (event) => {
        const { target : {value} , } = event;
        setNewTweet(value);
    }
    return (
        <div>
            <form onSubmit={onSubmit}>
                <input value={newTweet} onChange={onChange} type='text' placeholder="What's on your mind" maxLength={123}></input>
                <input type='submit' value='zwitter'></input>
            </form>
        </div>
    );
}
export default Home;