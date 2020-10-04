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

const Transferencias = ({ navigation }) => {
  //export default class Ingreso extends React.Component {
  const [variable, setVariable] = useState([]);
  const [medioCobro, setMedioCobro] = useState(' ');
  const [monto, setMonto] = useState(' ');
  const [cbu, setCBU] = useState(' ');
  const [descripcion, setDescripcion] = useState(' ');
  
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
 

  const handleSelect = async () => {
    await select();
  };
  useEffect(() => {
    handleSelect();
  }, []);

  const add=(monto, cbu,descripcion, medioCobro) => {
    console.log(monto+ cbu+descripcion+ medioCobro);
    db.transaction((tx) => {
      tx.executeSql(
        "insert into movimientos (fecha, detalle, monto, medio, tipo_mov, comprobante, dia, mes, anio, sem, user) values (?, ?, ?, ?, 'Egreso', ? , ?, ?, ?, ?, (select id_usuario from usuarios where logueado = 1))",
        [getCurrentDate(), descripcion, monto, medioCobro, image, getDate(), getMonth(), getFullYear(), getWeek()]
      ),
        (_, { rows }) => console.log(JSON.stringify(rows)),
        (_, { error }) => console.log(JSON.stringify(error));
    });
  /*  db.transaction((tx) => {
      tx.executeSql(
        "update medios set saldo = (select saldo from medios where numero = '" + medioCobro+"') - '"+monto +"'where numero ='"+medioCobro+"'", [], (_, { rows }) => {
        });
      });*/
  };

  const select = async () => {
    console.log("entre al select")
    await db.transaction((tx) => {
      tx.executeSql("select distinct numero from medios inner join usuarios on medios.user = usuarios.id_usuario where usuarios.logueado = 1 and esCuentaBancario = 1", [], (_, { rows }) => {
        setVariable(rows._array);
      });
    });
  };

  const continuar = () =>{
    
    add(monto, cbu,descripcion, medioCobro);
    //navigation.navigate("Dashboard");
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
                ? "-- Seleccione una cuenta --"
                : "-- No posee cuentas bancarias registradas --"
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
        placeholder="CBU Destino"
        clearButtonMode="always"
        keyboardType="number-pad"
        onChangeText={cbu => setCBU( cbu )}
        //editable={this.state.TextInputDisableHolder}
      />
     
      <TextInput
        style={styles.textInput}
        placeholder="Monto"
        clearButtonMode="always"
        keyboardType="number-pad"
        onChangeText={monto => setMonto( monto )}
        //editable={this.state.TextInputDisableHolder}
      />

      

      

      <TextInput
        style={styles.textInput}
        placeholder="Descripción"
        clearButtonMode="always"
        onChangeText={descripcion => setDescripcion( descripcion )}
        //editable={this.state.TextInputDisableHolder}
      />
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

export default Transferencias;
