import React, { useState, useEffect } from "react";
import {
  FlatList,
  Text,
  View,
  Image,
  TouchableHighlight,
  TextInput,
  SafeAreaView,
  ScrollView,
  AppRegistry,
  StyleSheet,
  Alert,
  Button,
} from "react-native";
import hola from "./styles";
import { Container, H1 } from "native-base";
import { categories } from "../../data/dataArrays";
import { getNumberOfRecipes } from "../../data/MockDataAPI";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Dropdown } from "react-native-material-dropdown";
import { DataTable } from "react-native-paper";
import { useIsFocused } from "@react-navigation/native";

import * as SQLite from "expo-sqlite";
import DynamicDataTable from "@langleyfoxall/react-dynamic-data-table";

const db = SQLite.openDatabase("budgetgo.db");

const IngresoView = ({ navigation }) => {
  const [text, setText] = useState("");
  const [variable, setVariable] = useState([]);

  const [page, setPage] = useState(0);
  const itemsPerPage = 3;
  const from = page * itemsPerPage;
  const to = (page + 1) * itemsPerPage;
 

  // const navigationOptions = () => {
  //   return {
  //     headerTransparent: 'true',
  //     title: 'Ingresos',
  //     headerLeft: () => <BackButton
  //       onPress={() => {
  //         navigation.goBack();
  //       }}
  //     />
  //   };
  // };

  // const  navigationOptions = () => {
  //   title: 'Ingresos'
  // };
  useEffect(() => {
   
    handleSelect();
  }, []);
  const handleSelect = async () => {
    
    await select();
  };
 

  const select = () => {
    console.log("entro al select");
    db.transaction((tx) => {
      tx.executeSql("select * from movimientos where tipo_mov='Ingreso'", [], (_, { rows }) => {
        setVariable(rows._array);
      });
    });
  };

  return (
    <Container style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 5 }}>
        <View style={{ marginTop: 20 }}>
          <H1
            style={{
              textAlign: "center",
              marginBottom: 20,
              fontSize: 32,
              fontWeight: "bold",
              color: "#3700B3",
            }}
          >
            Ingresos
          </H1>
        </View>

        <ScrollView>
          <View
            style={{
              flexDirection: "column",
              justifyContent: "center",
              marginHorizontal: "2.5%",
              flex: 1,
            }}
          >
            {variable && variable.length > 0 ? (
              <DataTable>
                <DataTable.Header>
                  <DataTable.Title>Fecha</DataTable.Title>
                  <DataTable.Title>Detalle</DataTable.Title>
                  <DataTable.Title numeric>Monto</DataTable.Title>
                </DataTable.Header>
                <FlatList
                  data={variable}
                  renderItem={({ item }) => (
                    <DataTable.Row>
                      <DataTable.Cell>{item.fecha}</DataTable.Cell>
                      <DataTable.Cell>{item.detalle}</DataTable.Cell>
                      <DataTable.Cell numeric>$ {item.monto}</DataTable.Cell>
                    </DataTable.Row>
                  )}
                  keyExtractor={(ing) => ing.id_mov}
                />

                
              </DataTable>
            ) : null}
          </View>
        </ScrollView>
        
      </SafeAreaView>
      <View style={{ marginTop: 20, marginBottom: 20 }}>
    <Button
      title="Agregar"
      onPress={() => navigation.navigate("Ingreso")}
    /></View>
    </Container>

    

  );
};

IngresoView["navigationOptions"] = (screenProps) => ({
  title: "Ingresos",
});
// IngresoView.navigationOptions = (screenProps) => ({
// headerTransparent: 'true',
// title: 'Ingresos',
// headerLeft: () => <BackButton
//   onPress={() => {
//     navigation.goBack();
//   }}
// />
// });

const styles = StyleSheet.create({
  viewContainer: {
    width: "90%",
    marginLeft: 20,
    marginTop: 20,
  },
  titulo: {
    fontSize: 30,
    backgroundColor: "gray",
    paddingLeft: 10,
    marginLeft: 50,
  },
  monto: {
    paddingLeft: 20,
    margin: 10,
  },
  boton: {
    height: 40,
    borderWidth: 1,
    paddingLeft: 20,
    margin: 10,
  },
});

export default IngresoView;
