import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import AppContainer from './src/navigations/AppNavigation';
import * as SQLite from 'expo-sqlite';
const db = SQLite.openDatabase("budgetgo.db");


export default class App extends React.Component 
{

  constructor() {
    super();
    console.log("app3.js")
    db.transaction(tx => {
      tx.executeSql(
        "create table if not exists items (id integer primary key not null, done int, value text);"
      );
      tx.executeSql("select * from items", [], (_, { rows }) =>
          console.log(JSON.stringify(rows))
      );
      //Tabla de movimientos
      tx.executeSql(
        "create table if not exists movimientos (id_movimiento integer primary key not null, fecha text, detalle text, monto int, medio text, tipo_mov text, comprobante text);"
      );
      tx.executeSql("select * from movimientos", [], (_, { rows }) =>
          console.log(JSON.stringify(rows))
      );
    });
  }

  render() {
    return (
      <AppContainer></AppContainer>
    );
  }



  
}