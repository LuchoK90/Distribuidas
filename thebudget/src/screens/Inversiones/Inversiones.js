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

const Inversiones = ({ navigation }) => {
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
      tx.executeSql("select * from inversiones", [], (_, { rows }) => {
        // console.log(rows);
        setInversiones(rows._array);
      });
    });
  };

  const renderInversiones = (item) => (
    <View style={styles.container}>
      <Text style={styles.elemento}>TIPO: {item.tipo}</Text>
      <Text style={styles.elemento}>CAPITAL INVERTIDO: $ {item.monto}
      </Text>
      <Text style={styles.elemento}>RENDIMIENTO: {item.rendimiento} %</Text>
      <Text style={styles.elemento}>VENCIMIENTO: {item.vencimiento}</Text>
      <Text style={styles.elemento}>CUENTA: {item.cuenta}</Text>
      {/* <Button title={"Ver Detalle"} onPress={() =>  navigation.navigate("InversionDetalle")}/> */}
    </View>
  );

  return (  
    <View style={{ flex: 1 }}>
      <BotonAgregarInversion
        onPress={() => {
          onPressNuevaInversion();
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
    </View>
  );
};

Inversiones["navigationOptions"] = (screenProps) => ({
  title: "Inversiones",
});

export default Inversiones;
