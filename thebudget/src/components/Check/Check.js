import React, { useState } from "react";
import { CheckBox, Text, StyleSheet, View } from "react-native";
import ElegirFecha from '../ElegirFecha/ElegirFecha';
import {
  Dropdown }
  from 'react-native-material-dropdown';


const Check = () => {
  const [isSelected, setSelection] = useState(false);
  let meses=[{
    value: 'Todos los meses',
  },{
    value: 'Bimestral',
  },{
    value: 'Trimestral',
  },{
    value: 'Cuatrimestral',
  },{
    value: 'Semestral',
  }]

  return (
    <View style={styles.container}>
      <View style={styles.checkboxContainer}>
        <CheckBox
          value={isSelected}
          onValueChange={setSelection}
          style={styles.checkbox}
        />
        <Text style={styles.label}>Do you like React Native?</Text>
      </View>
      
      <Text>Is CheckBox selected: {isSelected ? <View><ElegirFecha title="hasta" style={{width:'100%'}}></ElegirFecha>
    <Dropdown 
      label='Periodicidad'
      data={meses}
      mul
    /> </View>: "👎"}</Text>
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
  checkbox: {
    alignSelf: "center",
  },
  label: {
    margin: 8,
  },
});

export default Check;
