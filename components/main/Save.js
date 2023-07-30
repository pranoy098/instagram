import React, { useState, useEffect } from "react";
import { View, TextInput, Image, Button } from "react-native";
import { initializeApp } from "firebase/app";
import {
  doc,
  getFirestore,
  collection,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
  uploadBytes,
} from "firebase/storage";
import { getAuth } from "firebase/auth";
import { StackActions } from "@react-navigation/native";

export function Save(props, { navigation }) {
  console.log(props.route.params.image);
  const [caption, setCaption] = useState("");
  const auth = getAuth();

  const storage = getStorage();
  const metadata = {
    contentType: "image/jpeg",
  };

  useEffect(() => {}, []);

  const uploadImage = async () => {
    const uri = props.route.params.image;
    const response = await fetch(uri);
    const blob = await response.blob();

    // Upload file and metadata to the object 'images/mountains.jpg'
    const storageRef = ref(
      storage,
      `post/${auth.currentUser.uid}/${Math.random().toString(36)}`
    );
    const uploadTask = uploadBytesResumable(storageRef, blob, metadata);

    // Listen for state changes, errors, and completion of the upload.
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
        }
      },
      (error) => {
        // A full list of error codes is available at
        // https://firebase.google.com/docs/storage/web/handle-errors
        switch (error.code) {
          case "storage/unauthorized":
            // User doesn't have permission to access the object
            break;
          case "storage/canceled":
            // User canceled the upload
            break;

          // ...

          case "storage/unknown":
            // Unknown error occurred, inspect error.serverResponse
            break;
        }
      },
      () => {
        // Upload completed successfully, now we can get the download URL
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log("File available at", downloadURL);
          savePostData(downloadURL);
        });
      }
    );
  };

  const savePostData = async (downloadURL) => {
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
    try {
      const testCollection = collection(
        db,
        "posts",
        auth.currentUser.uid,
        "userPosts"
      );
      const docRef = await addDoc(testCollection, {
        downloadURL,
        caption,
        creation: serverTimestamp(),
      });
      console.log("Document written with ID: ", docRef.id);
      // props.navigation.popToTop();
      props.navigation.dispatch(StackActions.popToTop());
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <Image source={{ uri: props.route.params.image }} />
      <TextInput
        placeholder="Write a Caption . . . "
        onChangeText={(caption) => setCaption(caption)}
      />
      <Button title="Save" onPress={() => uploadImage()} />
    </View>
  );
}

export default Save;
