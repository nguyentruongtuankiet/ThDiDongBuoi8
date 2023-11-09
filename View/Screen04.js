import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  Image,
  ScrollView,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";

export default function Screen04() {
  const navigation = useNavigation();
  const route = useRoute();
  const [data, setData] = useState([]);
  const [note, setNote] = useState("");
  const selectedUsername = route.params ? route.params.selectedUsername : "";
  useEffect(() => {
    fetch("https://retoolapi.dev/QzlJPe/data")
      .then((response) => response.json())
      .then((json) => {
        setData(json);
      });
  }, []);

  const handleFinish = () => {
    const usernameToFind = selectedUsername;
    const userIndex = data.findIndex(
      (user) => user.username === usernameToFind
    );

    if (userIndex !== -1) {
      const newJob = note;

      const updatedUser = {
        ...data[userIndex],
        job: data[userIndex].job ? [...data[userIndex].job, newJob] : [newJob],
      };

      fetch(`https://retoolapi.dev/QzlJPe/data/${updatedUser.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedUser),
      })
        .then((json) => {
          const updatedData = [...data];
          updatedData[userIndex] = updatedUser;
          setData(updatedData);
          alert("Job added successfully!");
          navigation.navigate("Screen03", { selectedUser: selectedUsername });
        })
        .catch((error) => {
          console.error("Error updating data: ", error);
          alert("Failed to update job. Please try again.");
        });
    }
  };
  return (
    <View style={styles.container}>
      <View
        style={{
          justifyContent: "space-between",
          height: 60,
          width: 350,
          flexDirection: "row",
          marginTop: 20,
        }}
      >
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Screen03", { selectedUser: selectedUsername });
          }}
        >
          <Text style={{ fontSize: 30 }}>←</Text>
        </TouchableOpacity>

        <View style={{ height: 60, width: 170 }}>
          <Text
            style={{
              textAlign: "center",
              color: "#000",
              fontFamily: "Epilogue",
              fontSize: 22,
              fontWeight: 700,
              fonStyle: "normal",
            }}
          >
            Hi Kiet
          </Text>
          <Text
            style={{
              textAlign: "center",
              color: "#9095A0",
              fontFamily: "Epilogue",
              fontSize: 17,
              fontWeight: 400,
              fonStyle: "normal",
            }}
          >
            Have agrate day a head
          </Text>
        </View>
      </View>
      <Text
        style={{
          textAlign: "center",
          color: "#000",
          fontFamily: "Epilogue",
          fontSize: 30,
          fontWeight: 700,
          fonStyle: "normal",
          marginTop: 60,
        }}
      >
        ADD YOUR JOB
      </Text>
      <View
        style={{
          height: 40,
          width: 320,
          borderWidth: 0.5,
          borderColor: "#9095A0",
          borderRadius: 4,
          marginTop: 30,
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Image
          source={require("../image/Frame.png")}
          style={{ height: 20, width: 20, marginLeft: 10 }}
        />
        <TextInput
          style={{ height: 36, width: 300, padding: 10, marginLeft: 5 }}
          placeholder="input your job"
          onChangeText={(text) => setNote(text)}
          value={note}
        />
      </View>
      <TouchableOpacity onPress={handleFinish}>
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
            FINISH
          </Text>
        </View>
      </TouchableOpacity>
      <View
        style={{
          height: 200,
          width: 200,
          justifyContent: "flex-end",
          alignItems: "center",
          marginTop: 40,
        }}
      >
        <Image
          source={require("../image/takenote.png")}
          style={{ height: 160, width: 160 }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor: "#FFF",
  },
});
