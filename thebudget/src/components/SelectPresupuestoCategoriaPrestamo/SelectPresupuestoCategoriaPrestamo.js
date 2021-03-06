import React, { useState } from "react";
import { View, Picker, StyleSheet } from "react-native";

const SelectTarjeta = () => {
  const [selectedValue, setSelectedValue] = useState("java");
  return (
    <View style={styles.container}>
      <Picker
        selectedValue={selectedValue}
        style={{ height: 50, width: 200, borderColor: 'lightblue' }}
        onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
      >
        <Picker.Item label="Solicitado" value="Solicitado" />
        <Picker.Item label="Otorgado" value="Otorgado" />
      </Picker>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    alignItems: "center"
  }
});

export default SelectTarjeta;
