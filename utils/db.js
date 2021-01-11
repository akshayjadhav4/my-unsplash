import firebase from "firebase";
import { db } from "./firebase";

export function createPhoto(data) {
  const ref = db
    .collection("photos")
    .add({
      ...data,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    })
    .catch(function (error) {
      alert("ERROR WHILE ADDING PHOTO");
    });

  return ref;
}
