import React, { useState, useEffect } from "react";
import {
  FlatList,
  Text,
  View,
  Image,
  TouchableHighlight,
  TextInput,
  Switch,
  Picker, CheckBox, ColorPropType
} from "react-native";
import hola from "./styles";
import { categories } from "../../data/dataArrays";
import { getNumberOfRecipes } from "../../data/MockDataAPI";
import {
  Checkbox,
  AppRegistry,
  StyleSheet,
  Button,
  SafeAreaView,
  Alert
} from "react-native";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Dropdown } from "react-native-material-dropdown";

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
import Moment from 'moment';
import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("BASEBASEBASE_2.db");

const Ingreso = ({navigation}) => {
  
  const [variable, setVariable] = useState([]);
 
  const [medioCobro, setMedioCobro] = useState('');
 
  const [detalleSelected, setDetalleSelected] = useState(' ');


  let detalle = [
    {
      value: "Sueldo",
    },
    {
      value: "Facturación Autónomo",
    },
    {
      value: "Alquiler",
    },
    {
      value: "Venta Bien Uso Personal",
    },
    {
      value: "Otro",
    },
  ];
  const [monto, setMonto] = useState('');
  const [isSelected, setSelection] = useState(false);
  const [cantMesesPeriodico, setCantMesesPeriodico] = useState(' ');
  const [fechaFutura, setFechaFutura] = useState(' ');
  const [diaFutura, setDiaFutura] = useState(' ');
  const [mesFutura, setMesFutura] = useState(' ');
  const [anioFutura, setAnioFutura] = useState(' ');
  const [semFutura, setSemFutura] = useState(' ');
  const [efect, setEfect] = useState(0);
  

  const setDate = (newDate) => {
    this.setState({ chosenDate: newDate });
  };

  const getCurrentDate = () => {
    var date = new Date().getDate();
    var month = new Date().getMonth() + 1;
    var year = new Date().getFullYear();

    
    return date + "/" + month + "/" + year;
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
  function getWeekNumber(d) {
    
    d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
    
    d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay()||7));
    
    var yearStart = new Date(Date.UTC(d.getUTCFullYear(),0,1));
    
    var weekNo = Math.ceil(( ( (d - yearStart) / 86400000) + 1)/7);
    
    return weekNo;
}

  const getWeek = () =>  {
    var dd = new Date();
    var d = new Date(Date.UTC(dd.getFullYear(), dd.getMonth(), dd.getDate()));
    d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay()||7));
    var yearStart = new Date(Date.UTC(d.getUTCFullYear(),0,1));
    var weekNo = Math.ceil(( ( (d - yearStart) / 86400000) + 1)/7);
    return weekNo;
};

  const handleSelect = async () => {
    await select();
  };
  useEffect(() => {
    handleSelect();
  }, []);

  const add =  (monto, detalle, medio, fecha, dia, mes, anio, sem) => {
    
    db.transaction((tx) => {
      tx.executeSql(
        "insert into movimientos (fecha, detalle, monto, medio, tipo_mov, comprobante, dia, mes, anio, sem, user) values (?, ?, ?, ?, 'Ingreso', '', ?, ?, ?, ?, (select id_usuario from usuarios where logueado = 1))",
        [fecha, detalle, monto, medio, dia, mes, anio, sem]
      ),
        (_, { rows }) => console.log(JSON.stringify(rows)),
        (_, { error }) => console.log(JSON.stringify(error));
    });
    
  };

  const select = async () => {
    
    await db.transaction((tx) => {
      tx.executeSql("select distinct numero from medios inner join usuarios on medios.user = usuarios.id_usuario where usuarios.logueado = 1 and medios.esCuentaBancaria=1 union  select distinct numero from medios where esEfectivo=1", [], (_, { rows }) => {
        setVariable(rows._array);
        
      });
    });
  };

  const continuar = () =>{
    
    if(medioCobro!=='Efectivo'){
      if(isSelected){
        

    
        
      
       const addMonths = require('addmonths')
       Moment.locale('en');
      
       var mes = ' ';
    
      for(let i=-1;i<cantMesesPeriodico;i++){
         
        

          
          
          
          setDiaFutura(addMonths(new Date(getFullYear(),getMonth(),getDate()), i).getDate());
          setMesFutura(addMonths(new Date(getFullYear(),getMonth(),getDate()), i).getMonth()+1);
          setAnioFutura(addMonths(new Date(getFullYear(),getMonth(),getDate()), i).getFullYear());
          setSemFutura(getWeekNumber(addMonths(new Date(getFullYear(),getMonth(),getDate()), i)));
        setFechaFutura(diaFutura + "/" + mesFutura + "/" + anioFutura);

    
          add(monto, detalleSelected, medioCobro,addMonths(new Date(getFullYear(),getMonth(),getDate()), i).getDate() + "/" + (addMonths(new Date(getFullYear(),getMonth(),getDate()), i).getMonth()+1)+ "/"+addMonths(new Date(getFullYear(),getMonth(),getDate()), i).getFullYear(), addMonths(new Date(getFullYear(),getMonth(),getDate()), i).getDate(), (addMonths(new Date(getFullYear(),getMonth(),getDate()), i).getMonth()+1), addMonths(new Date(getFullYear(),getMonth(),getDate()), i).getFullYear(), getWeekNumber(addMonths(new Date(getFullYear(),getMonth(),getDate()), i)));
         navigation.navigate("Home");
         
       }  
      }else{
    
          
          add(monto, detalleSelected, medioCobro, getCurrentDate(), getDate(), getMonth(), getFullYear(), getWeek());
          navigation.navigate("Home");
         
      }
    }else{
      if(isSelected){
        
    
        Alert.alert(
          `No se pueden realizar ingresos  `,
          `perdiódicos en efectivo`
           ,
           [
             {
               text: "Confirmar",
             },
           ]
         )
      }else{
        
    
        add(monto, detalleSelected, medioCobro, getCurrentDate(), getDate(), getMonth(), getFullYear(), getWeek());
        navigation.navigate("Home");
        
      }
    }

   
    
    
  };
  

  return (
    <View style={styles.viewContainer}>
      <TextInput
        style={styles.textInput}
        placeholder="Monto"
        clearButtonMode="always"
        keyboardType="number-pad"
        onChangeText={monto => setMonto(monto)}
  
      />

      <Dropdown
        label="Seleccionar Detalle"
        data={detalle}
        onChangeText={(detalleSelected) => setDetalleSelected(detalleSelected)}
        disabled={false}
      />

      <View>
        <Picker
          style={{
            height: 40,
            marginTop: 22,
            backgroundColor: "#FFF",
          }}
          selectedValue={medioCobro}
          onValueChange={(val) => setMedioCobro(val)}
        >
          <Picker.Item
            label={
              variable && variable.length > 0
                ? "-- Seleccione un medio de cobro --"
                : "-- No posee medio de cobro registrado --"
            }
            value=""
          />
          {variable &&
            variable.map((item, i) => (
              <Picker.Item
                label={`${item.numero}`}
                value={`${item.numero}`}
                key={i}
              />
            ))}
        </Picker>
      </View>

      {<View style={{flexDirection: "row",
    marginTop: 20}}>
       <Text>Periódico</Text>           
     
          <CheckBox value={isSelected} onValueChange={setSelection}/>
          
      {isSelected && (
          <TextInput
          style={styles.textInput}
          placeholder="Cantidad de meses"
          clearButtonMode="always"
          keyboardType="number-pad"
          onChangeText={cantMesesPeriodico => setCantMesesPeriodico(cantMesesPeriodico)}
  
        />
        )}
      </View>}
        

     <View><Button title="Guardar" onPress={() =>  continuar()} /></View>
     
      
      
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

export default Ingreso;
