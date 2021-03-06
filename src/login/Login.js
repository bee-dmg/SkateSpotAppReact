import React, { useContext, useEffect } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../firebase-config";
import Home from "../HomeRouter";
import AuthContext from "../context/AuthContext";
import Loading from "../graphics/Loading";
import LoginForm from "./LoginForm";
import LoginForm2 from "./LoginForm2";
import EditProfile from "../User/EditProfile";
export default function Login(props) {
  const { user, setUser } = useContext(AuthContext);
  const guestQuery = props.queryString;
console.log(guestQuery)
  onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
  });
  if (user === null && guestQuery.length === 2) {
    //returns Login Form to prompt user to sign in, checks if user is null if you use !user to check the logic breaks
    return <LoginForm guestQuery={guestQuery} />;
  }
  if (user === null) {
    //returns Login Form to prompt user to sign in, checks if user is null if you use !user to check the logic breaks
    return <LoginForm />;
  }
  if (user.displayName) {
    //Takes user to Dashboard
    return (
      <div>
        <Home />
      </div>
    );
  }
  if (user.displayName === null) {
    //Asks user to set up display name, then moves them to Dashboard once completed.
    return (
      <div>
        {" "}
        <div>
          <EditProfile />
        </div>
      </div>
    );
  } else {
    //returns loading animation
    return <Loading />;
  }
}
