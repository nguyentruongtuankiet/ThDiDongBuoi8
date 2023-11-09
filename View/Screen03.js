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
import {
  useNavigation,
  useRoute,
  useFocusEffect,
} from "@react-navigation/native";

export default function Screen03() {
  const route = useRoute();
  const navigation = useNavigation();
  const [note, setNote] = useState("");

  const [data, setData] = useState([]);
  const selectedUser = route.params ? route.params.selectedUser : "";

  const handelScreen_04 = () => {
    navigation.navigate("Screen04", { selectedUsername: selectedUser });
  };
  useFocusEffect(
    React.useCallback(() => {
      // Fetch dữ liệu mới mỗi khi màn hình được tập trung
      fetch("https://retoolapi.dev/QzlJPe/data")
        .then((response) => response.json())
        .then((json) => {
          setData(json);
        });
    }, [])
  );
  useEffect(() => {
    fetch("https://retoolapi.dev/QzlJPe/data")
      .then((response) => response.json())
      .then((json) => {
        setData(json);
      });
  }, []);
  const getjobByName = () => {
    const user = data.find((user) => user.username === selectedUser);
    if (user) {
      return user.job || [];
    }
    return [];
  };
  const handleDelete = (index) => {
    const updatedJobs = [...getjobByName()];
    updatedJobs.splice(index, 1);

    // Cập nhật danh sách công việc sau khi xóa
    const userIndex = data.findIndex((user) => user.username === selectedUser);
    const updatedData = [...data];
    updatedData[userIndex].job = updatedJobs;

    fetch(`https://retoolapi.dev/QzlJPe/data/${updatedData[userIndex].id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedData[userIndex]),
    })
      .then((json) => {
        setData(updatedData);
        alert("Xóa thành công 1 note");
      })
      .catch((error) => {
        console.error("Error updating data: ", error);
        alert("Xóa thất bại");
      });
  };
  return (
    <View style={styles.container}>
      <View
        style={{
          justifyContent: "space-between",
          height: 60,
          width: 350,
          //   backgroundColor: "red",
          flexDirection: "row",
          marginTop: 15,
        }}
      >
        <Text style={{ fontSize: 30 }}>←</Text>
        <View style={{ height: 60, width: 200 }}>
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
            Hi {selectedUser}
          </Text>
          <Text
            style={{
              textAlign: "center",
              color: "#000",
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
      <View
        style={{
          height: 40,
          width: 320,
          borderWidth: 0.5,
          borderColor: "#9095A0",
          borderRadius: 4,
          marginTop: 5,
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Image
          source={require("../image/search.png")}
          style={{ height: 20, width: 20, marginLeft: 10 }}
        />
        <TextInput
          style={{ height: 38, width: 300, padding: 10, marginLeft: 5 }}
          placeholder="Search"
          onChangeText={(text) => setNote(text)}
          value={note}
        />
      </View>
      <View style={{ height: 300, marginTop: 20 }}>
        <ScrollView nestedScrollEnabled>
          {getjobByName().length > 0 && (
            <FlatList
              data={getjobByName()}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    borderRadius: 50,
                    margin: 7,
                    height: 40,
                    width: 310,
                    backgroundColor: "#D3D5D8",
                  }}
                >
                  <Image
                    source={require("../image/Tick.png")}
                    style={{ height: 20, width: 17, marginLeft: 17 }}
                  />
                  <Text style={{ fontSize: 17, fontWeight: 500 }}>{item}</Text>
                  <TouchableOpacity onPress={handleDelete}>
                    <Text
                      style={{
                        marginRight: 10,
                        fontSize: 15,
                        fontWeight: 700,
                        color: "red",
                      }}
                    >
                      Xóa
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
            />
          )}
        </ScrollView>
      </View>
      <TouchableOpacity onPress={handelScreen_04}>
        <View
          style={{
            backgroundColor: "#00BDD6",
            height: 50,
            width: 50,
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 100,
          }}
        >
          <Text style={{ color: "#FFF", fontSize: 40, marginBottom: 10 }}>
            +
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
    justifyContent: "flex-start",
    backgroundColor: "#FFF",
  },
});
