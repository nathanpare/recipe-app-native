import React, { useEffect, useState } from "react";
import {
  Text,
  Keyboard,
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  ActivityIndicator,
  FlatList,
  Image,
} from "react-native";

const HomeScreen = ({ navigation }) => {
  const [recipes, setRecipes] = useState();
  const [searchQuery, setSearchQuery] = useState(" ");
  const [numberOfRecipes, setNumberOfRecipes] = useState("1");
  const [loading, setLoading] = useState(false);

  const apiId = "33ae5930";
  const apiKey = `
  73fcb7d7d05b2b184a06bdf8891c78c0`;
  const apiURL = `https://api.edamam.com/search?q=${searchQuery}&app_id=${apiId}&app_key=${apiKey}&from=0&to=${numberOfRecipes}&calories=591-722&health=alcohol-free`;

  async function apiCall() {
    setLoading(true);
    let resp = await fetch(apiURL);
    let respJson = await resp.json();
    setRecipes(respJson.hits);
    setLoading(false);
    Keyboard.dismiss();
    setSearchQuery(" ");
  }

  useEffect(() => {
    setLoading(true);
    apiCall();
  }, []);

  return (
    <View style={styles.container}>
      <Text
        style={{
          fontSize: 23,
          fontWeight: "800",
          width: "90%",
          color: "#FF5A5F",
          marginBottom: 10
        }}
      >
        Search a recipe!
      </Text>
      <View style={{ display: "flex", flexDirection: "row" }}>
        <TextInput
          placeholder="search a recipe..."
          style={styles.inputField}
          onChangeText={(text) => setSearchQuery(text)}
        />

        <TextInput
          onChangeText={(text) => setNumberOfRecipes(text)}
          style={[
            styles.inputField,
            {
              width: "20%",
              fontSize: 18,
              marginLeft: 15,
              color: "white",
              fontWeight: "bold",
            },
          ]}
          value={numberOfRecipes}
          keyboardType="number-pad"
        />
      </View>
      <TouchableOpacity style={styles.button} onPress={apiCall} title="submit">
        <Text style={styles.buttonText}>Search</Text>
      </TouchableOpacity>
      <SafeAreaView style={{ flex: 1 }}>
        {loading ? (
          <ActivityIndicator size="large" color="black" />
        ) : (
          <FlatList
            style={styles.recipes}
            data={recipes}
            renderItem={({ item }) => (
              <View style={styles.recipes}>
                <Image
                  style={styles.img}
                  source={{ uri: `${item.recipe.image}` }}
                />
                <View style={{ padding: 20, flexDirection: "row" }}>
                  <Text style={styles.label}>{item.recipe.label}</Text>
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate("Details", { recipe: item.recipe });
                    }}
                  >
                    <Text
                      style={{ marginLeft: 50, fontSize: 20, color: "#FF5A5F" }}
                    >
                      Details
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
            keyExtractor={(item, index) => index.toString()}
          />
        )}
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "white",
  },
  inputField: {
    height: "120%",
    width: "65%",
    backgroundColor: "#FF5A5F",
    borderRadius: 20,
    marginTop: 10,
    paddingLeft: 15,
    color: "white",
  },
  buttons: {
    flexDirection: "row",
  },
  button: {
    backgroundColor: "#FF5A5F",
    width: "90%",
    alignItems: "center",
    margin: 15,
    height: 35,
    borderRadius: 15,
    justifyContent: "center",
    marginTop: 25,
  },
  buttonText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
  img: {
    width: "100%",
    height: 200,
    borderRadius: 20,
  },
  label: {
    fontSize: 15,
    width: "60%",
    color: "#FF5A5F",
    fontWeight: "700",
  },
  recipes: {
    shadowColor: "#FF5A5F",
    shadowOpacity: 0.5,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 20,
    backgroundColor: "white",
    margin: 10,
    marginBottom: 40,
  },
});

export default HomeScreen;
