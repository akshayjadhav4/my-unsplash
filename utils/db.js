import firebase from "firebase";
import { db } from "./firebase";

export async function createPhoto(data) {
  const ref = await db
    .collection("photos")
    .add({
      ...data,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    })
    .catch((error) => {
      alert("ERROR WHILE ADDING PHOTO");
    });

  const newPhoto = await db
    .collection("photos")
    .doc(ref.id)
    .get()
    .then((doc) => {
      return { id: ref.id, ...doc.data() };
    })
    .catch((error) => {
      alert("Error getting Photo reference");
    });

  return newPhoto;
}

export async function getPhotos() {
  try {
    const docs = await db
      .collection("photos")
      .orderBy("timestamp", "desc")
      .get();
    const photos = [];
    docs.forEach((doc) => {
      photos.push({ id: doc.id, ...doc.data() });
    });
    return { photos };
  } catch (error) {
    return { error };
  }
}
