import AuthForm from "components/AuthForm";
import React from "react";
import { authService, firebaseInstance } from "../firebaseAPI";

const Auth = ()=>{

    const onSocialClick = async (event) =>{
        const {
            target: {
                name 
            },
        } = event;
        let provider;
        if(name === "google"){
            provider = new firebaseInstance.auth.GoogleAuthProvider();
        } else if(name === "github") {
            provider = new firebaseInstance.auth.GithubAuthProvider();
        }
        const data = await authService.signInWithPopup(provider);

    }
    return(
        <div>
          <AuthForm />
            <div>
                <button onClick={onSocialClick} name ="google">Continue with Google</button>
                <button onClick={onSocialClick} name ="github">Continue with GitHub</button>
            </div>
        </div>
    )
}
export default Auth;