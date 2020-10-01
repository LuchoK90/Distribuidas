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

const db = SQLite.openDatabase("budgetgo.db");

const CuentaBancaria = ({ navigation }) => {
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
      tx.executeSql("select * from medios where esCuentaBancaria=1", [], (_, { rows }) => {
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
