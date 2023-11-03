import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

// IncrementButton component
const IncrementButton = ({ onPress, style }) => {
  return (
    <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
      <Text style={styles.buttonText}>+</Text>
    </TouchableOpacity>
  );
};

const App = () => {
  const [prosCount, setProsCount] = useState(0);
  const [consCount, setConsCount] = useState(0);

  // Effect to retrieve counters from storage
  useEffect(() => {
    retrieveCounters();
  }, []);

  // Effect to store counters when they change
  useEffect(() => {
    storeCounters();
  }, [prosCount, consCount]);

  // Retrieve counters from AsyncStorage
  const retrieveCounters = async () => {
    try {
      const storedProsCount = await AsyncStorage.getItem("counter1");
      const storedConsCount = await AsyncStorage.getItem("counter2");

      if (storedProsCount !== null) setProsCount(Number(storedProsCount));
      if (storedConsCount !== null) setConsCount(Number(storedConsCount));
    } catch (error) {
      console.error("Failed to load counters:", error);
    }
  };

  // Store counters in AsyncStorage
  const storeCounters = async () => {
    try {
      await AsyncStorage.setItem("counter1", prosCount.toString());
      await AsyncStorage.setItem("counter2", consCount.toString());
    } catch (error) {
      console.error("Failed to save counters:", error);
    }
  };

  // Increment pros count
  const incrementPros = () => {
    setProsCount(prosCount + 1);
  };

  // Increment cons count
  const incrementCons = () => {
    setConsCount(consCount + 1);
  };

  // Reset both counters
  const resetCounters = () => {
    setProsCount(0);
    setConsCount(0);
  };

  return (
    <View style={styles.outerContainer}>
      <Text style={styles.heading}>Pros & Cons</Text>
      <Text style={styles.header}>Cozy Counter App</Text>
      <Image source={require("./assets/garden.png")} style={styles.image} />
      <View style={styles.innerContainer}>
        <View style={styles.counterValues}>
          <Text style={styles.counterValue}>Pros: {prosCount}</Text>
          <Text style={styles.counterValue}>Cons: {consCount}</Text>
        </View>
        <View style={styles.buttons}>
          <IncrementButton onPress={incrementPros} />
          <IncrementButton onPress={incrementCons} />
        </View>
      </View>
      <TouchableOpacity onPress={resetCounters} style={styles.resetButton}>
        <Text style={styles.resetButtonText}>RESET</Text>
      </TouchableOpacity>
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

  image: {
    width: 160,
    height: 160,
    marginTop: 50,
    marginBottom: 80,
  },

  innerContainer: {
    flexDirection: "row",
    justifyContent: "center",
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

  button: {
    fontSize: 16,
    padding: 10,
    margin: 10,
    borderRadius: 8,
    backgroundColor: "#BFD8B8",
    elevation: 5,
  },

  buttonText: {
    color: "#798777",
    fontWeight: "500",
    fontSize: 18,
  },

  resetButton: {
    padding: 10,
    borderRadius: 8,
    backgroundColor: "#E2C2B9",
    elevation: 5,
  },

  resetButtonText: {
    color: "#fff",
    fontSize: 16,
  },
});

export default App;
