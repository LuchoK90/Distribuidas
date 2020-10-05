import React, { useState, useEffect } from "react";
import {
  FlatList,
  Text,
  View,
  Image,
  TouchableHighlight,
  TextInput,
  Switch,
  Picker,
} from "react-native";
import hola from "./styles";
import { categories } from "../../data/dataArrays";
import { getNumberOfRecipes } from "../../data/MockDataAPI";
import {
  AppRegistry,
  StyleSheet,
  Button,
  SafeAreaView,
  Alert,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Dropdown } from "react-native-material-dropdown";
import { Checkbox } from "react-native-paper";
import ElegirFecha from "../../components/ElegirFecha/ElegirFecha";
import Check from "../../components/Check/Check";

import { Platform } from "react-native";
import * as ImagePicker from "expo-image-picker";
import Constants from "expo-constants";
import * as Permissions from "expo-permissions";
import SelectMultiple from "react-native-select-multiple";
import MultiSelect from "react-native-multiple-select";
import PickList from "react-native-picklist";
import CustomMultiPicker from "react-native-multiple-select-list";
import DatePicker from "react-native-datepicker";
import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("BASEBASEBASE_2.db");

const PresupuestarPrestamos = ({ navigation }) => {
  
  const [variable, setVariable] = useState([]);
  const [bankAccounts, setBankAccounts] = useState([]);
  const [medioCobro, setMedioCobro] = useState("");
  
  const [detalleSelected, setDetalleSelected] = useState();
  let detalle = [
    {
      value: "Solicitado",
    },
  
  ];
  const [monto, setMonto] = useState(0);

  

  const navigationOptions = ({ navigation }) => {
    return {
      headerTransparent: "true",
      headerLeft: () => (
        <BackButton
          onPress={() => {
            navigation.goBack();
          }}
        />
      ),
    };
  };

  submitAndClear = () => {
    this.props.writeText(this.state.text);

    this.setState({
      text: "",
    });
  };

  setDate = (newDate) => {
    this.setState({ chosenDate: newDate });
  };

  const getCurrentDate = () => {
    var date = new Date().getDate();
    var month = new Date().getMonth() + 1;
    var year = new Date().getFullYear();

  
    return  month;
  };
  const getCurrentYear = () => {
    var date = new Date().getDate();
    var month = new Date().getMonth() + 1;
    var year = new Date().getFullYear();

  
    return  year;
  };

  const handleSelect = async () => {
    await select();
  };
  useEffect(() => {
    handleSelect();
  }, []);

  const add=(detalleSelected,monto) => {
    
    db.transaction((tx) => {
      tx.executeSql(
        "insert into presupuestos ( mes, anio , rubro ,categoria, monto, user) values (?,?,'Prestamo',?,?, (select id_usuario from usuarios where logueado = 1))",
        [getCurrentDate(), getCurrentYear(),detalleSelected,monto]
      ),
        (_, { rows }) => console.log(JSON.stringify(rows)),
        (_, { error }) => console.log(JSON.stringify(error));
    });
  };


  const continuar = () =>{
    add(detalleSelected,monto);
    navigation.navigate("Home");
  };
  

  return (
    <View style={styles.viewContainer}>

      <Dropdown
        label="Seleccionar Categoría"
        data={detalle}
        onChangeText={(det) => setDetalleSelected(det)}
        disabled={false}
      />

      <TextInput
        style={styles.textInput}
        placeholder="Monto"
        clearButtonMode="always"
        keyboardType="number-pad"
        onChangeText={(monto) => setMonto(monto)}
  
      />

      <Button title="Guardar" onPress={() => continuar()} />
      
    </View>

  
  );
};

const styles = StyleSheet.create({
  viewContainer: {
    flexDirection: "column",
    flex: 1,
    width: "90%",
    marginLeft: 20,
    marginTop: 20,
    padding: 10,
  },
  textInput: {
    height: 40,
    borderWidth: 1,
    borderColor: "gray",
    paddingLeft: 20,
    margin: 10,
  
  },
  drop: {
  
    paddingLeft: 20,
    margin: 10,
  
  },
  boton: {
    height: 40,
    borderWidth: 1,
  
    paddingLeft: 20,
    margin: 10,
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  periodico: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },

  row: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  box: {
    flex: 1,
    height: 160,
    backgroundColor: "#333",
  },
  box2: {
    backgroundColor: "green",
  },
  box3: {
    backgroundColor: "orange",
  },
  two: {
    flex: 2,
  },
  checkbox: {
    alignSelf: "center",
  },
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

export default PresupuestarPrestamos;
