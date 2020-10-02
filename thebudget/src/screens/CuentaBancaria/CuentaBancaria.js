import React, { useState, useEffect } from "react";
import {
  FlatList,
  ScrollView,
  Text,
  View,
  TouchableHighlight,
  Image,
  Button
} from "react-native";
import styles from "./styles";
import { inversiones } from "../../data/dataArrays";
import MenuImage from "../../components/MenuImage/MenuImage";
// import DrawerActions from "react-navigation";
import { getCategoryName } from "../../data/MockDataAPI";
import BotonRealizarTransferencia from "../../components/botonRealizarTransferencia/botonRealizarTransferencia";
import BotonAgregarInversion from "../../components/botonAgregarInversion/botonAgregarInversion";
import { useNavigation } from "@react-navigation/native";
import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("BASEBASEBASE_2.db");

const CuentaBancaria = ({ navigation }) => {
  const [inversiones, setInversiones] = useState([]);

  useEffect(() => {
    handleSelect();
  }, []);
  const onPressNuevaInversion = (item) => {
    navigation.navigate("Invertir");
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

  const handleSelect = async () => {
    await select();
  };

  const select = async () => {
    await db.transaction((tx) => {
      tx.executeSql("select medios.banco banco, medios.numero numero, (medios.saldo + Sum(case movimientos.tipo_mov when 'Ingreso' then movimientos.monto when 'Egreso' then (-1)*movimientos.monto else 0 end)) saldo from medios left join movimientos on medios.numero = movimientos.medio where medios.esCuentaBancaria=1 and (movimientos.anio is null or movimientos.fecha <= '" + getCurrentDate() + "') group by medios.banco, medios.numero", [], (_, { rows }) => {
        // console.log(rows);
        setInversiones(rows._array);
      });
    });
  };

  const renderInversiones = (item) => (
    <View style={styles.container}>
      <Text style={styles.elemento}>{item.banco} </Text>
      <Text style={styles.elemento}>{item.numero}</Text>
      <Text style={styles.elemento}>{item.saldo}</Text>
  
    </View>
  );

  return (  
    <View style={{ flex: 1 }}>
      <Button title='Agregar Cuenta Bancaria'
        onPress={() => {
          navigation.navigate('NuevaCuenta')
        }}
      />
      <FlatList
        vertical
        showsVerticalScrollIndicator={true}
        numColumns={1}
        data={inversiones}
        renderItem={({ item }) => renderInversiones(item)}
        keyExtractor={(item) => `${item.id_inversion}`}
      />
      <Button title={"Realizar Transferencia"} onPress={() =>  navigation.navigate('Transferencias')}/>
    </View>
  );
};

CuentaBancaria["navigationOptions"] = (screenProps) => ({
  title: "Cuentas Bancarias",
});

export default CuentaBancaria;
