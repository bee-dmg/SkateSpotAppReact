import React, { useContext, useState, useEffect } from "react";
import { auth } from "../firebase-config";
import { onAuthStateChanged, updateProfile, signOut } from "firebase/auth";
import { Button } from 'reactstrap';

import AuthContext from "../context/AuthContext";


export default function DisplayNameSetup() {
  //Need to add a way to verify DisplayName isn't already used?

  const { user, setUser } = useContext(AuthContext);
  const [displayName, setDisplayName] = useState("");

  const updateDisplayName = async () => {
    try{
      const update = {
        displayName: displayName,
        photoURL: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/SNice.svg/1200px-SNice.svg.png"
      };
      
       updateProfile(auth.currentUser, update);
       onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser);})
       
        console.log(user);
        
      }
      
        catch(error){console.log(error.message);}
        
      };
      const refreshPage = async () => {
        await updateDisplayName();
        window.location.reload(true);
      }
    return (
    <div>
      <div>
        <input
          editable="true"
          placeholder="Display Name"
          onChange={(event) => {
            setDisplayName(event.target.value);
          }}
        />
      </div>
      
      <div>
        
        <Button color="primary" onClick={() => {updateDisplayName()}}>Submit</Button>
        <Button color="primary" onClick={() => {refreshPage();}}>Next</Button>
        
        </div>
      
      </div>
  );
        }
   
      

