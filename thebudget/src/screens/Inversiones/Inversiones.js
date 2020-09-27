import React, { useState, useEffect } from "react";
import {
  FlatList,
  ScrollView,
  Text,
  View,
  TouchableHighlight,
  Image,
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

const Inversiones = () => {
  // const navigation = useNavigation();
  const [inversiones, setInversiones] = useState([]);
  // static navigationOptions = ({ navigation }) => ({
  //   title: 'Inversiones',
  //   headerLeft: () => <MenuImage
  //     onPress={() => {
  //       navigation.openDrawer();
  //     }}
  //   />
  // });

  // constructor(props) {
  //   super(props);
  // }

  useEffect(() => {
    handleSelect();
  }, []);
  const onPressNuevaInversion = (item) => {
    // navigation.navigate("Invertir");
  };

  const handleSelect = async () => {
    await select();
  };

  const select = async () => {
    await db.transaction((tx) => {
      tx.executeSql("select * from inversiones", [], (_, { rows }) => {
        console.log("asd 2");
        // console.log(rows);
        setInversiones(rows._array);
      });
    });
  };

  const renderInversiones = (item) => (
    <View style={styles.container}>
      <Text style={styles.elemento}>TIPO: {item.tipoInversion}</Text>
      <Text style={styles.elemento}>{item.info}</Text>
      <Text style={styles.elemento}>
        CAPITAL INVERTIDO: $ {item.capitalInvertido}{" "}
      </Text>
      <Text style={styles.elemento}>RENDIMIENTO: {item.ganancia} %</Text>
      <Text style={styles.elemento}>VENCIMIENTO: {item.vencimiento}</Text>
      <Text style={styles.elemento}>CUENTA: {item.cuenta}</Text>
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
        renderItem={renderInversiones}
        keyExtractor={(item) => `${item.recipeId}`}
      />
    </View>
  );
};

export default Inversiones;
