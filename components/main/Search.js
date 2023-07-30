import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
} from "react-native";

import { initializeApp } from "firebase/app";
import {
  doc,
  getFirestore,
  query,
  where,
  collection,
  getDocs,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";
export default function Search(props) {
  const [users, setUsers] = useState([]);

  const fetchUsers = async (search) => {
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
    const q = query(collection(db, "users"), where("name", ">=", search));

    const querySnapshot = await getDocs(q);
    let userArr = [];
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, " => ", doc.data());
      const id = doc.id;
      const data = doc.data();
      userArr.push({ id, ...data });
    });
    setUsers(userArr);
  };
  return (
    <View>
      <TextInput
        placeholder="Type Here ...."
        onChangeText={(search) => fetchUsers(search)}
      />
      <FlatList
        numColumns={1}
        horizontal={false}
        data={users}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() =>
              props.navigation.navigate("Profile", { uid: item.id })
            }
          >
            <Text>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
