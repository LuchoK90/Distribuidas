import React, { useState } from "react";
import { CheckBox, Text, StyleSheet, View } from "react-native";
import ElegirFecha from "../ElegirFecha/ElegirFecha";
import { Dropdown } from "react-native-material-dropdown";
import { TextInput } from "react-native-paper";

const CheckTC = () => {
  const [isSelectedTC, setSelection] = useState(false);
  const [cantCuotas, setCantCuotas] = useState(' ');
  let meses = [
    {
      value: "Todos los meses",
    },
    {
      value: "Bimestral",
    },
    {
      value: "Trimestral",
    },
    {
      value: "Cuatrimestral",
    },
    {
      value: "Semestral",
    },
  ];

  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
      }}
    >
      <View
        style={[
          styles.checkboxContainer,
          { flexDirection: "row", alignItems: "center" },
        ]}
      >
        <CheckBox
          value={isSelectedTC}
          onValueChange={setSelection}
          style={styles.checkbox}
        />
        {/*<Text>Periódico </Text>*/}
      </View>
      <View>
        {isSelectedTC && (
          <TextInput
          style={styles.textInput}
          placeholder="Cantidad de cuotas"
          clearButtonMode="always"
          keyboardType="number-pad"
          onChangeText={cantCuotas => setCantCuotas(cantCuotas)}
          //editable={this.state.TextInputDisableHolder}
        />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  checkboxContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },
  fechaContainer: {
    flex: 1,
    flexDirection: "row",
  },
  checkbox: {
    alignSelf: "center",
  },
  label: {
    margin: 8,
  },
});

export default CheckTC;

/* 
<Text>Is CheckBox selected: {isSelected ? <View><ElegirFecha title="hasta" style={{width:'100%'}}></ElegirFecha>
    <Dropdown 
      label='Periodicidad'
      data={meses}
      mul
    /> </View>: "👎"}</Text> 
    
    <Text>Is CheckBox selected: {isSelected ? <Text></Text> : "👎"}</Text>*/
