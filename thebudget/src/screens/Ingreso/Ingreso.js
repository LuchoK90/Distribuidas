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
import { NavigationContainer, useNavigation } from "@react-navigation/native";
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

const db = SQLite.openDatabase("budgetgo.db");

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

    //console.log(date + '/' + month + '/' + year + "getCurrentDate" + this.state.fecha);
    return date + "/" + month + "/" + year;
  };

  const handleSelect = async () => {
    await select();
  };
  useEffect(() => {
    handleSelect();
  }, []);

  const add =  (monto, detalle, medio) => {
    console.log("monto: "+monto + " detalle: " + detalle + " medio: " + medio);
    db.transaction((tx) => {
      tx.executeSql(
        "insert into movimientos ( fecha, detalle, monto, medio, tipo_mov, comprobante) values (?,?, ?, ?, 'Ingreso', '')",
        [getCurrentDate(), detalle, monto, medio]
      ),
        (_, { rows }) => console.log(JSON.stringify(rows)),
        (_, { error }) => console.log(JSON.stringify(error));
    });
  };

  const select = async () => {
    
    await db.transaction((tx) => {
      tx.executeSql("select * from medios", [], (_, { rows }) => {
        setVariable(rows._array);
        
      });
    });
  };

  const continuar = () =>{
    add(monto, detalleSelected, medioCobro);
    navigation.navigate("IngresoView");
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

      <View style={{flexDirection: "row",
    marginTop: 20}}>
      <Text>Periódico</Text>          
      <Check ></Check>
      </View>  

     <View><Button title="Guardar" onPress={() =>  continuar()} /></View>
     
      
      
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

export default Ingreso;
