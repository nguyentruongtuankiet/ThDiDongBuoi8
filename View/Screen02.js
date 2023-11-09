import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function Screen02() {
  const navigation = useNavigation();
  const [data, setData] = useState([]);
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [nameError, setNameError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  useEffect(() => {
    fetch("https://retoolapi.dev/QzlJPe/data")
      .then((response) => response.json())
      .then((json) => {
        setData(json);
      });
  }, []);
  const handleCreateAccount = () => {
    const namePattern = /^[A-Za-z\s]+$/; // Cho phép chữ cái và khoảng trắng
    const passwordPattern = /^\d+$/; // Chỉ chứa con số
    if (!name.match(namePattern)) {
      setNameError("Tên không hợp lệ");
    } else {
      setNameError("");
    }
    if (!password.match(passwordPattern)) {
      setPasswordError("Mật khẩu phải chứa chỉ con số");
    } else {
      setPasswordError("");
    }

    let maxID = 0;
    data.forEach((user) => {
      if (user.id > maxID) {
        maxID = user.id;
      }
    });
    if (name.match(namePattern) && password.match(passwordPattern)) {
      alert("Thêm tài Khoản thành công!!");
      const newAccount = {
        id: parseInt(maxID) + 1, 
        username: name,
        pass: parseInt(password, 10),
      };
      fetch("https://retoolapi.dev/QzlJPe/data", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newAccount),
      })
        .then(() => {
            navigation.navigate("Screen01");
        })
        .catch((error) => {
          console.error("Lỗi khi thêm tài khoản: ", error);
        });
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={require("../image/takenote.png")}
        style={{ height: 150, width: 150, marginTop: 100 }}
      />
      <Text style={styles.header}>Create an Account</Text>
      <TextInput
        style={styles.input}
        placeholder="Name"
        onChangeText={(text) => setName(text)}
        value={name}
      />
      <Text style={styles.errorText}>{nameError}</Text>
      <TextInput
        style={styles.input}
        placeholder="Password"
        onChangeText={(text) => setPassword(text)}
        value={password}
        secureTextEntry={true}
      />
      <Text style={styles.errorText}>{passwordError}</Text>
      <TouchableOpacity onPress={handleCreateAccount}>
        <View style={styles.button}>
          <Text style={styles.buttonText}>Create Account</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    marginTop: 20,
  },
  input: {
    height: 40,
    width: 300,
    borderWidth: 1,
    borderRadius: 12,
    padding: 10,
    marginBottom: 10,
  },
  button: {
    marginTop: 20,
    height: 40,
    width: 200,
    borderRadius: 10,
    backgroundColor: "#00BDD6",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "#FFF",
    fontSize: 15,
    fontWeight: "bold",
  },
  errorText: {
    color: "red",
    marginBottom: 10,
  },
});
