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
        <Picker.Item label="Universidad" value="Universidad" />
        <Picker.Item label="Luz" value="Luz" />
        <Picker.Item label="Gas" value="Gas" />
        <Picker.Item label="Cable" value="Cable" />
        <Picker.Item label="Teléfono" value="Telefono" />
        <Picker.Item label="Internet" value="Internet" />
        <Picker.Item label="Impuesto Nacional" value="Impuesto Nacional" />
        <Picker.Item label="Impuesto Provincial" value="Impuesto Provincial" />
        <Picker.Item label="Impuesto Municipal" value="Impuesto Municipal" />
        <Picker.Item label="Colegio" value="Colegio" />
        <Picker.Item label="Obra Social" value="Obra Social" />
        <Picker.Item label="Gastos Varios" value="Gastos Varios" />
        <Picker.Item label="Comida" value="Comida" />
        <Picker.Item label="Viáticos" value="Viáticos" />
        <Picker.Item label="Entretenimiento" value="Entretenimiento" />
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
