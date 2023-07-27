import React, { useState, useEffect } from "react";
import { View, TextInput, Image, Button } from "react-native";
import { getStorage, ref, uploadBytes } from "firebase/storage";
import { getAuth } from "firebase/auth";

export function Save(props) {
  console.log(props.route.params.image);
  const [caption, setCaption] = useState("");
  const auth = getAuth();

  const storage = getStorage();
  const storageRef = ref(
    storage,
    `post/${auth.currentUser.uid}/${Math.random().toString(36)}`
  );

  useEffect(() => {}, []);

  const uploadImage = async () => {
    const uri = props.route.params.image;
    const response = await fetch(uri);
    const blob = await response.blob();

    // 'file' comes from the Blob or File API
    uploadBytes(storageRef, blob).then((snapshot) => {
      console.log("Snapshot", snapshot);
      console.log(snapshot);
      console.log("Uploaded a blob or file!");
      savePostData(snapshot);
    });

    // const task = firebase
    //   .storage()
    //   .ref()
    //   .child(
    //     `post/${firebase.auth().currentUser.uid}/${Math.random().toString(36)}`
    //   )
    //   .put(blob);

    // const taskProgress = (snapshot) => {
    //   console.log(`transferred: ${snapshot.bytesTransferred}`);
    // };

    // const taskCompleted = () => {
    //   task.snapshot.ref.getDownloadURL().then((snapshot) => {
    //     console.log(snapshot);
    //   });
    // };

    // const taskError = (snapshot) => {
    //   console.log(snapshot);
    // };

    // task.on("state_changed", taskProgress, taskError, taskCompleted);
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
