import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import AppContainer from './src/navigations/AppNavigation';
import * as SQLite from 'expo-sqlite';
const db = SQLite.openDatabase("budgetgo.db");


export default class App extends React.Component 
{

  constructor() {
    super();
    db.transaction(tx => {
      tx.executeSql(
        "create table if not exists presupuesto (id_presupuesto integer primary key not null, mes_anio text, rubro text, monto int);"
      );
      tx.executeSql("select * from presupuesto", [], (_, { rows }) =>
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