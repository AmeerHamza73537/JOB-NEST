import React from "react";
import { useNavigate } from "react-router-dom";
import { auth, provider } from "../firebase.js";
import { signInWithPopup } from "firebase/auth";

const OAuth = () => {
  const navigate = useNavigate();

  const handleGoogleClick = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log("User info:", user);
      alert(`Welcome ${user.displayName}`);
      navigate("/"); // redirect after login
    } catch (error) {
      console.error("Error signing in: ", error);
    }
  };

  return (
    <div>
      <button
        onClick={handleGoogleClick}
        type="button"
        className="bg-red-700 text-white p-3 rounded-lg uppercase hover:opacity-95 w-full hover:cursor-pointer hover:font-bold"
      >
        Continue with Google
      </button>
    </div>
  );
};

export default OAuth;
