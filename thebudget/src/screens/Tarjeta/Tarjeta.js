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

const Tarjeta = ({ navigation }) => {

  const [variable, setVariable] = useState([]);
  const [bankAccounts, setBankAccounts] = useState([]);
  const [medioCobro, setMedioCobro] = useState("");
  const [banco, setBanco] = useState(' ');
  const [entidadEmisora, setEntidadEmisora] = useState(' ');
  const [ultimosNum, setUltimosNum] = useState(' ');
  const [fechaVenc, setFechaVenc] = useState(' ');
  const [fechaCierre, setFechaCierre] = useState(' ');
  const [fechaVencResumen, setFechaVencResumen] = useState(' ');

  const [detalleSelected, setDetalleSelected] = useState();
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

  submitAndClear = () => {
    this.props.writeText(this.state.text);

    this.setState({
      text: "",
    });
  };

  setDate = (newDate) => {
    this.setState({ chosenDate: newDate });
  };

  const getDate = () => {   
    var day = new Date().getDate();  


    return day;
  };

  const getMonth = () => {   
    var month = new Date().getMonth() + 1;  


    return month;
  };

  const getFullYear = () => {   
    var year = new Date().getFullYear();  


    return year;
  };


 const getWeek = () =>  {
    var dd = new Date();
    var d = new Date(Date.UTC(dd.getFullYear(), dd.getMonth(), dd.getDate()));
    d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay()||7));
    var yearStart = new Date(Date.UTC(d.getUTCFullYear(),0,1));
    var weekNo = Math.ceil(( ( (d - yearStart) / 86400000) + 1)/7);
    return weekNo;
};

function getWeekNumber(d) {
   

    d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));

    d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay()||7));

    var yearStart = new Date(Date.UTC(d.getUTCFullYear(),0,1));

    var weekNo = Math.ceil(( ( (d - yearStart) / 86400000) + 1)/7);

    return weekNo;
}


  const getCurrentDate = () => {
    var date = new Date().getDate();
    var month = new Date().getMonth() + 1;
    var year = new Date().getFullYear();


    return date + "/" + month + "/" + year;
  };

  

  const add = (banco, entidadEmisora, ultimosNum, fechaVenc, fechaCierre, fechaVencResumen, dia, mes, anio, sem) => {
    
    db.transaction((tx) => {
      tx.executeSql(
        "insert into medios (banco , numero , cbu , debito , saldo ,entidad , vencimiento , cierre_resumen , vencimiento_resumen , esCuentaBancaria , esTarjetaCredito , esEfectivo, vencimientoResumenDia, vencimientoResumenMes, vencimientoResumenAnio, vencimientoResumenSem, user) VALUES(?,?,' ',' ',0.0,?,?,?,?,0,1,0,?,?,?,?, (select id_usuario from usuarios where logueado = 1));",
        [banco, ultimosNum, entidadEmisora, fechaVenc, fechaCierre , fechaVencResumen, dia, mes, anio, sem]
      ),
        (_, { rows }) => console.log(JSON.stringify(rows)),
        (_, { error }) => console.log(JSON.stringify(error));
    });
  };

  const continuar = () =>{
    
    var dateString = fechaVencResumen;
    var dateParts = dateString.split("/");
    var dateObject = new Date(+dateParts[2], dateParts[1] - 1, +dateParts[0]); 
    add(banco, entidadEmisora, ultimosNum, fechaVenc, fechaCierre, fechaVencResumen, Number(fechaVencResumen.substring(0,2)), Number(fechaVencResumen.substring(3,5)), Number(fechaVencResumen.substring(6,10)), getWeekNumber(dateObject));
    navigation.navigate("Home");
  };

  


  return (
    <View style={styles.viewContainer}>
      <TextInput
        style={styles.textInput}
        placeholder="Banco"
        clearButtonMode="always"
        onChangeText={banco => setBanco(banco)}

      />

      <Dropdown
        label="Seleccionar entidad emisora"
        data={emisor}
        onChangeText={entidadEmisora => setEntidadEmisora(entidadEmisora )}
        disabled={false}
      />

      

      <TextInput
        style={styles.textInput}
        placeholder="Últimos 4 números"
        clearButtonMode="always"
        keyboardType="number-pad"
        onChangeText={ultimosNum => setUltimosNum(ultimosNum)}

      />
      
        
        <TextInput
        style={styles.textInput}
        placeholder="Fecha Vencimiento (mm/aaaa)"
        clearButtonMode="always"
        onChangeText={fechaVenc => setFechaVenc(fechaVenc)}

      />

      <TextInput
        style={styles.textInput}
        placeholder="Fecha Cierre Resumen (dd/mm/aaaa)"
        clearButtonMode="always"
        onChangeText={fechaCierre => setFechaCierre(fechaCierre)}

      />

      <TextInput
        style={styles.textInput}
        placeholder="Fecha Vencimiento Resumen(dd/mm/aaaa)"
        clearButtonMode="always"
        onChangeText={fechaVencResumen => setFechaVencResumen(fechaVencResumen)}

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

export default Tarjeta;