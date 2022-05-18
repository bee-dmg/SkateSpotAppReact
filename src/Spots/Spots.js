import { onSnapshot, collection } from "firebase/firestore";
import React, { useEffect, useState, useContext } from "react";
import { db, storage } from "../firebase-config";
import AuthContext from "../context/AuthContext";
import { ref, listAll, getDownloadURL } from "firebase/storage";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { Button, Card, CardHeader } from "reactstrap";
import AllSpotsMap from "../maps/AllSpotsMap";
import Loading from "../graphics/Loading";
import Maps from "../maps/Maps";
import PostedEdited from "./SpotComponents/PostedEdited";
export default function Spots() {
  const { spot } = useParams();
  const [imageList, setImageList] = useState([]);
  const imageListRef = ref(storage, "images/" + spot + "/");
  const { user } = useContext(AuthContext);
  const [spots, setSpots] = useState([]);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    listAll(imageListRef).then((response) => {
      response.items.forEach((item) => {
        getDownloadURL(item).then((url) => {
          setImageList((prev) => [...prev, url]);
        });
      });
    });

    onSnapshot(collection(db, "comments"), (snapshot) => {
      setComments(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    });

    const unsub = onSnapshot(collection(db, "spots"), (snapshot) => {
      setSpots(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    });

    return unsub;
  }, []);

  if (spots.length !== 0) {
    return (
      <div>
        <div className="globalTopMargin">
          <h2>Spots</h2>
          <AllSpotsMap spots={spots}  />
        </div>
        {spots.map((spot) => (
          <div style={{ padding: "1rem 0", width: "400px", margin: "auto" }}>
            <Card>
              <div key={spot.id}>
                <CardHeader>
                  <Link to={"/spot/" + spot.id}>{spot.name}</Link>
                </CardHeader>
                <Maps spot={[spot]} spots={spots} center={{lat:spot.lat,lng:spot.long}} singleView={true} />
                <div
                  style={{
                    display: "inline",
                    marginRight: "auto",
                    marginTop: "10px",
                  }}
                >
                  {user.email === spot.admin.email ? (
                    <Link to={"/spot/" + spot.id + "/edit"}>
                      {" "}
                      <Button color="primary"> Edit </Button>
                    </Link>
                  ) : (
                    <p></p>
                  )}{" "}
                  <div style={{ marginTop: "10px" }}><div style={{marginLeft:"0px"}}>
                    <Link to={"/spot/" + spot.id + "/addComment/"}>
                      <Button>Comment</Button>
                    </Link>
                    </div>
                    <Link to={"/spot/" + spot.id + "/upload"}>
                      <Button color="success" onClick={() => {}}>
                        Upload
                      </Button>
                    </Link>
                  </div>
                </div>

                <h6>{spot.location}</h6>
                <p>{spot.description}</p>
                <p>
                  {comments.filter((cmt) => cmt.spot === spot.id).length > 0 ? (
                    `${
                      comments.filter((cmt) => cmt.spot === spot.id).length
                    } Comments`
                  ) : (
                    <></>
                  )}{" "}
                </p>
                <PostedEdited spot={spot} />
              </div>
            </Card>
          </div>
        ))}
      </div>
    );
  } else {
    return (
      <div style={{ padding: "1rem 0" }}>
        <h2>Spots</h2>
        <Loading />
      </div>
    );
  }
}