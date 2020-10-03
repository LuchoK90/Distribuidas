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
  CheckBox
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
import CheckTC from "../../components/Check/CheckTC";

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
import Moment from 'moment';
const db = SQLite.openDatabase("BASEBASEBASE_2.db");

const Egreso = ({ navigation }) => {
  //export default class Ingreso extends React.Component {
  const [variable, setVariable] = useState([]);
  const [bankAccounts, setBankAccounts] = useState([]);
  const [medioCobro, setMedioCobro] = useState(' ');
  //const navigationOptions = () => { PickList.navigationOptions };
  const [detalleSelected, setDetalleSelected] = useState('hola ');
  const [cuotasSelected, setCuotasSelected] = useState(' ');
  const [isSelected, setSelection] = useState(false);
  const [isSelectedTC, setSelectionTC] = useState(false);
  const [cantMesesPeriodico, setCantMesesPeriodico] = useState(' ');
  const [cantCuotas, setCantCuotas] = useState(' ');
  const [diaFutura, setDiaFutura] = useState(' ');
  const [mesFutura, setMesFutura] = useState(' ');
  const [anioFutura, setAnioFutura] = useState(' ');
  const [semFutura, setSemFutura] = useState(' ');
  const [fechaFutura, setFechaFutura] = useState(' ');
  let detalle = [
    {
      value: "Universidad",
    },
    {
      value: "Luz",
    },
    {
      value: "Gas",
    },
    {
      value: "Cable",
    },
    {
      value: "Teléfono",
    },
    {
      value: "Internet",
    },
    {
      value: "Impuesto Nacional",
    },
    {
      value: "Impuesto Municipal",
    },
    {
      value: "Impuesto Provincial",
    },
    {
      value: "Colegio",
    },
    {
      value: "Obra Social",
    },
    {
      value: "Gastos Varios",
    },
    {
      value: "Comida",
    },
    {
      value: "Viáticos",
    },
    {
      value: "Entretenimiento",
    },
  ];

  let cuotas = [
    {
      value: "3",
    },
    {
      value: "6",
    },
    {
      value: "9",
    },
    {
      value: "12",
    },
    {
      value: "18",
    },
  ];
  const [monto, setMonto] = useState(' ');

  /*   value: 'Sueldo',
}, {
  value: 'Facturación Autónomo',
}, {
  value: 'Alquiler',
}, {
  value: 'Venta Bien Uso Personal',
}, {
  value: 'Otro',
}] */

  /*state = {
    image: null,
    monto: 0,
    detalle: null,
    medio: null,
    fecha: null,
  };*/
/* 
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
  }; */

 

  /* setDate = (newDate) => {
    this.setState({ chosenDate: newDate });
  }; */
  function getWeekNumber(d) {
    // Copy date so don't modify original
    d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
    // Set to nearest Thursday: current date + 4 - current day number
    // Make Sunday's day number 7
    d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay()||7));
    // Get first day of year
    var yearStart = new Date(Date.UTC(d.getUTCFullYear(),0,1));
    // Calculate full weeks to nearest Thursday
    var weekNo = Math.ceil(( ( (d - yearStart) / 86400000) + 1)/7);
    // Return array of year and week number
    return weekNo;
}
  const getCurrentDate = () => {
    var date = new Date().getDate();
    var month = new Date().getMonth() + 1;
    var year = new Date().getFullYear();

    //console.log(date + '/' + month + '/' + year + "getCurrentDate" + this.state.fecha);
    return date + "/" + month + "/" + year;
  };

   
  const getDate = () => {   
    var day = new Date().getDate();  

    //console.log(date + '/' + month + '/' + year + "getCurrentDate" + this.state.fecha);
    return day;
  };

  const getMonth = () => {   
    var month = new Date().getMonth() + 1;  

    //console.log(date + '/' + month + '/' + year + "getCurrentDate" + this.state.fecha);
    return month;
  };

  const getFullYear = () => {   
    var year = new Date().getFullYear();  

    //console.log(date + '/' + month + '/' + year + "getCurrentDate" + this.state.fecha);
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
  const handleSelect = async () => {
    await select();
  };
  useEffect(() => {
    handleSelect();
  }, []);

  const add = (monto, detalle, medio, fecha, dia, mes, anio, sem) => {
    console.log(monto + " " + detalle + " " + medio);
    db.transaction((tx) => {
      tx.executeSql(
        "insert into movimientos (fecha, detalle, monto, medio, tipo_mov, comprobante, dia, mes, anio, sem) values (?, ?, ?, ?, 'Egreso', '', ?, ?, ?, ?)",
        [fecha, detalle, monto, medio, dia, mes, anio, sem]
      ),
        (_, { rows }) => console.log(JSON.stringify(rows)),
        (_, { error }) => console.log(JSON.stringify(error));
    });
  /* db.transaction((tx) => {
     tx.executeSql(
        "update medios set saldo = (select saldo from medios where numero = '" + medio+"') - '"+monto +"'where numero ='"+medio+"'", [], (_, { rows }) => {
        });
      });*/
  };

  const select = async () => {
    console.log("entre al select")
    await db.transaction((tx) => {
      tx.executeSql("select * from medios", [], (_, { rows }) => {
        setVariable(rows._array);
        console.log(variable + "medios");
      });
    });
  };

  const continuar = () =>{
    console.log(medioCobro);
    if(medioCobro!=='Efectivo'){
      if(isSelected){
        console.log("Periodico no efectivo");

          //for
          console.log("entro al for ");
      
       const addMonths = require('addmonths')
       Moment.locale('en');
      
       var mes = ' ';
      //console.log(addMonths(new Date(2020, 10, 1), 3));
      for(let i=-1;i<cantMesesPeriodico;i++){
         
        console.log(addMonths(new Date(getFullYear(),getMonth(),getDate()), i).getMonth()+1);

          
          
          
          setDiaFutura(addMonths(new Date(getFullYear(),getMonth(),getDate()), i).getDate());
          setMesFutura(addMonths(new Date(getFullYear(),getMonth(),getDate()), i).getMonth()+1);
          setAnioFutura(addMonths(new Date(getFullYear(),getMonth(),getDate()), i).getFullYear());
          setSemFutura(getWeekNumber(addMonths(new Date(getFullYear(),getMonth(),getDate()), i)));
        setFechaFutura(diaFutura + "/" + mesFutura + "/" + anioFutura);

          //console.log("fecha fut = "+addMonths(new Date(getFullYear(),getMonth(),getDate()), i).getDate() + "/" + (addMonths(new Date(getFullYear(),getMonth(),getDate()), i).getMonth()+1)+ "/"+addMonths(new Date(getFullYear(),getMonth(),getDate()), i).getFullYear());
         //console.log(getWeekNumber(addMonths(new Date(getFullYear(),getMonth(),getDate()), i)));
          add(monto, detalleSelected, medioCobro,addMonths(new Date(getFullYear(),getMonth(),getDate()), i).getDate() + "/" + (addMonths(new Date(getFullYear(),getMonth(),getDate()), i).getMonth()+1)+ "/"+addMonths(new Date(getFullYear(),getMonth(),getDate()), i).getFullYear(), addMonths(new Date(getFullYear(),getMonth(),getDate()), i).getDate(), (addMonths(new Date(getFullYear(),getMonth(),getDate()), i).getMonth()+1), addMonths(new Date(getFullYear(),getMonth(),getDate()), i).getFullYear(), getWeekNumber(addMonths(new Date(getFullYear(),getMonth(),getDate()), i)));
         navigation.navigate("Home");
       }  
      }else{
          if(isSelectedTC){
            console.log("Periodico no efectivo");

            //for
            console.log("entro al for ");
        
         const addMonths = require('addmonths')
         Moment.locale('en');
        
         var mes = ' ';
        //console.log(addMonths(new Date(2020, 10, 1), 3));
        for(let i=-1;i<cantCuotas-1;i++){
           
          console.log(addMonths(new Date(getFullYear(),getMonth(),getDate()), i).getMonth()+1);
  
            
            
            
            setDiaFutura(addMonths(new Date(getFullYear(),getMonth(),getDate()), i).getDate());
            setMesFutura(addMonths(new Date(getFullYear(),getMonth(),getDate()), i).getMonth()+1);
            setAnioFutura(addMonths(new Date(getFullYear(),getMonth(),getDate()), i).getFullYear());
            setSemFutura(getWeekNumber(addMonths(new Date(getFullYear(),getMonth(),getDate()), i)));
          setFechaFutura(diaFutura + "/" + mesFutura + "/" + anioFutura);
  
            //console.log("fecha fut = "+addMonths(new Date(getFullYear(),getMonth(),getDate()), i).getDate() + "/" + (addMonths(new Date(getFullYear(),getMonth(),getDate()), i).getMonth()+1)+ "/"+addMonths(new Date(getFullYear(),getMonth(),getDate()), i).getFullYear());
           //console.log(getWeekNumber(addMonths(new Date(getFullYear(),getMonth(),getDate()), i)));
            add(monto/cantCuotas, detalleSelected, medioCobro,addMonths(new Date(getFullYear(),getMonth(),getDate()), i).getDate() + "/" + (addMonths(new Date(getFullYear(),getMonth(),getDate()), i).getMonth()+1)+ "/"+addMonths(new Date(getFullYear(),getMonth(),getDate()), i).getFullYear(), addMonths(new Date(getFullYear(),getMonth(),getDate()), i).getDate(), (addMonths(new Date(getFullYear(),getMonth(),getDate()), i).getMonth()+1), addMonths(new Date(getFullYear(),getMonth(),getDate()), i).getFullYear(), getWeekNumber(addMonths(new Date(getFullYear(),getMonth(),getDate()), i)));
           navigation.navigate("Home");
         }              

          }else{
          //comun
          console.log("no Periodico no efectivo");
          add(monto, detalleSelected, medioCobro, getCurrentDate(), getDate(), getMonth(), getFullYear(), getWeek());
          navigation.navigate("Home");
      }
    }
    }else{
      if(isSelected || isSelectedTC){
        console.log("Periodico  efectivo");
        //for
         Alert.alert(
           
            "No se pueden hacer egresos períodicos con Efectivo",
           
            [
           
            {
           
            text: "Cancel",
           
            onPress: () => console.log("Cancel Pressed"),
           
            style: "cancel"
           
            },
           
            { text: "OK", onPress: () => console.log("OK Pressed") }
           
            ],
           
            { cancelable: false }
           
            );
      }else{
        console.log("no Periodico efectivo");
        //comun
        add(monto, detalleSelected, medioCobro, getCurrentDate(), getDate(), getMonth(), getFullYear(), getWeek());
        navigation.navigate("Home");
      }
    }

    navigation.navigate("Home");
  };

  /* const componentDidMount=()=> {
    getPermissionAsync();
  } */

  /* const getPermissionAsync = async () => {
    if (Platform.OS !== 'web') {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
      }
    }
  }; */

  const _pickImage =   () => {
    //try {
      //let result = await ImagePicker.launchImageLibraryAsync({
      let result =  ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
      if (!result.cancelled) {
        this.setState({ image: result.uri });
      }

      console.log(result);
    //} catch (E) {
      console.log(E);
   // }
  };
   
  //const { navigation } = this.props;
  /* let medioCobro = [{
    value: '74144/78998',
  }, {
    value: '74889/12321',
  }, {
    value: '46546/45645',
  }, {
    value: 'Efectivo',
  },]*/
  /*let detalle = [{
    value: 'Sueldo',
  }, {
    value: 'Facturación Autónomo',
  }, {
    value: 'Alquiler',
  }, {
    value: 'Venta Bien Uso Personal',
  }, {
    value: 'Otro',
  }]*/

  return (
    <View style={styles.viewContainer}>
      <TextInput
        style={styles.textInput}
        placeholder="Monto"
        clearButtonMode="always"
        keyboardType="number-pad"
        onChangeText={monto => setMonto( monto )}
        //editable={this.state.TextInputDisableHolder}
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
                ? "-- Seleccione un medio de pago --"
                : "-- No posee medio de pago registrado --"
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
       <Text>Dábito Automático</Text>           
     
          <CheckBox value={isSelected} onValueChange={setSelection}/>
          
      {isSelected && (
          <TextInput
          style={styles.textInput}
          placeholder="Cantidad de meses"
          clearButtonMode="always"
          keyboardType="number-pad"
          onChangeText={cantMesesPeriodico => setCantMesesPeriodico(cantMesesPeriodico)}
          //editable={this.state.TextInputDisableHolder}
        />
        )}
      </View>}  

      {<View style={{flexDirection: "row",
    marginTop: 20}}>
       <Text>Tarjeta de Crédito</Text>           
     
          <CheckBox value={isSelectedTC} onValueChange={setSelectionTC}/>
          
      {isSelectedTC && (
          <TextInput
          style={styles.textInput}
          placeholder="Cantidad de meses"
          clearButtonMode="always"
          keyboardType="number-pad"
          onChangeText={cantCuotas => setCantCuotas(cantCuotas)}
          //editable={this.state.TextInputDisableHolder}
        />
        )}
      </View>}

      {/*<Button style={{marginBottom:10}} title="Adjuntar Comprobante" onPress={_pickImage()} />*/}
      <View style={{marginBottom:20}}><Button  title="Adjuntar Comprobante"  /></View>
     
      {/*{image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />} */}  
      <Button title="Guardar" onPress={() => continuar()} />
      
    </View>

    //, navigation.navigate('IngresoView')
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
    //borderRadius: 20
  },
  drop: {
    //borderColor: 'gray',
    paddingLeft: 20,
    margin: 10,
    //borderRadius: 20
  },
  boton: {
    height: 40,
    borderWidth: 1,
    //borderColor: 'gray',
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

export default Egreso;
