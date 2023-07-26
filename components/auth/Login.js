import React, { Component } from "react";
import { View, Button, TextInput } from "react-native";
// import firebase from "firebase/compat/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { collection, addDoc } from "firebase/firestore";

export class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
    };
    this.onSignUp = this.onSignUp.bind(this);
  }

  onSignUp = async () => {
    console.log("SIGN UP");
    const { email, password } = this.state;

    const auth = getAuth();

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log("Firebase result");
        console.log(userCredential);
      })
      .catch((error) => {
        console.log("Firebase Error");
        console.log(error);
        console.log(error.message);
      });
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
        <Button onPress={() => this.onSignUp()} title="Sign In" />
      </View>
    );
  }
}

export default Login;
