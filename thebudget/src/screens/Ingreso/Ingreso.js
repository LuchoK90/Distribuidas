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
//import { Checkbox } from "react-native-paper";
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
  //export default class Ingreso extends React.Component {
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
  /* const [fechaFutura, setFechaFutura] = useState(' ');
  const [fechaFutura, setFechaFutura] = useState(' ');
  const [fechaFutura, setFechaFutura] = useState(' '); */
  const [efect, setEfect] = useState(0);
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

/*   const navigationOptions = ({ navigation }) => {
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

  /* submitAndClear = () => {
    this.props.writeText(this.state.text);

    this.setState({
      text: "",
    });
  }; */

  const setDate = (newDate) => {
    this.setState({ chosenDate: newDate });
  };

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

  const add =  (monto, detalle, medio, fecha) => {
    console.log("monto: "+monto + " detalle: " + detalle + " medio: " + medio);
    db.transaction((tx) => {
      tx.executeSql(
        "insert into movimientos (fecha, detalle, monto, medio, tipo_mov, comprobante, dia, mes, anio, sem) values (?, ?, ?, ?, 'Ingreso', '', ?, ?, ?, ?)",
        [fecha, detalle, monto, medio, getDate(), getMonth(), getFullYear(), getWeek()]
      ),
        (_, { rows }) => console.log(JSON.stringify(rows)),
        (_, { error }) => console.log(JSON.stringify(error));
    });
    db.transaction((tx) => {
      tx.executeSql(
        "update medios set saldo = (select saldo from medios where numero = '" + medio+"') + '"+monto +"'where numero ='"+medio+"'", [], (_, { rows }) => {
        });
      });
  };

  const select = async () => {
    
    await db.transaction((tx) => {
      tx.executeSql("select distinct numero from medios where esCuentaBancaria=1 or esEfectivo=1", [], (_, { rows }) => {
        setVariable(rows._array);
        
      });
    });
  };

  const continuar = () =>{
    console.log(medioCobro);
    if(medioCobro==='Efectivo'){
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

          
          
          
          setFechaFutura(addMonths(new Date(getFullYear(),getMonth(),getDate()), i).getMonth()+1);
          console.log("fecha fut = "+fechaFutura);
         add(monto, detalleSelected, medioCobro,fechaFutura);
         navigation.navigate("Home");
       }  
      }else{
          //comun
          console.log("no Periodico no efectivo");
          add(monto, detalleSelected, medioCobro, getCurrentDate());
          navigation.navigate("Home");
      }
    }else{
      if(isSelected){
        console.log("Periodico  efectivo");
        //for
        Alert.alert(
          `No se pueden hacer ingresos períodicos con Efectivo`
            ,
            [
              {
                text: "Confirmar",
              },
            ]
         );
      }else{
        console.log("no Periodico efectivo");
        //comun
        add(monto, detalleSelected, medioCobro, getCurrentDate());
        navigation.navigate("Home");
      }
    }

   /*  if(isSelected && efect==0){
     // var mes = new Date().getMonth() + + 5;
       //var d = Date().getDate();
       console.log("entro al for ");
      
       const addMonths = require('addmonths')
       Moment.locale('en');
      
       var mes = ' ';
      //console.log(addMonths(new Date(2020, 10, 1), 3));
      for(let i=-1;i<cantMesesPeriodico;i++){
         
        console.log(addMonths(new Date(getFullYear(),getMonth(),getDate()), i).getMonth()+1);

          
          
          
          setFechaFutura(addMonths(new Date(getFullYear(),getMonth(),getDate()), i).getMonth()+1);
          console.log("fecha fut = "+fechaFutura);
         add(monto, detalleSelected, medioCobro,fechaFutura);
      }
    }else{
      if(!isSelected)
      console.log("no entro al for ");
      add(monto, detalleSelected, medioCobro, getCurrentDate());
      
    }; */
    
    
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
        onChangeText={monto => setMonto(monto)}
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
       <Text>prueba</Text>           
     
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
        

     <View><Button title="Guardar" onPress={() =>  continuar()} /></View>
     
      
      
    </View>

    //, navigation.navigate('IngresoView')
  );
};

/* <View style={{flexDirection: "row",
    marginTop: 20}}>
      <Text>Periódico</Text>          
      <Check ></Check>
      </View> */

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

export default Ingreso;
