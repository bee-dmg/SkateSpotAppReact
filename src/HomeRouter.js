import React from "react";
import NavBar from "./navigation/NavBar";
import { Routes, Route } from "react-router-dom";
import Spots from "./routes/Spots";
import Dashboard from "./routes/Dashboard";

import AddSpot from "./routes/AddSpot";
import Account from "./routes/Account";
import SingleSpot from "./routes/SingleSpot"
import AddComment from "./routes/AddComment";
import Comment from "./comments/Comment";
import EditSpot from "./routes/EditSpot";
import EditComment from "./routes/EditComment";
import DeleteComment from "./routes/DeleteComment";
import DeleteSpot from "./routes/DeleteSpot";
import DisplayNameSetup from "./login/DisplayNameSetup";
import ImageUpload from "./routes/ImageUpload";
import ImageUploadConfirm from "./routes/ImageUploadConfirm";
import DeleteImage from "./routes/DeleteImage";
export default function Home() {

  return (
    <div>
      <NavBar />{" "}
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/spots" element={<Spots />} />
        <Route path="/addspot" element={<AddSpot />} />
        <Route path="/account" element={<Account />} />
         <Route
          path="/spot/:spot" element={<SingleSpot
               
            />
        
          }
        />
        <Route path="spot/:spot/addComment" element={<AddComment
               
               />
           
             }
           />
               <Route path="edit" element={<DisplayNameSetup
               
               />
           
             }
           />
           
           <Route path="spot/:spot/edit" element={<EditSpot
               
               />
           
             }
           />
<Route path="spot/:spot/Comments" element={<Comment
               
               />
           
             }
           />
           <Route path="spot/:spot/Comments/:id" element={<EditComment
               
               />
           
             }
           />

<Route path="spot/:spot/Comments/:id/delete" element={<DeleteComment
               
               />
           
             }
           />

<Route path="spot/:spot/delete" element={<DeleteSpot
               
               />
           
             }
           />
<Route path="spot/:spot/upload" element={<ImageUpload
               
               />
           
             }
           />
           <Route path="spot/:spot/uploadConfirm/:id" element={<ImageUploadConfirm
               
               />
           
             }
           />
           <Route path="spot/:spot/deleteImage/:id" element={<DeleteImage
               
               />
           
             }
           />

 </Routes>
    </div>
  );
}
