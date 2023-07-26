import { USER_STATE_CHANGE } from "../constants";
import {
  doc,
  getDoc,
  collection,
  query,
  getDocs,
  getFirestore,
} from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";

export function fetchUser() {
  const firebaseConfig = {
    apiKey: "AIzaSyC0vozCySOnEMdxMa5NMpA5spw9Of1KXig",
    authDomain: "instagram-dev-8f04e.firebaseapp.com",
    projectId: "instagram-dev-8f04e",
    storageBucket: "instagram-dev-8f04e.appspot.com",
    messagingSenderId: "35641998266",
    appId: "1:35641998266:web:627ae50d0566daf1847b83",
    measurementId: "G-90YD72L0KN",
  };
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);

  const getData = async (user) => {
    const docRef = doc(db, "users", "EdQLcfqkTBjCraFNAcFo");
    const docSnap = await getDoc(docRef);
    console.log("docsnap", docSnap.data());
    return docSnap.data();
  };

  return (dispatch) => {
    // --------------------------------
    const auth = getAuth();
    onAuthStateChanged(auth, async (user) => {
      console.log("user", user);
      console.log("user.uid->", user.uid);

      if (user) {
        console.log("Document data:", user);
        let respData = await getData(user.uid);
        console.log("respData", respData);
        dispatch({ type: USER_STATE_CHANGE, currentUser: respData });
      } else {
        // docSnap.data() will be undefined in this case
        console.log("No such document!");
      }
    });
  };
}
