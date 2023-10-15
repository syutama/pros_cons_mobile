import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const App = () => {
  const [counter1, setCounter1] = useState(0);
  const [counter2, setCounter2] = useState(0);

  useEffect(() => {
    retrieveCounters();
  }, []);

  useEffect(() => {
    storeCounters();
  }, [counter1, counter2]);

  const retrieveCounters = async () => {
    try {
      const recoveredCounter1 = await AsyncStorage.getItem("counter1");
      const recoveredCounter2 = await AsyncStorage.getItem("counter2");

      if (recoveredCounter1 !== null) setCounter1(Number(recoveredCounter1));
      if (recoveredCounter2 !== null) setCounter2(Number(recoveredCounter2));
    } catch (e) {
      console.log("Failed to load counters.");
    }
  };

  const storeCounters = async () => {
    try {
      await AsyncStorage.setItem("counter1", counter1.toString());
      await AsyncStorage.setItem("counter2", counter2.toString());
    } catch (e) {
      console.log("Failed to save counters");
    }
  };

  const handleClick1 = () => {
    setCounter1(counter1 + 1);
  };

  const handleClick2 = () => {
    setCounter2(counter2 + 1);
  };

  const handleReset = () => {
    setCounter1(0);
    setCounter2(0);
  };

  return (
    <View style={styles.outerContainer}>
      <Text style={styles.heading}>Pros&Cons</Text>
      <Text style={styles.header}>Cozy Counter App</Text>
      <Image
        source={require("./assets/garden.png")}
        style={{ width: 160, height: 160, marginTop: 50, marginBottom: 80 }}
      />
      <View style={styles.innerContainer}>
        <View style={styles.counterValues}>
          <Text style={styles.counterValue}>Pros: {counter1}</Text>
          <Text style={styles.counterValue}>Cons: {counter2}</Text>
        </View>
        <View style={styles.buttons}>
          <TouchableOpacity style={styles.button1} onPress={handleClick1}>
            <Text style={{ color: "#798777", fontWeight: "500", fontSize: 18 }}>
              +
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button2} onPress={handleClick2}>
            <Text style={{ color: "#798777", fontWeight: "500", fontSize: 18 }}>
              +
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={{ margin: 15 }}>
        <TouchableOpacity
          onPress={handleReset}
          style={styles.setInitialCountButton}
        >
          <Text style={{ color: "#fff", fontSize: 16 }}>RESET</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F8EDE3",
  },

  innerContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 50,
  },

  header: {
    fontSize: 18,
    marginVertical: 10,
    color: "#798777",
    textTransform: "uppercase",
    fontWeight: "700",
  },

  heading: {
    color: "#798777",
    fontSize: 35,
    fontWeight: "700",
    textTransform: "uppercase",
  },

  counterValues: {
    flexDirection: "column",
    justifyContent: "center",
  },

  counterValue: {
    fontSize: 36,
    marginVertical: 10,
    color: "#A2B29F",
    textTransform: "uppercase",
    fontWeight: "400",
  },

  buttons: {
    flexDirection: "column",
    justifyContent: "center",
  },

  button1: {
    fontSize: 16,
    padding: 10,
    margin: 10,
    borderRadius: 8,
    backgroundColor: "#BFD8B8",
    elevation: 5,
  },

  button2: {
    fontSize: 16,
    padding: 10,
    margin: 10,
    borderRadius: 8,
    backgroundColor: "#BFD8B8",
    elevation: 5,
  },

  setInitialCountButton: {
    padding: 10,
    fontSize: 16,
    margin: 15,
    borderRadius: 8,
    backgroundColor: "#E2C2B9",
    elevation: 5,
  },
});

export default App;
