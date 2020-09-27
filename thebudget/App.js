import React from "react";
import { StyleSheet, Text, View } from "react-native";
import AppContainer from "./src/navigations/AppNavigation";
import * as SQLite from "expo-sqlite";
const db = SQLite.openDatabase("budgetgo.db");

export default class App extends React.Component {
  constructor() {
    super();
    console.log("app4.js");
    db.transaction((tx) => {
      tx.executeSql(
        "create table if not exists inversiones (id_inversion integer primary key not null, tipo text, flag_deposito text, monto real, rendimiento real, vencimiento text, cuenta text);"
      );
    });

    // db.transaction((tx) => {
    //   tx.executeSql(
    //     "insert into cuentas (banco, numero, cbu, debito, saldo) values ('','Efectivo','', '', 0) where not exists(select numero from cuentas where numero='Efectivo')"
    //   ),
    //     (_, { rows }) => console.log(JSON.stringify(rows));
    // });

    // db.transaction((tx) => {
    //   tx.executeSql(
    //     "create table if not exists items (id integer primary key not null, done int, value text);"
    //   );
    //   tx.executeSql("select * from items", [], (_, { rows }) =>
    //     console.log(JSON.stringify(rows))
    //   );
    //   //Tabla de movimientos
    //   tx.executeSql(
    //     "create table if not exists movimientos (id_movimiento integer primary key not null, fecha text, detalle text, monto int, medio text, tipo_mov text, comprobante text);"
    //   );
    //   tx.executeSql("select * from movimientos", [], (_, { rows }) =>
    //     console.log(JSON.stringify(rows))
    //   );
    //   //Tabla de usuarios
    //   tx.executeSql(
    //     "create table if not exists usuarios (id_usuario integer primary key not null, mail text, pass text);"
    //   );
    //   tx.executeSql("select * from usuarios", [], (_, { rows }) =>
    //     console.log(JSON.stringify(rows))
    //   );
    //   //Tabla de Cuentas
    //   tx.executeSql(
    //     "create table if not exists cuentas (id_cuenta integer primary key not null, banco text, numero text, cbu int, debito text, saldo real);"
    //   );
    //   tx.executeSql("select * from cuentas", [], (_, { rows }) =>
    //     console.log(JSON.stringify(rows))
    //   );
    //   //Tabla de Tarjetas
    //   tx.executeSql(
    //     "create table if not exists tarjetas (id_tarjeta integer primary key not null, banco text, entidad text, numero text, vencimiento text, cierre_resumen text, vencimiento_resumen text);"
    //   );
    //   tx.executeSql("select * from tarjetas", [], (_, { rows }) =>
    //     console.log(JSON.stringify(rows))
    //   );
    //   //Tabla de Inversiones
    //   tx.executeSql(
    //     "create table if not exists inversiones (id_inversion integer primary key not null, tipo text, flag_deposito text, monto real, rendimiento real, vencimiento text, cuenta text);"
    //   );
    //   tx.executeSql("select * from inversiones", [], (_, { rows }) =>
    //     console.log(JSON.stringify(rows))
    //   );
    //   //Tabla de Presupuestos
    //   tx.executeSql(
    //     "create table if not exists presupuestos (id_presupuestos integer primary key not null, mes_anio text, rubro text, categoria text, monto real);"
    //   );
    //   tx.executeSql(
    //     "insert into cuentas (banco, numero, cbu, debito, saldo) values ('','Efectivo','', '', 0) where not exists(select numero from cuentas where numero='Efectivo')"
    //   ),
    //     (_, { rows }) => console.log(JSON.stringify(rows));

    //   tx.executeSql("select * from presupuestos", [], (_, { rows }) =>
    //     console.log(JSON.stringify(rows))
    //   );
    //   console.log("cuentas");
    //   tx.executeSql("select * from cuentas", [], (_, { rows }) =>
    //     console.log(JSON.stringify(rows))
    //   );
    // });
    // db.transaction((tx) => {
    //   tx.executeSql(
    //     "insert into inversiones ( tipo , flag_deposito , monto , rendimiento , vencimiento , cuenta ) values ('plazo fijo','debito en cuenta',125.10, 180.25, '30/09/2020', '805') ",
    //     [],
    //     (_, { rows }) => console.log("inv", JSON.stringify(rows))
    //   );
    // });
  }

  render() {
    return <AppContainer></AppContainer>;
  }
}
