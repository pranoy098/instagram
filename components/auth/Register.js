import React, { Component } from "react";
import { View, Button, TextInput } from "react-native";
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore, collection, addDoc } from "firebase/firestore";

export class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      name: "",
    };

    this.onSignUp = this.onSignUp.bind(this);

    // Initialize Firebase

    // Initialize Cloud Firestore and get a reference to the service
  }

  onSignUp = async () => {
    console.log("SIGN UP");
    const { email, password, name } = this.state;
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log("Firebase result");
        // firebase
        //   .firestore()
        //   .collection("users")
        //   .doc(firebase.auth().currentUser.uid)
        //   .set({
        //     name,
        //     email,
        //   });
        this.saveData();
        console.log(userCredential);
      })
      .catch((error) => {
        console.log("Firebase Error");
        console.log(error);
        console.log(error.message);
      });
  };

  saveData = async () => {
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
      console.log("email", this.state.email);
      console.log("name", this.state.name);

      const docRef = await addDoc(collection(db, "users"), {
        email: this.state.email,
        name: this.state.name,
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  render() {
    return (
      <View style={{ paddingTop: 220 }}>
        <TextInput
          placeholder="name"
          onChangeText={(name) => this.setState({ name: name })}
        />
        <TextInput
          placeholder="email"
          onChangeText={(email) => this.setState({ email: email })}
        />
        <TextInput
          placeholder="password"
          secureTextEntry={true}
          onChangeText={(password) => this.setState({ password: password })}
        />
        <Button onPress={() => this.onSignUp()} title="Sign Up" />
      </View>
    );
  }
}

export default Register;
