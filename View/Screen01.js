import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  TouchableOpacity,
  Image,
  TextInput,
  ViewComponent,
} from "react-native";

import { useNavigation, useRoute } from "@react-navigation/native";

export default function Screen01() {
  const navigation = useNavigation();
  const [data, setData] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    fetch("https://retoolapi.dev/QzlJPe/data")
      .then((response) => response.json())
      .then((json) => {
        setData(json);
      });
  }, []);
  console.log(data);
  const createAcc = () => {
    navigation.navigate("Screen02");
  };
  const handelScreen_02 = () => {
    const user = data.find(
      (user) => user.username === email && user.pass.toString() === password
    );
    console.log(user);  
    if (user) {
      navigation.navigate("Screen03", { selectedUser: email });
      alert("Ok");
    } else {
      alert("Sai email hoặc mật khẩu");
    }
  };
  return (
    <View style={styles.container}>
      <View
        style={{
          height: 300,
          width: 300,
          justifyContent: "flex-end",
          alignItems: "center",
        }}
      >
        <Image
          source={require("../image/takenote.png")}
          style={{ height: 250, width: 250 }}
        />
      </View>

      <Text
        style={{
          marginTop: 30,
          width: 200,
          color: "#8353E2",
          textAlign: "center",
          fontFamily: "Epilogue",
          fontSize: 24,
          fontWeight: 700,
          fonStyle: "normal",
        }}
      >
        MANAGE YOUR TASK
      </Text>
      <View
        style={{
          marginTop: 15,
          alignItems: "center",
          flexDirection: "row",
          height: 40,
          width: 340,
          borderWidth: 1,
          borderBlockColor: "#9095A0",
          borderRadius: 12,
        }}
      >
        <Image
          source={require("../image/email.png")}
          style={{ height: 20, width: 20, marginLeft: 15 }}
          resizeMode="contain"
        />
        <TextInput
          style={{ height: 40, width: 305, borderRadius: 12, padding: 10 }}
          placeholder="Enter your Name"
          onChangeText={(text) => setEmail(text)}
          value={email}
        />
      </View>
      <View
        style={{
          marginTop: 15,
          alignItems: "center",
          flexDirection: "row",
          height: 40,
          width: 340,
          borderWidth: 1,
          borderBlockColor: "#9095A0",
          borderRadius: 12,
        }}
      >
        <Image
          source={require("../image/eye.png")}
          style={{ height: 20, width: 20, marginLeft: 15 }}
          resizeMode="contain"
        />
        <TextInput
          style={{ height: 40, width: 305, borderRadius: 12, padding: 10 }}
          placeholder="Enter your password"
          onChangeText={(text) => setPassword(text)}
          value={password}
          secureTextEntry={true}
        />
      </View>
      <TouchableOpacity onPress={createAcc}>
        <View
          style={{
            justifyContent: "flex-end",
            flexDirection: "row",
            height: 20,
            width: 340,
          }}
        >
          <Text
            style={{
              marginRight: 10,
              marginTop: 5,
              color: "blue",
              textAlign: "center",
              fontFamily: "arial",
              fontSize: 15,
              fontWeight: 500,
              fonStyle: "normal",
            }}
          >
            Create acc
          </Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={handelScreen_02}>
        <View
          style={{
            marginTop: 40,
            justifyContent: "center",
            alignItems: "center",
            height: 40,
            width: 170,
            borderRadius: 10,
            backgroundColor: "#00BDD6",
          }}
        >
          <Text
            style={{
              color: "#FFF",
              textAlign: "center",
              fontFamily: "arial",
              fontSize: 15,
              fontWeight: 500,
              fonStyle: "normal",
            }}
          >
            GET STARTED
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start", // Để căn giữa theo chiều dọc
  },
});
