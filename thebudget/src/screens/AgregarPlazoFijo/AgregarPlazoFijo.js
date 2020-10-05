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

const AgregarPlazoFijo = ({ navigation }) => {
  
  const [variable, setVariable] = useState([]);
  const [bankAccounts, setBankAccounts] = useState([]);
  const [medioCobro, setMedioCobro] = useState(' ');
  
  const [detalleSelected, setDetalleSelected] = useState();
  const [monto, setMonto] = useState(' ');
  const [fechaVenc, setFechaVenc] = useState(' ');
  const [rendimiento, setRendimiento] = useState(' ');
  const [mode, setMode] = useState(' ');
  const [isSelected, setSelection] = useState(false);

  let modo = [
    {
      value: "Renovación Automática",
    },
    {
      value: "Depósito en Cuenta",
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

  const add=(medioCobro,monto,fechaVenc,rendimiento,Modo, dia, mes, anio, sem) => {
    
    
    db.transaction((tx) => {
      tx.executeSql(     
        "insert into inversiones ( tipo , flag_deposito , monto , rendimiento , vencimiento , cuenta, dia, mes, anio, sem ,user) values ('Plazo Fijo',?,?,?,?,?, ?, ?, ?, ?,(select id_usuario from usuarios where logueado = 1))",
        [Modo,monto,rendimiento,fechaVenc,medioCobro, dia, mes, anio, sem]
      ),
        (_, { rows }) => console.log(JSON.stringify(rows)),
        (_, { error }) => console.log(JSON.stringify(error));
    });
    db.transaction((tx) => {
      tx.executeSql(
        "insert into movimientos ( fecha, detalle, monto, medio, tipo_mov, comprobante, dia, mes, anio, sem,user) values (?,'Plazo Fijo', ?, ?, 'Egreso', '', ?, ?, ?, ?,(select id_usuario from usuarios where logueado = 1))",
        [getCurrentDate(), monto, medioCobro, getDate(), getMonth(), getFullYear(), getWeek()]
      ),
        (_, { rows }) => console.log(JSON.stringify(rows)),
        (_, { error }) => console.log(JSON.stringify(error));
    });
  };


  const addEnCuenta=(medioCobro,monto,fechaVenc,rendimiento,Modo, dia, mes, anio, sem) => {
    console.log(medioCobro+monto+fechaVenc+rendimiento+Modo);
    
    db.transaction((tx) => {
      tx.executeSql(     
        "insert into inversiones ( tipo , flag_deposito , monto , rendimiento , vencimiento , cuenta, dia, mes, anio, sem,user ) values ('Plazo Fijo',?,?,?,?,?,?,?,?,?,(select id_usuario from usuarios where logueado = 1))",
        [Modo,monto,rendimiento,fechaVenc,medioCobro, dia, mes, anio, sem]
      ),
        (_, { rows }) => console.log(JSON.stringify(rows)),
        (_, { error }) => console.log(JSON.stringify(error));
    });
    db.transaction((tx) => {
      tx.executeSql(
        "insert into movimientos ( fecha, detalle, monto, medio, tipo_mov, comprobante, dia, mes, anio, sem,user) values (?,'Plazo Fijo', ?, ?, 'Egreso', '', ?, ?, ?, ?,(select id_usuario from usuarios where logueado = 1))",
        [getCurrentDate(), monto, medioCobro, getDate(), getMonth(), getFullYear(), getWeek()]
      ),
        (_, { rows }) => console.log(JSON.stringify(rows)),
        (_, { error }) => console.log(JSON.stringify(error));
    });
    db.transaction((tx) => {
        tx.executeSql(
          "insert into movimientos ( fecha, detalle, monto, medio, tipo_mov, comprobante, dia, mes, anio, sem,user) values (?,'Plazo Fijo', ?, ?, 'Ingreso', '', ?, ?, ?, ?,(select id_usuario from usuarios where logueado = 1))",
          [fechaVenc, monto+((monto*rendimiento)/100), medioCobro, dia, mes, anio, sem]
        ),
          (_, { rows }) => console.log(JSON.stringify(rows)),
          (_, { error }) => console.log(JSON.stringify(error));
      });
  };



  const select = async () => {
    await db.transaction((tx) => {
      tx.executeSql("select distinct numero from medios inner join usuarios on medios.user = usuarios.id_usuario where usuarios.logueado = 1 and medios.esCuentaBancaria=1", [], (_, { rows }) => {
        setVariable(rows._array);
        console.log(variable);
      });
    });
  };

  

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
    
      console.log(E);
   
  };

  const continuar = () =>{
      if(isSelected){
        var dateString = fechaVenc;
        var dateParts = dateString.split("/");
        var dateObject = new Date(+dateParts[2], dateParts[1] - 1, +dateParts[0]); 
        
       
          addEnCuenta(medioCobro,monto,fechaVenc,rendimiento,mode,Number(fechaVenc.substring(0,2)), Number(fechaVenc.substring(3,5)), Number(fechaVenc.substring(6,10)), getWeekNumber(dateObject));

      }else{
        var dateString = fechaVenc;
        var dateParts = dateString.split("/");
        var dateObject = new Date(+dateParts[2], dateParts[1] - 1, +dateParts[0]); 
         add(medioCobro,monto,fechaVenc,rendimiento,mode,Number(fechaVenc.substring(0,2)), Number(fechaVenc.substring(3,5)), Number(fechaVenc.substring(6,10)), getWeekNumber(dateObject));
      }
    navigation.navigate("Home");
  };
   


  return (
    <View style={styles.viewContainer}>

      <View>
        <Picker
          style={{
            height: 40,
            marginTop: 5,
            marginBottom:20,
            backgroundColor: "#FFF",
          }}
          selectedValue={medioCobro}
          onValueChange={(val) => setMedioCobro(val)}
        >
          <Picker.Item
            label={
              variable && variable.length > 0
                ? "Seleccione una cuenta bancaria"
                : "No posee cuentas bancarias registradas"
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


      <TextInput
        style={styles.textInput}
        placeholder="Monto a invertir"
        clearButtonMode="always"
        keyboardType="number-pad"
        onChangeText={monto => setMonto( monto )}
        
      />

      <TextInput
        style={styles.textInput}
        placeholder="Fecha Vencimiento (dd/mm/aaaa)"
        clearButtonMode="always"
        onChangeText={fechaVenc => setFechaVenc( fechaVenc )}
        
      />

      <TextInput
        style={styles.textInput}
        placeholder="Ingrese Rendimiento (%)"
        clearButtonMode="always"
        keyboardType="number-pad"
        onChangeText={rendimiento => setRendimiento(rendimiento)}
        
      />    
      
      <Text>Deposito en Cuenta</Text>           
     
     <CheckBox value={isSelected} onValueChange={setSelection}/>

      

      
      
      
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

export default AgregarPlazoFijo;