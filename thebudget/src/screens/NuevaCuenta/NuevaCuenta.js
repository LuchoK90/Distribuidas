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

const NuevaCuenta = ({ navigation }) => {

  const [variable, setVariable] = useState([]);
  const [bankAccounts, setBankAccounts] = useState([]);
  const [medioCobro, setMedioCobro] = useState("");
  const [banco, setBanco] = useState(' ');
  const [numeroCuenta, setNumeroCuenta] = useState(' ');
  const [cbu, setCBU] = useState(' ');
  const [tarjetaAsociada, setTarjetaAsociada] = useState(' ');
  const [saldo, setSaldo] = useState(' ');
  
 
  
  let emisor=[{
    value: 'Visa',
  },{
    value: 'MasterCard',
  },{
    value: 'Cabal',
  },{
    value: 'American Express',
  }]
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


  const getCurrentDate = () => {
    var date = new Date().getDate();
    var month = new Date().getMonth() + 1;
    var year = new Date().getFullYear();

    
    return date + "/" + month + "/" + year;
  };

  

  const add=(banco, numeroCuenta, cbu, tarjetaAsociada, saldo) => {
   
    db.transaction((tx) => {
      tx.executeSql(
        "insert into medios (banco , numero , cbu , debito , saldo ,entidad , vencimiento , cierre_resumen , vencimiento_resumen , esCuentaBancaria , esTarjetaCredito , esEfectivo,  vencimientoResumenDia, vencimientoResumenMes, vencimientoResumenAnio, vencimientoResumenSem, user ) VALUES(?,?,?,?,?,'','','','',1,0,0, '', '', '', '', (select id_usuario from usuarios where logueado = 1));",
        [banco, numeroCuenta, cbu, tarjetaAsociada, saldo]
      ),
        (_, { rows }) => console.log(JSON.stringify(rows)),
        (_, { error }) => console.log(JSON.stringify(error));
    });
  };

  const continuar = () =>{
    add(banco, numeroCuenta, cbu, tarjetaAsociada, saldo);
    navigation.navigate("Home");
  };

  
  

  return (
    <View style={styles.viewContainer}>
      <TextInput
        style={styles.textInput}
        placeholder="Entidad Bancaria"
        clearButtonMode="always"
        onChangeText={banco => setBanco(banco)}
  
      />

      <TextInput
        style={styles.textInput}
        placeholder="Número de Cuenta"
        clearButtonMode="always"
        onChangeText={numeroCuenta => setNumeroCuenta(numeroCuenta)}
  
      />

      <TextInput
        style={styles.textInput}
        placeholder="CBU"
        clearButtonMode="always"
        keyboardType="number-pad"
        onChangeText={cbu => setCBU(cbu)}
  
      />
      
      <TextInput
        style={styles.textInput}
        placeholder="Número Tarjeta Asociada"
        clearButtonMode="always"
        keyboardType="number-pad"
        onChangeText={tarjetaAsociada => setTarjetaAsociada(tarjetaAsociada)}
  
      />

      <TextInput
        style={styles.textInput}
        placeholder="Saldo"
        clearButtonMode="always"
        keyboardType="number-pad"
        onChangeText={saldo => setSaldo(saldo)}
  
      />
        
        

      <Button title="Guardar" onPress={() => continuar() } />
      
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

export default NuevaCuenta;