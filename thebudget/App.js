import React from "react";
import { StyleSheet, Text, View } from "react-native";
import AppContainer from "./src/navigations/AppNavigation";
import * as SQLite from "expo-sqlite";
const db = SQLite.openDatabase("budgetgo.db");

export default class App extends React.Component {
  constructor() {
    super();
    console.log("app5.js");
    //tabla de inversiones
    db.transaction((tx) => {
      tx.executeSql(
        "create table if not exists inversiones (id_inversion integer primary key not null, tipo text, flag_deposito text, monto real, rendimiento real, vencimiento text, cuenta text);"
      );
      
    });
    //Tabla de movimientos
    db.transaction((tx) => {
      tx.executeSql(
        "create table if not exists movimientos (id_movimiento integer primary key not null, fecha text, detalle text, monto int, medio text, tipo_mov text, comprobante text);"
      );
    });

    //Tabla de usuarios
    db.transaction((tx) => {
      tx.executeSql(
        "create table if not exists usuarios (id_usuario integer primary key not null, mail text, pass text);"
      );
    });
    /* //Tabla de cuentas
    db.transaction((tx) => {
      tx.executeSql(
        "create table if not exists cuentas (id_cuenta integer primary key not null, banco text, numero text, cbu int, debito text, saldo real);"
      );
    });
     
    //Tabla de tarjetas
    db.transaction((tx) => {
      tx.executeSql(
        "create table if not exists tarjetas (id_tarjeta integer primary key not null, banco text, entidad text, numero text, vencimiento text, cierre_resumen text, vencimiento_resumen text);"
      );
    }); */

    //Tabla de presupuestos
    db.transaction((tx) => {
      tx.executeSql(
        "create table if not exists presupuestos (id_presupuestos integer primary key not null, mes_anio text, rubro text, categoria text, monto real);"
      );
    });

    //Tabla de medios
    db.transaction((tx) => {
      console.log("medio")
      tx.executeSql(
        "create table if not exists medios (id_medio integer primary key not null, banco text, numero text, cbu text, debito text, saldo real,entidad text, vencimiento text, cierre_resumen text, vencimiento_resumen text, esCuentaBancaria integer, esTarjetaCredito integer, esEfectivo integer);"
      );
    });
   /*  db.transaction((tx) => {
      console.log("medio")
      tx.executeSql(
        "insert into medios(banco , numero , cbu , debito , saldo ,entidad , vencimiento , cierre_resumen , vencimiento_resumen , esCuentaBancaria , esTarjetaCredito , esEfectivo ) VALUES(' ','Efectivo',' ',' ',0.0,' ',' ',' ',' ',0,0,1);"
      );
    }); */
    db.transaction((tx) => { 
      tx.executeSql("select * from medios", [], (_, { rows }) => {
        console.log(rows);
      });
    });

    /* db.transaction((tx) => {
       tx.executeSql(
         "insert into inversiones ( tipo , flag_deposito , monto , rendimiento , vencimiento , cuenta ) values ('plazo fijo','debito en cuenta',125.10, 180.25, '30/09/2020', '805') ",
         [],
        (_, { rows }) => console.log("inv", JSON.stringify(rows))
      );
    }); */
  }

  render() {
    return <AppContainer></AppContainer>;
  }
}
