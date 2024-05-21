import React from "react";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../firebase-config";
import { Cookies } from "react-cookie";

const cookies = new Cookies();

export const Auth = ({ setIsAuth }) => {
  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      cookies.set("auth-token", result.user.refreshToken);
      setIsAuth(true);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="auth">
      <p>Sign in with Google to continue</p>
      <button onClick={signInWithGoogle} className="btn">Sign In With Google</button>
    </div>
  );
};
