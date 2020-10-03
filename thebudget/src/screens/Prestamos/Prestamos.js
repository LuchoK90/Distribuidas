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

const Prestamos = ({ navigation }) => {
  const [inversiones, setInversiones] = useState([]);

  useEffect(() => {
    handleSelect();
  }, []);
  const onPressNuevaInversion = (item) => {
    navigation.navigate("Invertir");
  };

  const handleSelect = async () => {
    await select();
  };

  const select = async () => {
    await db.transaction((tx) => {
      tx.executeSql("select * from prestamos inner join usuarios on prestamos.user = usuarios.id_usuario where usuarios.logueado = 1", [], (_, { rows }) => {
        // console.log(rows);
        setInversiones(rows._array);
      });
    });
  };

  const renderInversiones = (item) => (
    <View style={styles.container}>
      <Text style={styles.title}>{item.tipo}</Text>
      <Text style={styles.elemento}>MONTO: $ {item.monto}</Text>
      <Text style={styles.elemento}>CUENTA: {item.cuenta}</Text>
      <Text style={styles.elemento}>CUOTAS: {item.cuotas}</Text>
      {/* <Button title={"Ver Detalle"} onPress={() =>  navigation.navigate("InversionDetalle")}/> */}
    </View>
  );

  return (  
    <View style={{ flex: 1 }}>
   
      <View style={{margin:10}}><Button title='Otorgar Préstamo'
        onPress={() => {
          navigation.navigate('OtorgarPrestamo')
        }}
      /></View>
      <View style={{margin:10, marginTop:0}}><Button title='Solicitar Préstamo'
        onPress={() => {
          navigation.navigate('SolicitarPrestamo')
        }}
      /></View>
      <FlatList
        vertical
        showsVerticalScrollIndicator={true}
        numColumns={1}
        data={inversiones}
        renderItem={({ item }) => renderInversiones(item)}
        keyExtractor={(item) => `${item.id_inversion}`}
      />
    </View>
  );
};

Prestamos["navigationOptions"] = (screenProps) => ({
  title: "Préstamos",
});

export default Prestamos;
